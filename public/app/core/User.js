'use strict';

/**
 * @ngdoc service
 * @name app.User
 * @description User factory
 * @requires app.Identity
 * @requires app.User
 */
angular
  .module('app')
  .factory('User', User);

function User($resource)
{
  var UserResource = $resource('/api/me');

  UserResource.prototype.isAdmin = function()
  {
    return this.groups && this.groups.indexOf('admin') !== -1;
  };

  return UserResource;
}
