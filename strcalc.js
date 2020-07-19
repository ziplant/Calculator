import { Calc } from './dev/js/lib/calc'


exports.calc = function(elem) {
  elem.calc = function() {
    new Calc(this)
  }
}
