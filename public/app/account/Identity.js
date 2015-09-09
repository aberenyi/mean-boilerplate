require('./User');

angular
  .module('app')
  .factory('Identity', Identity);

function Identity($window, User)
{
  var currentUser;
  if (!!$window.__user)
  {
    currentUser = new User();
    angular.extend(currentUser, $window.__user);
  }

  return {
    currentUser: currentUser,
    isAuthenticated: isAuthenticated,
    isAuthorized: isAuthorized,
    isAuthorizedForProject: isAuthorizedForProject
  };

  function isAuthenticated()
  {
    return !!this.currentUser;
  }

  function isAuthorized(role)
  {
    return !!this.currentUser && this.currentUser.groups.indexOf(role) > -1;
  }

  function isAuthorizedForProject(url)
  {
    var authorizedForProject = false;
    angular.forEach(this.currentUser.projects, function(project)
    {
      if (project.url === url)
      {
        authorizedForProject = true;
      }
    });
    return !!this.currentUser && authorizedForProject;
  }
}
