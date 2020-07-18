import { Core } from "./core"

export class Exp {
  constructor() {
    this.core = new Core()
  }

  parseExp(exp) {
    if (this.core.isUndefined(exp)) 
      return
  
    exp = exp.replace(/ /g, '').replace(/,/g, '.')
    
    if (~exp[0].indexOf('-')) 
      exp = exp.replace('-', '_')
      
    while (~exp.indexOf('|')) {
      exp = exp.replace('|', 'abs(')
      exp = exp.replace('|', ')')
    }
    
    exp = exp.replace(/\(-/g, '(_')
  
    let expArr = []
    for (let i = 0; i < exp.length; i++) {
      let item = ""
      if (this.core.isNum(exp[i]) || exp[i] == '_') {
        item += exp[i]
        i++
        while (i < exp.length && (this.core.isNum(exp[i]) || exp[i] == '.')) {
          item += exp[i]
          i++
        }
        i--
        expArr.push(item)
      } else if (this.core.isString(exp[i])) {
        item += exp[i]
        i++
        while(i < exp.length && (this.core.isString(exp[i]) || this.core.isNum(exp[i]))) {
          item += exp[i]
          i++
        }
        i--;
        expArr.push(item)
      } else if (this.core.isOperation(exp[i]) && 
                !this.core.isUndefined(exp[i+1]) && 
                !this.core.isOperation(exp[i+1])) {
        expArr.push(exp[i])
      } else  if (this.core.isBkt(exp[i]) || this.core.isFact(exp[i])) {
        expArr.push(exp[i])
      } else {
        return
      }
    }
    expArr.forEach((item, i, arr) => {
      arr[i] = item.replace('_', '-')
    })

    return expArr
  }

  setVars(arr, vars) {
    if (!arr) 
      return

    for (let key in vars) {
      if (key == vars[key])
        continue
      while (arr.includes(key)) {
        arr.splice(arr.indexOf(key), 1, ...this.parseExp(`(${vars[key]})`))
      }
    }

    return arr
  }

  getStack(arr) {
    if (this.core.isUndefined(arr))
      return
    if (this.core.isOperation(arr[0]) || 
        this.core.isOperation(arr[arr.length-1]) || 
        this.core.isFact(arr[0]))
      return
  
    let stack = []
    let output = []
  
    for (let i = 0; i < arr.length; i++) {
      if (this.core.isNum(arr[i])) {
        output.push(arr[i])
        
      } else if (this.core.isFact(arr[i])) {
        if (stack.length > 0 && this.core.isString(stack.peek()))
          output.push(stack.pop())
        output.push(arr[i])
        
      } else  if (this.core.isString(arr[i]) || this.core.isOpenBkt(arr[i])){
        stack.push(arr[i])
        
      } else if (this.core.isCloseBkt(arr[i])) {
        if (!~stack.indexOf('('))
          return
  
        while (stack.peek() != "(" )
          output.push(stack.pop())
          
        stack.pop()
        
      } else if (this.core.isOperation(arr[i])) {
        while (stack.length > 0 && 
            (this.core.isString(stack.peek()) || 
            this.core.getPrior(stack.peek()) >= this.core.getPrior(arr[i])))
          output.push(stack.pop())
  
        stack.push(arr[i])
        
      } else {
        stack.push(arr[i])
      }
    }
    
    if (~stack.indexOf('('))
      return
  
    while (stack.length > 0) 
      output.push(stack.pop())
  
    return output
  }
  
  executeStack(arr) {
    if (this.core.isUndefined(arr))
      return
  
    for (let i = 0; i < arr.length; i++) {
      if ( i > 1 && this.core.isOperation(arr[i])) {
        arr.splice(i-2, 3, this.core.solveBinary(arr[i-2], arr[i-1], arr[i]))
        i -=2
      } else if (this.core.isFact(arr[i])) {
        arr.splice(i-1, 2, this.core.getFact(arr[i-1]))
        i--
      } else if (i > 0 && this.core.isString(arr[i])) {
        arr.splice(i-1, 2, this.core.solveFunction(arr[i-1], arr[i]))
        i--
      }
    }
    
    if (arr.length > 1 || arr.some(isNaN))
      return
    
    return arr[0]
  }

  getResult(exp, vars) {
    let result = this.executeStack(this.getStack(this.setVars(this.parseExp(exp), vars)))
    if (this.core.isUndefined(result))
      return null
    return result
  }
}
