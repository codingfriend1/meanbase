ngAnalytics
===========

AngularJS Directive for [Google Analytics Embed API](https://developers.google.com/analytics/devguides/reporting/embed/v1/)

German tutorial on [FLYACTS website](http://www.flyacts.com/blog/angularjs-google-analytics-embed-api-nganalytics/)

## For Contribution and Pull-Requests
Please use the develop-branch!!!

## Functionality
* Authorization
* Add DataCharts
* Add ViewSelectors
* Connect DataCharts with ViewSelectors
* Create Reports

## Installation
* `bower install nganalytics` or `bower install fly-analytics`
* or download src/ng-analytics[.min].js
* or download latest [release](https://github.com/flyacts/ngAnalytics/archive/v1.0.0.zip)

## Usage
* include ng-analytics[.min].js in your index.html before your module definition

>
    <script type="text/javascript" src="src/ng-analytics.min.js"></script>

* add the ng-analytics module to your module/app dependencies

>  
    var myApp = angular.module('myApp', ['ngAnalytics']);

* set your Google Analytics clientId in your `run` block or use Service Tokens (see ng-analytics-auth)

>
    // inject ngAnalyticsService
    myAppModule.run(['ngAnalyticsService', function (ngAnalyticsService) {
        ngAnalyticsService.setClientId('YOUR_CLIENTID'); // e.g. xxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
    }]);

* add ng-analytics directives to your DOM

## Directives

### Authorization - ng-analytics-auth
Handles user authorization with Google.
Accepts `service-auth-token` attribute to set the auth token of a service account (accepts a string)

#### Usage
>
    <ng-analytics-auth label="Hallo:&nbsp;" hide-on-auth="true" auth-container="embed-api-auth-container"></ng-analytics-auth>

#### Attributes
* __label__ _(optional, default: Google default)_ - string with label of user account (e.g. "You are logged in as: " -> result: "You are logged in as: xxxxx@googlemail.com")
* __hide-on-auth__ _(optional, default: 'false')_ - bool-string if account string (see "label") should be hidden after authorization
* __auth-container__ _(optional, default: 'embed-api-auth-container')_ - string for the id of the created DOM-element

### ViewSelector - ng-analytics-view
Shows dropdowns to switch views for a website.

#### Usage
>
    <ng-analytics-view view-selector-container="view-selector-container" auth-container="embed-api-auth-container"></ng-analytics-view>

#### Attributes
* __auth-container__ _(optional, default: 'embed-api-auth-container')_ - string of the id of the auth-container - required to connect view with the authorization
* __view-selector-container__ _(optional, default: 'view-selector-container')_ - string for id of the created DOM-element

### DataChart - ng-analytics-chart
Adds a chart and can be connected to a viewSelector.

#### Usage
>
    <ng-analytics-chart chart="chart" view-selector-container="view-selector-container" auth-container="embed-api-auth-container"></ng-analytics-chart>

#### Attributes
* __chart__ _(required)_ - object (scope variable) for a google analytics ('ids' are not necessary if connected with viewSelector, 'container' is required to build DOM-nodes and inject the Google chart-object) - e.g.

>
    {
        reportType: 'ga',
        query: {
            metrics: 'ga:sessions',
            dimensions: 'ga:date',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
            ids: 'ga:XXXXXX' // put your viewID here or leave it empty if connected with a viewSelector
        },
        chart: {
            container: 'chart-container-1', // id of the created DOM-element
            type: 'LINE',
            options: {
                width: '100%'
            }
        }
    };

* __view-selector-container__ _(optional)_ - string of id for connected viewSelector
* __auth-container__ _(optional, default: 'embed-api-auth-container')_ - string of the id of the auth-container - required to connect chart with the authorization

### Report - ng-analytics-report
Adds report functionality to angular.
Sends single or multiple report-queries and get informed about the repsonse.

#### Usage
>
    <ng-analytics-report queries="queries" auth-container="embed-api-auth-container" view-selector-container="view-selector-container"></ng-analytics-report>

#### Attributes
* __queries__ _(required)_ - array of report-query object (scope variable) (query.
ids is required for each report-query if not connected with viewSelector, e.g.

>
    [{
        query: {
            ids: 'ga:xxxxxx',  // put your viewID here
            metrics: 'ga:sessions',
            dimensions: 'ga:city'
        }
    }];

* __view-selector-container__ _(optional)_ - string of id for connected viewSelector
* __auth-container__ _(optional, default: 'embed-api-auth-container')_ - string of the id of the auth-container - required to connect report with the authorization

### Active Users in realtime - ng-analytics-active-users
Adds a active user counter.

#### Usage
>
    <ng-analytics-active-users view-selector-container="view-selector-container" auth-container="embed-api-auth-container"></ng-analytics-active-users>

#### Attributes
* __view-selector-container__ _(optional, required if defaultIds not set)_ - string of id for connected viewSelector
* __auth-container__ _(optional, default: 'embed-api-auth-container')_ - string of the id of the auth-container - required to connect active user code with the authorization
* __default-ids__ _(optional, required if view-selector-container not set)_ - object with configuration and required ids-property
>
    $scope.defaultIds = {
        ids: 'ga:XXXXXX'
    };

* __active-users-container__ _(optional, default: 'active-users-container')_ - string for id of the created DOM-element
* __label__ _(optional, default: 'Active Users')_ - string for the label
* __increase-class__ _(optional, default: 'is-increasing')_ - css-class name, which is set, if user count has increased (class will be removed after 3 seconds)
* __decrease-class__ _(optional, default: 'is-decreasing')_ - css-class name, which is set, if user count has decreased (class will be removed after 3 seconds)

#### Events
AngularJS events which are triggered by the directive.

* __$gaReportSuccess__ - triggered after all report requests finished successfully, returns results of the queries and the connected DOM-element to easily process the data and put it in the DOM (like using chart.js)

>
    $rootScope.$on('$gaReportSuccess', function (event, response, element) {
        // process the 'response' and put it in the 'element'
    });

* __$gaReportError__ - triggered if a report request failed, returns results of the query and the connected DOM-element to easily process the error-data and put it in the DOM

>
    $rootScope.$on('$gaReportError', function (event, response, element) {
        // process the error 'response' and put it in the 'element'
    });
