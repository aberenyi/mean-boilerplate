'use strict';

/**
 * @ngdoc service
 * @name app.Identity
 * @description Auth factory
 * @requires app.User
 */
angular
  .module('app')
  .factory('Identity', Identity);

function Identity(User, store)
{
  //console.log(jwtHelper.decodeToken(store.get('token')))

  var currentUser;

  //page reload, but already authenticated
  if (!currentUser && isAuthenticated())
  {
    currentUser = User.get()
  }

  return {
    currentUser: currentUser,
    isAuthenticated: isAuthenticated,
    hasGroup: hasGroup
    //isAuthorized: isAuthorized,
    //isAuthorizedForProject: isAuthorizedForProject
  };

  function isAuthenticated()
  {
    return !!store.get('token');
  }

  function hasGroup(group)
  {
    return !!this.currentUser.groups && this.currentUser.groups.indexOf(group) > -1;
  }

  //function isAuthorized(role)
  //{
  //  return !!this.currentUser.groups && this.currentUser.groups.indexOf(role) > -1;
  //}

  //function isAuthorizedForProject(url)
  //{
  //  var authorizedForProject = false;
  //  angular.forEach(this.currentUser.projects, function(project)
  //  {
  //    if (project.url === url)
  //    {
  //      authorizedForProject = true;
  //    }
  //  });
  //  return !!this.currentUser && authorizedForProject;
  //}
}
