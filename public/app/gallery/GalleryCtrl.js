require('../account/Identity');

angular
  .module('app')
  .controller('GalleryCtrl', GalleryCtrl);

function GalleryCtrl(Identity)
{
  var vm = this;
  vm.projects = Identity.currentUser.projects;
}
