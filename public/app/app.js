angular.module('app', ['ngResource', 'ngRoute']);

require('./account/Auth');
require('./account/LoginCtrl');
require('./gallery/GalleryCtrl');
require('./project/ProjectCtrl');

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
      .when('/', {templateUrl: '/partials/index/index'})
      .when('/admin', {templateUrl: '/partials/admin/duummy', resolve: routeRoleChecks.admin})
      .when('/gallery', {templateUrl: '/partials/gallery/gallery',
        controller: 'GalleryCtrl', controllerAs: 'vm'
      })
      .when('/:client/:project', {templateUrl: '/partials/project/project',
        controller: 'ProjectCtrl', controllerAs: 'vm', resolve: routeRoleChecks.project
      });
      /*
      .when('/signup', { templateUrl: '/partials/account/signup',
        controller: 'mvSignupCtrl'
      })
      .when('/profile', { templateUrl: '/partials/account/profile',
        controller: 'mvProfileCtrl', resolve: routeRoleChecks.User
      })
      */
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
