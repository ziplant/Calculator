export class Core {
  constructor() {
    Array.prototype.peek = function() {
      return this[this.length-1]
    }
  }

  round(int, lim) {
    lim = Math.pow(10, lim)
    return Math.round(int*lim)/lim
  }

  isUndefined(arg) {
    if (typeof arg === 'undefined' || arg === '') 
      return true
    return false
  }

  isNum(arg) {
    if (Math.abs(+arg)+1) 
      return true
    return false
  }

  isOperation(arg) {
    return ['^', '/', '*', '+', '-', '%'].includes(arg)
  }

  isString(arg) {
    if (~arg.toString().search(/^[a-z]+\d*$/i))
      return true
    return false
  }

  isBkt(arg) {
    if (arg == '(' || arg == ')') 
      return true
    return false
  }
  
  isOpenBkt(arg) {
    if (arg == '(') 
      return true
    return false
  }

  isCloseBkt(arg) {
    if (arg == ')') 
      return true
    return false
  }

  isFact(arg) {
    if (arg == '!')
      return true
    return false
  }
  
  getFact(arg) {
    for (let i = arg-1; i > 0; i--) {
      arg *= i
    }
    return arg
  }
  
  getPrior(arg) {
    let prior = {
      "^": 4,
      "*": 3,
      "/": 3,
      "%": 3,
      "+": 2,
      "-": 2,
      "(": 1,
      ")": 1
    }
    return prior[arg] || 0
  }

  solveBinary(arg1, arg2, operation) {
    let result
    let lim = 14
    switch (operation) {
      case '*':
        result = +arg1 * +arg2
        break
      case '/':
        result = +arg1 / +arg2
        break
      case '-':
        result = +arg1 - +arg2
        break
      case '+':
        result = +arg1 + +arg2
        break
      case '^':
        result = Math.pow(+arg1, +arg2)
        break
      case '%':
        result = +arg1 % +arg2
        break
    }
    return this.round(result, lim)
  }

  solveFunction(arg, func) {
    let result
    let lim = 14
    switch (func) {
      case 'sin':
        result = Math.sin(arg)
        break
      case 'cos':
        result = Math.cos(arg)
        break
      case 'abs':
        result = Math.abs(arg)
        break
      case 'sqrt':
        result = Math.sqrt(arg)
        break
      case 'exp':
        result = Math.exp(arg)
        break
      case 'tg':
        result = Math.tan(arg)
        break
      case 'ctg':
        result = 1/Math.tan(arg)
        break
      case 'log':
        result = Math.log10(arg)
        break
      case 'ln':
        result = Math.log(arg)
        break
      case 'sec':
        result = 1/Math.cos(arg)
        break;
      case 'cosec':
        result = 1/Math.sin(arg)
        break
      case 'arcsin':
        result = Math.asin(arg)
        break
      case 'arccos':
        result = Math.acos(arg)
        break
      case 'arctg':
        result = Math.atan(arg)
        break
      case 'arcctg':
        result = Math.PI / 2 - Math.atan(arg)
        break
      case 'sh':
        result = Math.sinh(arg)
        break
      case 'ch':
        result = Math.cosh(arg)
        break
      case 'th':
        result = Math.tanh(arg)
        break
      case 'cth':
        result = Math.cosh(arg)/Math.sinh(arg)
        break
      case 'sgn':
        result = Math.sign(arg)
        break
      default:
        if (~func.search(/^log\d+/)) {
          result = Math.log(+arg)/Math.log(+func.replace('log', ''))
          break
        }
        return
    }
    return this.round(result, lim)
  }
}






