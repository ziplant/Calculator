import { Calc } from './lib/calc'


Node.prototype.calc = function() {
  new Calc(this)
}
