(function () {
    "use strict";

    var componentId = "commonLogo";

    angular.module("common").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/common/components/commonLogo/commonLogo.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
