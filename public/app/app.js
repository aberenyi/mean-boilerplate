'use strict';

angular.module('app', ['ngRoute', 'oc.lazyLoad', 'ngResource', 'ngMaterial', 'ngMessages', 'angular-storage',
  'angular-jwt']);

//common modules
require('./core/User');
require('./core/Identity');
require('./core/Auth');

require('../styles/overrides.css')
require('../styles/boilerplate.css')

angular
  .module('app')
  .config(function($routeProvider, $httpProvider, $locationProvider, $mdIconProvider, jwtInterceptorProvider)
  {
    jwtInterceptorProvider.tokenGetter = function(store)
    {
      return store.get('token')
    };

    $httpProvider.interceptors.push('jwtInterceptor');

    var routeRoleChecks =
    {
      //project:
      //{
      //  auth: ['Auth', '$location', function(Auth, $location)
      //  {
      //    return Auth.authorizeAuthenticatedUserForProject($location.url());
      //  }]
      //},
      admin:
      {
        auth: ['Auth', function(Auth)
        {
          return Auth.authorizeCurrentUserForRoute('admin');
        }]
      }//,
      //user:
      //{
      //  auth: ['Auth', function(Auth)
      //  {
      //    return Auth.authorizeAuthenticatedUserForRoute();
      //  }]
      //}
    };

    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {templateUrl: '/partials/login/login', controller: 'LoginCtrl as vm',
        resolve:
        {
          lazyLoad: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad)
          {
            var deferred = $q.defer();
            require.ensure([], function()
            {
              var module = require('./login/Login');
              $ocLazyLoad.load({name: 'app.login'});
              deferred.resolve(module);
            });

            return deferred.promise;
          }]
        }
      })
      .when('/admin', {templateUrl: '/partials/admin/admin', resolve:
      {
        auth: ['$q', 'Auth', function($q, Auth)
        {
          var dfd = $q.defer()
          if (Auth.authorizeCurrentUserForRoute('admin'))
          {
            dfd.resolve()
          }
          else
          {
            dfd.reject('not authorized')
          }
          return dfd.promise;
        }]
      }})
      .when('/gallery', {templateUrl: '/partials/gallery/gallery',
        controller: 'GalleryCtrl as vm', resolve:
        {
          lazyLoad: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad)
          {
            var deferred = $q.defer();
            require.ensure([], function()
            {
              var module = require('./gallery/Gallery');
              $ocLazyLoad.load({name: 'app.gallery'});
              deferred.resolve(module);
            });

            return deferred.promise;
          }]/*,
          auth: ['$q', 'Auth', function($q, Auth)
          {
            var dfd = $q.defer()
            if (Auth.authorizeCurrentUserForRoute('admin'))
            {
              dfd.resolve(true)
            }
            else
            {
              dfd.reject(false)
            }
            return dfd.promise;
          }]*/
        }
      })

    $mdIconProvider
      .iconSet('action', 'assets/icons/sets/svg-sprite-action.svg', 24)
  });

angular
  .module('app')
  .run(function($rootScope, $location)
  {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection)
    {
      if (rejection == 'not authorized')
      {
        $location.path(previous.originalPath || '/');
      }
    });
  });
