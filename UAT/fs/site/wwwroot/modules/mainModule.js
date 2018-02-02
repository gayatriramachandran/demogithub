
(function () {
    var app = angular.module("app", ['ngMap', 'ngAnimate', 'toastr'])
    .config([
    '$compileProvider',
    function ($compileProvider) {
        // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
    ]);
    app.filter('unique', function () {
        return function (collection, keyname) {
            var output = [],
                keys = []
            found = [];

            if (!keyname) {

                angular.forEach(collection, function (row) {
                    var is_found = false;
                    angular.forEach(found, function (foundRow) {

                        if (foundRow == row) {
                            is_found = true;
                        }
                    });

                    if (is_found) { return; }
                    found.push(row);
                    output.push(row);

                });
            }
            else {

                angular.forEach(collection, function (row) {
                    var item = row[keyname];
                    if (item === null || item === undefined) return;
                    if (keys.indexOf(item) === -1) {
                        keys.push(item);
                        output.push(row);
                    }
                });
            }

            return output;
        };
    });
    app.run(function ($rootScope) {
        $rootScope.AllMessages = [];
        $rootScope.AllCoverages = [];
        $rootScope.delDupCoverages = [];
        $rootScope.AgentId = '';
        $rootScope.mobile = '';
    })
  .factory('pinfactory', ['$q', '$rootScope', function ($q, $rootScope) {
      var deviceLocation = {
          "country": "",
          "state": "",
          "city": "",
          "pinCode": "",
          "message": ""
      }

      //return deviceLocation;
      return {
          getdevicelocation: function () {
              window.navigator.geolocation.getCurrentPosition(function (pos) {
                  //console.log(pos);
                  var point = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                  new google.maps.Geocoder().geocode({ 'latLng': point }, function (res, status) {

                      var zip = res[0].formatted_address.match(/[0-9]+/g); //(/,\s\w{2}\s(\d{5})/);
                      //alert('Zip code is ' + zip[zip.length - 1]);
                      $rootScope.Zip = zip[zip.length - 1];
                      $rootScope.country = res[0].formatted_address.slice(res[0].formatted_address.lastIndexOf(' ') + 1);
                  });
              });


          }
      }
  }])
}());




