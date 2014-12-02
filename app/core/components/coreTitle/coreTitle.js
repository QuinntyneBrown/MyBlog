(function () {
    "use strict";

    var componentId = "Title";

    angular.module("core").directive(componentId, [component]);

    function component() {

        return {
            template: "<title>{{ pageTitle }}</title>",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
