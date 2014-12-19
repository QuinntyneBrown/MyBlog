(function () {

    "use strict";

    var app = angular.module("trainingPlan", ["configuration", "common", "core", "session", "ngRoute"]);

    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

            .when("/trainingPlan/:slug", {
                templateUrl: "/app/trainingPlan/views/default.html",
                resolve: ["trainingPlanRouteResolver", function (trainingPlanRouteResolver) {
                    return trainingPlanRouteResolver.resolveRoute();
                }],
                authorizationRequired: false
            });
    }


    ]);

})();