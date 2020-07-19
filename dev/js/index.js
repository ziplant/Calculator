import { Calc } from './lib/calc'


Node.prototype.calc = function() {
  new Calc(this)
}

exports.calc = function() {
  Node.prototype.calc = function() {
    new Calc(this)
  }
}
