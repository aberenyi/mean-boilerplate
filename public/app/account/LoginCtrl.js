require('./Identity');
require('./Auth');
require('../core/Notifier');

angular
  .module('app')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl(Identity, Auth, Notifier, $location)
{
  var vm = this;
  vm.identity = Identity;
  vm.signin = function(username, password)
  {
    Auth
      .authenticateUser(username, password)
      .then(function(success)
      {
        if (success)
        {
          Notifier.notify('You have successfully signed in!');
          $location.path('/gallery');
        } else {
          Notifier.notify('Username/Password combination incorrect');
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
