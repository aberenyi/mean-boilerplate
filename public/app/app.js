'use strict';

angular.module('app', ['ngRoute', 'oc.lazyLoad', 'ngResource', 'ngMaterial', 'ngMessages']);

//common modules
require('./core/User');
require('./core/Identity');
require('./core/Auth');
//require('./_core/Notifier');

//require('./project/ProjectCtrl');

require('../styles/boilerplate.css');

angular
  .module('app')
  .config(function($routeProvider, $locationProvider)
  {
    var routeRoleChecks =
    {
      project:
      {
        auth: ['Auth', '$location', function(Auth, $location)
        {
          return Auth.authorizeAuthenticatedUserForProject($location.url());
        }]
      },
      admin:
      {
        auth: ['Auth', function(Auth)
        {
          return Auth.authorizeCurrentUserForRoute('admin');
        }]
      },
      user:
      {
        auth: ['Auth', function(Auth)
        {
          return Auth.authorizeAuthenticatedUserForRoute();
        }]
      }
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
      .when('/admin', {templateUrl: '/partials/admin/dummy', resolve: routeRoleChecks.admin})
      .when('/gallery', {templateUrl: '/partials/gallery/gallery',
        controller: 'GalleryCtrl as vm'/*, controllerAs: 'vm'*/, resolve:
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
          }]
        }
      })
      /*.when('/:client/:project', {templateUrl: '/partials/project/project',
        controller: 'ProjectCtrl', controllerAs: 'vm', resolve: routeRoleChecks.project
      })*/;
  });


angular
  .module('app')
  .run(function($rootScope, $location)
  {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection)
    {
      if (rejection === 'not authorized')
      {
        $location.path('/');
      }
    });
  });
