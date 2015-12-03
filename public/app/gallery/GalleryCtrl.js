'use strict';

/**
 * @ngdoc service
 * @name app.gallery.GalleryCtrl
 * @description Gallery controller
 * @requires app.Identity
 * @requires app.Auth
 * @requires $location
 */
function GalleryCtrl(Identity, Auth, $mdToast, $mdSidenav, $location)
{
  var vm = this;
  vm.projects = Identity.currentUser.projects;

  vm.signout = function()
  {
    Auth.logoutUser().then(function() {
      vm.username = '';
      vm.password = '';
      $mdToast
        .simple()
        .content('You have successfully signed out!');
      $location.path('/');
    });
  };

  vm.toggleRight = function ()
  {
    $mdSidenav('right').toggle()
  }
}

module.exports = GalleryCtrl;
