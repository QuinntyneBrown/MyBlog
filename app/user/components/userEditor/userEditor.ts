(function () {

    "use strict";

    var componentId = "userEditor";

    angular.module("user").directive(componentId, [component]);

    function component() {
        return {
            templateUrl: "/app/user/components/userEditor/userEditor.html",
            restrict: "E",
            replace: true,
            controllerAs: "viewModel",
            controller: ["$location", "$routeParams", "$scope", "userService", function ($location, $routeParams, $scope, userService) {

                var self = this;

                self.entity = {};

                self.save = function save() {

                    if (self.entity.id) {

                        return userService.update({ model: self.entity }).then(function (results) {

                            $location.path("/admin/users");

                        });
                    }
                    else {

                        return userService.add({ model: self.entity }).then(function (results) {

                            $location.path("/admin/users");

                        });
                    }

                };

                function initialize() {
                    return userService.getById({ id: $routeParams.id }).then(function (results) {

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