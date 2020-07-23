import { Calc } from './lib/calc'


Node.prototype.calc = function() {
  return new Calc(this, true)
}
