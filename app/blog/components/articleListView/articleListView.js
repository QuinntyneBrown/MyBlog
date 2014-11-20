(function () {

    "use strict";

    var componentId = "articleListView";

    angular.module("blog").directive(componentId, ["$location", "$route", "articleService", component]);

    function component($location, $route, articleService) {
        return {
            templateUrl: "/app/blog/components/articleListView/articleListView.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attr) {

                scope.remove = function (params) {

                    return articleService.remove({ id: params.Id }).then(function () {

                        for (var i = 0; i < scope.models.length; i++) {

                            if (scope.models[i].Id == params.Id) {

                                scope.models.splice(i, 1);

                            }
                        }

                    }).catch(function (error) {

                    });
                };

                return articleService.getAll().then(function (results) {

                    scope.models = results;

                });
               
                
            }
        };
    }

})();