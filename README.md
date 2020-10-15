# strcalc

**Smart string calculator with variables.**  
Enter an expression of any complexity into field and get result instantly.  
Use own variables. In addition, may contain expression too.  

### Demo
https://ziplant.github.io/strcalc/

### Usage
- Include calc.css and calc.js files from dist directory into you page.  
- Call the node element calc() method to render calculator inside  
Example:  
```js
document.querySelector('#calc').calc() 
```
or use as npm module  
Example:
```js
import { Calc } from 'strcalc'
new Calc(document.querySelector('#calc'), true)
```
If flag true, styles will add as text inside style element  
By default styles not include  

Availiable operations:  
```js
^ / * + - %
```
Availiable functions:  
```js
sin()  
cos()  
abs()  
sqrt()  
exp()  
tg()  
ctg()  
logN()
ln() 
sec()  
cosec()  
arcsin()  
arccos()  
arcctg()  
sh()  
ch()  
th()  
cth()  
sgn()  
```
