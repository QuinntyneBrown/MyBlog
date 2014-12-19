(function () {
    "use strict";

    var componentId = "commonHeader";

    angular.module("common").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/common/components/commonHeader/commonHeader.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
