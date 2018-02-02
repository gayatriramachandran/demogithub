
//(function () {

  
    var mainService = ['$http', '$q', 'GENERAL_CONFIG', function ($http, $q, GENERAL_CONFIG) {
        this.doApiRequest = function (url) {
            var deferred = $q.defer();
            var urlCalls = [];
            // var baseurl = GENERAL_CONFIG.API_URL;
            var requestUrl = url;//baseurl + '/' + url;

            $http.get(requestUrl, {

            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);

            });
            return deferred.promise;
        }
        this.doAPIPostRequest = function (url, method, dataObj) {

            var deferred = $q.defer();
            //var baseurl = GENERAL_CONFIG.NOTIFICATIONAPI_URL;
            var requestUrl = url;//baseurl + '/' + url;
            return $http({
                'url': requestUrl,
                'method': method,//'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    //  'Ocp-Apim-Subscription-Key': GENERAL_CONFIG.FITAPI_KEY//QA
                },
                'data': dataObj,

            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error, status, errormessage, data) {
                deferred.reject(data);

            });
            return deferred.promise;
        }
        this.makeAPIRequest = function (url, method) {
            var deferred = $q.defer();
            var baseurl = GENERAL_CONFIG.FITAPI_URL;
            var requestUrl = baseurl + '/' + url;
            return $http({
                'url': requestUrl,
                'method': 'GET',
                'headers': {
                    'Content-Type': undefined,
                    'Ocp-Apim-Subscription-Key': GENERAL_CONFIG.FITAPI_KEY //QA
                },
                'cache': true
            }).success(function (response) {
                return response.data;
            }).error(function (response, status, errormessage) {
                return errormessage;
            });
        } 
    }];

    var profileManagementService = ['mainService','GENERAL_CONFIG', function (mainService,GENERAL_CONFIG) {
       
    }];

    var coverageHelperService = ['mainService', 'GENERAL_CONFIG', function (mainService, GENERAL_CONFIG) {

    }];

    var PersonalAuto = ['mainService', 'GENERAL_CONFIG', function (mainService, GENERAL_CONFIG) {

    }];
   
//}());
    angular.module("app")
   .service('mainService', mainService)
  .service('profileManagementService', profileManagementService)
  .service('coverageHelperService', coverageHelperService)
  .service('PersonalAuto', PersonalAuto)


