/// <reference path="../htmls/coverageHelper.html" />
/// <reference path="../htmls/Notifications.html" />
(function () {
    angular.module('app')

    .directive('startQuotee', function () {
        return {
            restrict: 'AECM',
            replace: true,
            templateUrl: '../../directives/htmls/startQuote.html',

            controller: ['$scope', '$location', '$rootScope', 'pinfactory', '$timeout', 'GENERAL_CONFIG', function ($scope, $location, $rootScope, pinfactory, $timeout, GENERAL_CONFIG) {
                var queryParams = $location.search();
                $scope.groupCode = queryParams.gCode;
                //pinfactory.getdevicelocation();
                //$timeout(function () {
                //    if ($rootScope.country != undefined && $rootScope.country != "India")
                //        $scope.zipCodeInfo = $rootScope.Zip;
                //}, 2000);
                

                $scope.startQuote = function (data) {
                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'Landing Page',
                        eventAction: 'Clicked Start a Quote',
                        eventLabel: '/PetInfo_LandingPage'
                    });
                    if (data == "" || data == undefined) {
                        $scope.quoteshow();
                    }
                    else {
						debugger;
                        if ($scope.groupCode != null && $scope.groupCode != "" && $scope.groupCode != undefined)
                        {
                            window.location.href = GENERAL_CONFIG.DF_BOP_UI + "petName=" + data + "&gCode=" + $scope.groupCode;
                        }
                        else {
                            window.location.href = GENERAL_CONFIG.DF_BOP_UI + "petName=" + data;
                        }
                        
                    }
                }
                $scope.quoteshow = function () {
                    $("#zip").css("border-color", "red");
                }
            }]
        }
    })

    .directive('defaultvalue', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                inputType: "@type",
                defaultvalue: "=value"
            },
            link: function ($scope, element, attr) {
                $scope.$watch('inputType', function (value) {
                    element.html("<div class='input-group date ng-scope pull-right col-md-2 col-sm-4 col-xs-6'><input type='text' ng-model='defaultvalue' class='form-control' placeholder=''/><span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span></span></div>");
                    angular.element(element.children()[0]).datepicker({ autoclose: true, todayHighlight: true });
                    $compile(element.contents())($scope);
                });
            },
        };
    })
   
}());