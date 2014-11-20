(function () {
    "use strict";

    var componentId = "registrationForm";

    angular.module("user").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/user/components/registrationForm/registrationForm.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {

                scope.submit = function () {

                }
            }
        };
    }
})();
