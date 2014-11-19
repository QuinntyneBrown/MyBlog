(function () {

    "use strict";

    var app = angular.module("blog", ["configuration","core","session","ngRoute"]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/article/:id", {
            templateUrl: "/app/blog/views/article.html"
        });

    }


    ]);

})();