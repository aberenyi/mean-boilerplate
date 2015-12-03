/**
 * @ngdoc controller
 * @name app.login.LoginCtrl
 * @description Login controller
 * @requires app.Identity
 * @requires app.Auth
 * @requires app.Notifier
 * @requires $location
 */
function LoginCtrl(Identity, Auth, $location, $mdToast)
{
  var vm = this;
  vm.identity = Identity;

  if (Identity.isAuthenticated())
  {
    $location.path('/gallery');
  }

  vm.signin = function(username, password)
  {
    Auth
      .authenticateUser(username, password)
      .then(function(success)
      {
        if (success)
        {
          $mdToast.showSimple('You have successfully logged in!');
          $location.path('/gallery');
        }
        else
        {
          $mdToast
            .simple()
            .content('Please try again.');
        }
      });
  };

  vm.signout = function()
  {
    Auth.logoutUser().then(function() {
      vm.username = '';
      vm.password = '';
      Notifier.notify('You have successfully signed out!');
      $location.path('/');
    });
  };
}

module.exports = LoginCtrl;
