(function () {

    "use strict";

    var componentId = "articleEditor";

    angular.module("blog").directive(componentId, [component]);

    function component() {
        return {
            templateUrl: "/app/blog/components/articleEditor/articleEditor.html",
            restrict: "E",
            replace: true,
            controllerAs:"viewModel",
            controller: ["$location", "$routeParams", "articleService", function ($location, $routeParams, articleService) {

                var self = this;

                self.entity = {};

                self.save = function save() {

                    if (self.entity.id) {

                        return articleService.update({ model: self.entity }).then(function (results) {

                            $location.path("/admin/articles");

                        });
                    }
                    else {

                        return articleService.add({ model: self.entity }).then(function (results) {

                            $location.path("/admin/articles");

                        });
                    }



                };
                function initialize() {
                    return articleService.getById({ id: $routeParams.id }).then(function (results) {

                        if (results) {
                            return self.entity = results;
                        }

                    });
                };

                initialize();

                return self;

            }],
            link: function (scope, elem, attr) {

            }
        };
    }

})();