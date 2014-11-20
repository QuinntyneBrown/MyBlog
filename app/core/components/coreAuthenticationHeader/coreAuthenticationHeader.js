(function () {
    "use strict";

    var componentId = "coreAuthenticationHeader";

    angular.module("core").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/core/components/coreAuthenticationHeader/coreAuthenticationHeader.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
