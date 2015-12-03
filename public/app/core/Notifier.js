'use strict';

/**
 * @ngdoc service
 * @name app.toastr
 * @description Materialize global value
 */
angular
  .module('app')
  .value('Materialize', Materialize);

/**
 * @ngdoc service
 * @name app.Notifier
 * @description Notifier factors
 * @requires app.toastr
 */
angular
  .module('app')
  .factory('Notifier', Notifier);

function Notifier(Materialize)
{
  return {
    notify: function(msg, duration)
    {
      var _duration = !!duration ? duration : 1000;
      Materialize.toast(msg, _duration, 'green');
    },
    error: function (msg, duration)
    {
      var _duration = !!duration ? duration : 1000;
      Materialize.toast(msg, _duration, 'red');
    }
  };
}
