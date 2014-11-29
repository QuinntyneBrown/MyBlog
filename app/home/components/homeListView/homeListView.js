(function () {

    "use strict";

    var componentId = "homeListView";

    angular.module("app").directive(componentId, ["articleService", component]);

    function component(articleService) {

        return {
            templateUrl: "/app/home/components/homeListView/homeListView.html",
            replace: true,
            restrict: "E",
            controllerAs:"viewModel",
            controller: ["articleService", function (articleService) {

                var self = this;

                function initialize() {
                    return articleService.getAll().then(function (results) {

                        return self.articles = results;

                    });
                }

                self.loadMoreArticles = function () {

                };

                initialize();

                return self;

            }],
            link: function ( scope, elem, attr ) {

                
            }
        }
    }

})();