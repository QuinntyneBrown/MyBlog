(function () {
    "use strict";
    var componentId = "userListView";
    angular.module("user").directive(componentId, [component]);
    function component() {
        return {
            templateUrl: "/app/user/components/userListView/userListView.html",
            restrict: "E",
            replace: true,
            controllerAs: "viewModel",
            controller: ["userService", function (userService) {
                var self = this;
                self.remove = function (params) {
                    return userService.remove({ id: params.id }).then(function () {
                        for (var i = 0; i < self.entities.length; i++) {
                            if (self.entities[i].id == params.id) {
                                self.entities.splice(i, 1);
                            }
                            ;
                        }
                        ;
                    }).catch(function (error) {
                    });
                };
                function initialize() {
                    return userService.getAll().then(function (results) {
                        return self.entities = results;
                    });
                }
                ;
                initialize();
                return self;
            }],
            link: function (scope, elem, attr) {
            }
        };
    }
})();
//# sourceMappingURL=userListView.js.map