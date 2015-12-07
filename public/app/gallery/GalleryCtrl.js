'use strict';

/**
 * @ngdoc service
 * @name app.gallery.GalleryCtrl
 * @description Gallery controller
 * @requires app.Identity
 * @requires app.Auth
 */
function GalleryCtrl(Identity, Auth, $http, $mdToast, $mdSidenav, $location)
{
  var vm = this;
  vm.identity = Identity

  //DEV ONLY//
  vm.signout = function()
  {
    Auth.logoutUser().then(function()
    {
      $mdToast.showSimple('You have successfully signed out!');
      $location.path('/');
    });
  };

  vm.toggleRight = function ()
  {
    $mdSidenav('sidenavRight').toggle()
  }

  $http
    .get('/api/projects', {cache: true})
    .then(function(response)
    {
      if (response.status === 200 && response.data)
      {
        vm.projects = response.data
      }
    })
}

module.exports = GalleryCtrl;
