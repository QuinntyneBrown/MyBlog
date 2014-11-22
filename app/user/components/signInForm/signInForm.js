(function () {
    "use strict";

    var componentId = "signInForm";

    angular.module("user").directive(componentId, ["$location", "identityService", "token", component]);
     
    function component($location, identityService, token) {

        return {
            templateUrl: "/app/user/components/signInForm/signInForm.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {

                scope.model = {
                    username: "Demo",
                    password: "password"
                };

                scope.tryToSignIn = function tryToSignIn() {

                    return identityService.signIn({ model: scope.model }).then(function (results) {

                        token.set({ data: results });

                        $location.path("/");

                    }).catch(function (error) {


                    });

                };
            }
        };
    }
})();
