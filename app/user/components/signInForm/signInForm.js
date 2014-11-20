(function () {
    "use strict";

    var componentId = "signInForm";

    angular.module("user").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/user/components/signInForm/signInForm.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
