(function () {

    "use strict";

    var componentId = "homeListView";

    angular.module("app").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/home/components/homeListView/homeListView.html",
            replace: true,
            restrict: "E",
            controllerAs:"viewModel",
            controller: ["articleService", "articleStatuses", function (articleService, articleStatuses) {

                var self = this;

                self.articleStatuses = articleStatuses;

                function initialize() {
                    return articleService.getAll({ status: articleStatuses().published}).then(function (results) {

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