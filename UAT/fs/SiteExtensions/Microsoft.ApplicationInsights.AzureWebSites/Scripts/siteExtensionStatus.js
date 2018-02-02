//
// Adapted from https://github.com/projectkudu/SiteExtensionUpdater
//

var siteExtensionsApiUrl = "/api/siteExtensions/Microsoft.ApplicationInsights.AzureWebSites";

var ajaxMethod = function (method, url, callbackSuccess, callbackFailure) {
    var http = new XMLHttpRequest();
    http.open(method, url, true);

    http.onreadystatechange = function () {
        // Invoke callback when state changes.
        if (http.readyState === 4) {
            if (http.status === 200) {
                callbackSuccess(JSON.parse(http.responseText));
            } else if (http.status >= 400) {
                callbackFailure(http.status, http.responseText);
            }
        }
    };
    http.send();
};

var ajaxPUTAsJson = function put(url, data, callbackSuccess, callbackFailure) {
    var http = new XMLHttpRequest();
    http.open("PUT", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.onreadystatechange = function () {
        // Invoke callback when state changes.
        if (http.readyState === 4) {
            if (http.status === 200) {
                callbackSuccess(JSON.parse(http.responseText));
            } else if (http.status >= 400) {
                callbackFailure(http.status, http.responseText);
            }
        }
    };

    http.send(JSON.stringify(data));
};

var ajaxGET = function get(url, callbackSuccess, callbackFailure) {
    ajaxMethod("GET", url, callbackSuccess, callbackFailure);
};

var ajaxDELETE = function get(url, callbackSuccess, callbackFailure) {
    ajaxMethod("DELETE", url, callbackSuccess, callbackFailure);
};

var tellUserSiteHasUpdated = function (delay) {
    delay = delay || 0;

    // All done. Give the kudu site some time to restart
    setTimeout(function () {
        siteExtensionStatusSpinner.stop();
        alert("A new version of the Application Insights site extension has been installed. We'll now reload this page for you to give you the latest updates.");
        location.reload();
    }, delay);
};

var restartScmSite = function () {
    var restartSiteCallback = function () {
        // All done. Give the kudu site some time to restart
        tellUserSiteHasUpdated(2000);
    };

    var scmW3wpProcessUrl = "/api/processes/0";
    ajaxDELETE(scmW3wpProcessUrl, restartSiteCallback, restartSiteCallback);
};

var updateSiteExtension = function (shouldRestartScmSite, retryAllowed) {

    shouldRestartScmSite = shouldRestartScmSite || false;
    retryAllowed = retryAllowed !== false;

    ajaxPUTAsJson(
        siteExtensionsApiUrl,
        { feed_url: "http://www.siteextensions.net/api/v2/", version: null },
        function () {
            if (shouldRestartScmSite) {
                restartScmSite();
            } else {
                tellUserSiteHasUpdated();
            }
        },
        function (err) {
            // If you installed the site extension manually, then Kudu doesn't know about it and we'll get 404
            if (err === 404) {
                
            }

            // If it fails the first time retry one more time
            if (retryAllowed) {
                setTimeout(
                    function () {
                        updateSiteExtension(shouldRestartScmSite, false);
                    }, 1000);
            }
        });
};

var startSiteExtensionUpdate = function () {
    siteExtensionStatusSpinner.start();
    var div = document.getElementById("ai-siteExtensionStatus-loading");
    div.style.removeProperty("display");
    div.getElementsByClassName("ms-Spinner-label")[0].innerText = "Upgrading site extension...";
    document.getElementById("ai-siteExtensionStatus-upToDate").style.display = "none";
    document.getElementById("ai-siteExtensionStatus-outOfDate").style.display = "none";

    updateSiteExtension();
}

var updateSiteExtensionStatusUI = function (status) {
    siteExtensionStatusSpinner.stop();

    document.getElementById("ai-siteExtensionStatus-loading").style.display = "none";

    var div;
    if (status.local_is_latest_version) {
        div = document.getElementById("ai-siteExtensionStatus-upToDate");
    }
    else {
        div = document.getElementById("ai-siteExtensionStatus-outOfDate");
    }

    div.style.removeProperty("display");
    var versionSpan = div.getElementsByClassName("ai-siteExtensionVersionItem-label")[0].innerText = status.version;
}

var getSiteExtensionStatus = function () {

    ajaxGET(siteExtensionsApiUrl,
        function (status) {
            updateSiteExtensionStatusUI(status);
        },
        function () {
            updateSiteExtensionStatusUI({
                version: "unknown"
            });
        }
    );
};

window.onload = function () {
    siteExtensionStatusSpinner = fabric.Spinner(document.getElementById("ai-siteExtensionStatus-loading"));
    siteExtensionStatusSpinner.start();
    getSiteExtensionStatus();
}