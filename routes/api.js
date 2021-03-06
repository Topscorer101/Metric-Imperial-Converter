'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');


module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  
  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      //Invalid input handling
      if(initNum === 'invalid number' && initUnit === 'invalid unit') {return res.status(200).send('invalid number and unit')}
      if(initNum === 'invalid number') {return res.status(200).send('invalid number')}
      if(initUnit === 'invalid unit') {return res.status(200).send('invalid unit')}

    
      //res.json
      res.json({
        'initNum': initNum,
        'initUnit': initUnit,
        'returnNum': returnNum,
        'returnUnit': returnUnit,
        'string': toString
      })
  });
    
};
