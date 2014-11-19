(function () {

    "use strict";

    var app = angular.module("app", ["ngRoute", "blog", "core", "session"]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/",
        {
            templateUrl: 'app/home/views/default.html'
        })
        .otherwise("/");

    }]);

})();








