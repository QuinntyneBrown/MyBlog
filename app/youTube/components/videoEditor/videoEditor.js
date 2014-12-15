(function () {

    "use strict";

    var componentId = "videoEditor";

    angular.module("youTube").directive(componentId, [component]);

    function component() {
        return {
            templateUrl: "/app/youTube/components/videoEditor/videoEditor.html",
            restrict: "E",
            replace: true,
            controllerAs: "viewModel",
            controller: ["$location", "$routeParams", "$scope", "youTubeService", function ($location, $routeParams, $scope, youTubeService) {

                var timeoutId = null;

                $scope.$watch(
                    function ($scope) {
                        return self.entity.title;
                    },
                    function (newValue) {
                        if (!self.entity.id && newValue != null) {


                            try {
                                clearTimeout(timeoutId);
                            } catch (error) {

                            }

                            timeoutId = setTimeout(function () {
                                return youTubeService.add({ model: self.entity }).then(function (results) {

                                    $location.path("/admin/video/edit/" + results.data.id);
                                });

                            }, 1000);

                        }

                        self.entity.slug = self.entity.title.replace(" ", "-").toLowerCase();
                    }
                );

                var self = this;

                self.entity = {};

                self.remove = function () {

                    return youTubeService.remove({ id: self.entity.id }).then(function () {

                        $location.path("/admin/videos");

                    }).catch(function (error) {

                    });
                };

                self.save = function save() {

                    if (self.entity.id) {

                        return youTubeService.update({ model: self.entity }).then(function (results) {

                            $location.path("/admin/videos");

                        });
                    }
                    else {

                        self.entity.pubDate = new Date().toISOString();

                        return youTubeService.add({ model: self.entity }).then(function (results) {

                            $location.path("/admin/videos");

                        });
                    }

                };

                self.approve = function approve() {

                    self.entity.status = videoStatuses().approved;

                    self.save();
                };

                self.publish = function publish() {

                    self.entity.status = videoStatuses().published;

                    self.save();
                };

                function initialize() {
                    return youTubeService.getById({ id: $routeParams.id }).then(function (results) {

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