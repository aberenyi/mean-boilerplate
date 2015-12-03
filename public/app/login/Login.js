'use strict';

var LoginCtrl = require('./LoginCtrl');

/**
 * @ngdoc service
 * @name app.login
 * @description Login modules
 * @requires app.login.LoginCtrl
 */
module.exports = angular
  .module('app.login', [])
  .controller('LoginCtrl', LoginCtrl);
