angular
  .module('app')
  .factory('User', User);

function User($resource)
{
  //var UserResource = $resource('/api/users/:id', {_id: "@id"});
  var UserResource = $resource();

  UserResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  };

  return UserResource;
}
