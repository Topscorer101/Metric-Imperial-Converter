function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;      
    let alphaRegex = /[a-z]/i;
    let numRegex = /[/](.*)([/])/g;       
    result = input.slice(0,input.indexOf(alphaRegex.exec(input)));   
    if(numRegex.test(result)) {
      result = "invalid number";
    } else { 
      if(result == '') {
         result = 1; 
      } else {
        eval(result);
        if(result instanceof SyntaxError) {
        result = "invalid number";
        } else {
          result = eval(result)
        }
      }
    }
    return result;
    
  };
  
  
  this.getUnit = function(input) {
    let result;            
    let alphaRegex = /[a-z]/i;
    let unitRegex = /^gal$|^l$|^lbs$|^kg$|^mi$|^km$/i;
    result = input.slice(input.indexOf(alphaRegex.exec(input)));
    if(unitRegex.test(result)) {
      result = result
    } else {
      result = 'invalid unit'
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;    
    initUnit = initUnit.toLowerCase();
    switch(initUnit) {
      case 'kg':
        result = 'lbs';
        break;
      case 'lbs':
        result = 'kg';
          break;
      case 'l':
          result = 'gal';
          break;
      case 'gal':
          result = 'L';
          break;
      case 'km':
          result = 'mi';
          break;
      case 'mi':
          result = 'km';
          break;
      default:
          result = 'invalid unit';
          break;
      }
    return result;
  };
  

  this.spellOutUnit = function(unit) {
    let result;            
    unit = unit.toLowerCase();
    switch(unit) {
      case 'kg':
          result = 'kilograms';
          break;
      case 'lbs':
          result = 'pounds';
          break;
      case 'l':
          result = 'liters';
          break;
      case 'gal':
          result = 'gallons';
          break;
      case 'km':
          result = 'kilometers';
          break;
      case 'mi':
          result = 'miles';
          break;
           default:
          result = 'units';
          break;         
      }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    initUnit = initUnit.toLowerCase();
    let result;       
    switch(initUnit) {
      case 'kg':
          result = initNum / lbsToKg;
          break;
      case 'lbs':
          result = initNum * lbsToKg;
          break;
      case 'l':
          result = initNum / galToL;
          break;
      case 'gal':
          result = initNum * galToL;
          break;
      case 'km':
          result = initNum / miToKm;
          break;
      case 'mi':
          result = initNum * miToKm;
          break;
      default:
          result = 'invalid number';
          break;         
      }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
   let result;            
    
    function rounding(number) {
      return +(Math.round(number + "e+5") + "e-5")
    }
    
    result = `${rounding(initNum)} ${this.spellOutUnit(initUnit)} converts to ${rounding(returnNum)} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
