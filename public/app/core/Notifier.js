angular
  .module('app')
  .value('toastr', toastr);

angular
  .module('app')
  .factory('Notifier', Notifier);

function Notifier(toastr)
{
  return {
    notify: function(msg)
    {
      toastr.success(msg);
    },
    error: function (msg)
    {
      toastr.error(msg);
    }
  };
}
