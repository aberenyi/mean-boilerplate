angular
  .module('app')
  .controller('ProjectCtrl', ProjectCtrl);

function ProjectCtrl(Identity, $location)
{
  var config = {},
    url = $location.url();

  if (Identity.currentUser.projects)
  {
    angular.forEach(Identity.currentUser.projects, function(project)
    {
      if (project.url === url)
      {
        config = project;
      }
    });
  }

  if (!config._id)
  {
    $location.path('/gallery');
  }

  var vm = this;
  vm.config = config;
}
