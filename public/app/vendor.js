'use strict';

global.$ = global.jQuery = require('jquery');

global.toastr = require('toastr');
require('../../node_modules/toastr/build/toastr.min.css');

require('../../node_modules/font-awesome/css/font-awesome.min.css');

global.angular = require('angular');
require('angular-route');
require('angular-resource');

require('bootstrap');
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('angular-bootstrap');

require('../styles/overrides.css');
