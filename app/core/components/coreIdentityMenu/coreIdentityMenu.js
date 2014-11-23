(function () {
    "use strict";

    var componentId = "coreIdentityMenu";

    angular.module("core").directive(componentId, ["session", component]);

    function component(session) {

        return {
            templateUrl: "/app/core/components/coreIdentityMenu/coreIdentityMenu.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {

                scope.session = session;
            }
        };
    }
})();
