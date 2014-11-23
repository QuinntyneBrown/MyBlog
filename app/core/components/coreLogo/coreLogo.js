(function () {
    "use strict";

    var componentId = "coreLogo";

    angular.module("core").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/core/components/coreLogo/coreLogo.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
