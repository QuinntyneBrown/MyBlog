(function () {

    "use strict";

    var app = angular.module("app", ["ngRoute"]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/",
        {
            templateUrl: 'app/views/list.html'
        })
        .when("/post/:index",
        {
            templateUrl: 'app/views/post.html'
        })
        .otherwise("/");

    }]);

})();


(function () {

    "use strict";

    var serviceId = "blogService";

    angular.module("app").service(serviceId, ["$http", "$q", service]);

    function service($http, $q) {

        var self = this;

        self.getPosts = function () {
            return $q.when([
                { name: "Rememberance Day Post", body: "Great to Remember!" },
                { name: "Chistmas Is Next", body: "Yes!" }
            ]);

            //return $http({ method: "GET", url: "/api/post/getall" }).then(function (results) {
            //    return results;
            //});
        };

        return self;
    };

})();


(function () {

    "use strict";

    var controllerId = "blogController";

    angular.module("app").controller(controllerId, ["blogService",controller]);

    function controller(blogService) {

        var self = this;

        blogService.getPosts().then(function (results) {

            self.posts = results;

        });

        return self;

    };

})();


(function () {

    "use strict";

    var controllerId = "postController";

    angular.module("app").controller(controllerId, ["blogService", "$routeParams", controller]);

    function controller(blogService, $routeParams) {

        var self = this;

        blogService.getPosts().then(function (results) {

            self.post = results[$routeParams.index];

        });

        return self;

    };

})();