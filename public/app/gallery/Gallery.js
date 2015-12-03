'use strict';

var GalleryCtrl = require('./GalleryCtrl');

/**
 * @ngdoc service
 * @name app.gallery
 * @description Gallery module
 * @requires app.gallery.GalleryCtrl
 */
module.exports = angular
  .module('app.gallery', [])
  .controller('GalleryCtrl', GalleryCtrl);


