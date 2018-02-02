var config_data = {
    'GENERAL_CONFIG': {
        'SEARCHWITHIN': 50,
        'FITAPI_URL': 'http://vmdedevapimg.azure-api.net',
        'USERPROFILEAPI_URL': 'https://nsm-pet-userprofile-uat-api.azurewebsites.net',
        'FITAPI_KEY': '94cede9c0ad7402cb836ec01ae1cb1d0',
        'AGENT_URL': 'http://nsm-pet-csrapp-uat-wapp.azurewebsites.net',
        'CUSTOMER_URL': 'http://nsm-pet-customer-uat-wapp.azurewebsites.net',
        'UNDERWRITER_URL': 'http://vm-de-uwapp-dev-wapp.azurewebsites.net',

        'Exp_Url': 'http://nsm-pet-workload-uat-wapp.azurewebsites.net/Products/PetInsurance/index.html',
        'NOTIFICATIONAPI_URL': 'http://vm-de-notification-dev-api.azurewebsites.net',
        'PCAPI_URL': 'http://vm-de-productcatalog-demo-api.azurewebsites.net/api',
        'NEWPOLICY_URL': 'http://vm-de-bizdynamicsapi-dev-api.azurewebsites.net/api'   
    }
}
angular.forEach(config_data, function (key, value) {
    angular.module("app").constant(value, key);
});
