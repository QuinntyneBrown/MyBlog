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
            controller: ["$location", "$routeParams", "articleService", "articleStatuses", function ($location, $routeParams, articleService, articleStatuses) {

                var self = this;

                self.entity = {};

                self.remove = function () {

                    return articleService.remove({ id: self.entity.id }).then(function () {

                        $location.path("/admin/articles");

                    }).catch(function (error) {

                    });
                };

                self.save = function save() {

                    if (self.entity.id) {

                        return articleService.update({ model: self.entity }).then(function (results) {

                            $location.path("/admin/articles");

                        });
                    }
                    else {

                        self.entity.pubDate = new Date().toISOString();

                        return articleService.add({ model: self.entity }).then(function (results) {

                            $location.path("/admin/articles");

                        });
                    }

                };

                self.approve = function approve() {

                    self.entity.status = articleStatuses().approved;

                    self.save();
                };

                self.publish = function publish() {

                    self.entity.status = articleStatuses().published;

                    self.save();
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