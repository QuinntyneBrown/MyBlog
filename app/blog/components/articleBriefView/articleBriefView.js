(function () {

    "use strict";

    var componentId = "articleBriefView";

    angular.module("blog").directive(componentId, ["$location", "$sce", component]);

    function component($location, $sce) {
        return {
            templateUrl: "/app/blog/components/articleBriefView/articleBriefView.html",
            restrict: "EA",
            replace: true,
            scope: {
                model:"="
            },
            link: function (scope, elem, attr) {

                $sce.trustAsHtml(scope.model.htmlBody);

                scope.goToFullView = function (model) {

                    $location.path("/article/" + model.id);

                }


                scope.displayDate = function (date) {

                    return moment(scope.model.pubDate).format("MMMM Do YYYY");
                };
            }
        };
    }

})();