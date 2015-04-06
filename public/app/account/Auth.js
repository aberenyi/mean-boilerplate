angular
  .module('app')
  .factory('Auth', Auth);

function Auth(Identity, User, $http, $q)
{
  return {
    authenticateUser: function(username, password)
    {
      var dfd = $q.defer();
      $http
        .post('/login', {username: username, password: password})
        .then(function(response)
        {
          if (response.data.success)
          {
            //FIXME: User name collision
            var UserInstance = new User();
            angular.extend(UserInstance, response.data.user);
            Identity.currentUser = UserInstance;
            dfd.resolve(true);
          } else
          {
            dfd.resolve(false);
          }
        });
        return dfd.promise;
    },
    logoutUser: function ()
    {
      var dfd = $q.defer();
      $http.post('/logout', {logout: true}).then(function ()
      {
        Identity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function (role)
    {
      if (Identity.isAuthorized(role))
      {
        return true;
      }
      else
      {
        return $q.reject('not authorized');
      }

    },
    authorizeAuthenticatedUserForRoute: function ()
    {
      if (Identity.isAuthenticated())
      {
        return true;
      } else
      {
        return $q.reject('not authorized');
      }
    },
    authorizeAuthenticatedUserForProject: function(url)
    {
      return Identity.isAuthorizedForProject(url) ? true : $q.reject('not authorized');
    }
  };
}
