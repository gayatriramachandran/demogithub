var config_data = {
    'GENERAL_CONFIG': {
        'AGENT_URL': 'http://Uat-agent.4pawsins.com/',
        'CUSTOMER_URL': 'http://Uat-customer.4pawsins.com/',
        'DF_BOP_UI': 'http://Uat-quote.4pawsins.com/Products/PetInsurance/index.html?',
    }
    //,
    //'CONFIG': {
    //    'API_URL': 'http://deportalapi.azurewebsites.net'
    //}
}
angular.forEach(config_data, function (key, value) {
    angular.module("app").constant(value, key);
});