import { Exp } from "./exp"
import { cssText } from '../styles/calc'

export class Calc {
  constructor(root, style) {
    if (style) {
      let styleTag = document.createElement('style')
      styleTag.innerHTML = cssText
      document.querySelector('head').appendChild(styleTag)
    }
    
    this.template = require('../templates/calc-template').calc
    this.exp = new Exp()
    this.root = root
    this.root.innerHTML = ''
    this.root.appendChild(this.create(this.template))
    try {
      this.data = JSON.parse(localStorage.getItem(this.root.id)) || {}
    }
    catch {
      this.data = {}
    }
    this.input = this.root.querySelector('.calc_input')
    this.output = this.root.querySelector('.calc_result')
    this.input.value = this.data.exp || ''
    this.varList = this.data.vars
    
    for (let key in this.data.vars) {
      this.addVar(null, key, this.data.vars[key])
    }

    this.counting()
  }
  
  create(obj) {
    let element = document.createElement(obj.elem)

    for (let key in obj.attributes) {
      element.setAttribute(key, obj.attributes[key])
    }

    element.textContent = obj.text ? obj.text : ''

    for (let key in obj.events) {
      eval(`element.on${key} = (e) => {
        this.${obj.events[key]}.call(this, e)
      }`)
    }

    for (let key in obj.children) {
      element.appendChild(this.create(obj.children[key]))
    }

    return element
  }

  limitVar() {
    let limit = 5
    let addBtn = this.root.querySelector('.calc_btn--add')

    if (this.root.querySelectorAll('.vars_item').length >= limit) {
      addBtn.disabled = true
      addBtn.classList.add('calc_btn--disabled')
      return
    } else {
      addBtn.disabled = false
      addBtn.classList.remove('calc_btn--disabled')
    }
  }

  addVar(e, key, value) {
    let variable = require('../templates/var-template').variable
    let varsContainer = this.root.querySelector('.calc_vars')

    variable.children.key.attributes.value = key || ''
    variable.children.value.attributes.value = value || ''

    varsContainer.appendChild(this.create(variable))

    this.limitVar()
  }
  
  removeVar(e) {
    e.target.parentNode.remove()
    let key = e.target.parentNode.querySelector('.vars_key').value
    key ? delete this.varList[key] : null
    this.limitVar()
    this.setData()
    this.counting()
  }

  inputVar(e) {
    this.varList = {}
    let keys = this.root.querySelectorAll('.vars_key')
    let values = this.root.querySelectorAll('.vars_value')

    if (keys.length != values.length)
      return
    
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].value != "" && values[i].value != "") { 
        this.varList[keys[i].value] = values[i].value
        this.setData()
      }
    }
    this.counting()
  }

  counting() {
    this.setData()
    this.output.innerHTML = this.exp.getResult(this.input.value, this.varList)
  }

  clear() {
    localStorage.removeItem(this.root.id)
    this.input.value = ''
    this.output.innerHTML = ''
    this.root.querySelector('.calc_vars').innerHTML = ''
    this.varList = {}
    this.limitVar()
  }

  setData() {
    localStorage.setItem(this.root.id, 
      JSON.stringify({
        exp: this.input.value,
        vars: this.varList
      }))
  }
}