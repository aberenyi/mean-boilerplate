'use strict';

/**
 * @ngdoc service
 * @name app.Auth
 * @description Auth factory
 * @requires app.Identity
 * @requires app.User
 * @requires $http
 * @requires $q
 */
angular
  .module('app')
  .factory('Auth', Auth);

function Auth(Identity, User, $http, $q, store)
{
  return {
    authenticateUser: function(username, password)
    {
      var dfd = $q.defer();
      $http
        .post('/login', {username: username, password: password})
        .then(function(response)
        {
          if (response.data.success && response.data.user.token)
          {
            //store the token in the session storage
            store.set('token', response.data.user.token)

            //populate Identity's currentUser with groups & stuff
            User.get().$promise.then(function(user)
            {
              Identity.currentUser = user
              dfd.resolve(true);
            })
          }
          else
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
        store.remove('token');
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function(group)
    {
      //if (Identity.hasGroup(group))
      //{
      //  return true;
      //}
      //else
      //{
      //  console.log('nope')
      //  return $q.reject('not authorized');
      //}
      return Identity.hasGroup(group)
    }//,
    //authorizeAuthenticatedUserForRoute: function ()
    //{
    //  if (Identity.isAuthenticated())
    //  {
    //    return true;
    //  } else
    //  {
    //    return $q.reject('not authorized');
    //  }
    //},
    //authorizeAuthenticatedUserForProject: function(url)
    //{
    //  return Identity.isAuthorizedForProject(url) ? true : $q.reject('not authorized');
    //}
  };
}
