(function () {

    "use strict";

    var componentId = "articleListView";

    angular.module("blog").directive(componentId, [component]);

    function component() {
        return {
            templateUrl: "/app/blog/components/articleListView/articleListView.html",
            restrict: "E",
            replace: true,
            controllerAs: "viewModel",
            controller: ["articleService", function (articleService) {

                var self = this;

                self.displayStatus = function (status) {

                    switch (status) {
                        case 0:
                            return "Draft";
                            break;

                        case 1:
                            return "Ready To Be Published";
                            break;

                        case 2:
                            return "Published";
                            break;

                    }
                    
                };

                self.remove = function (params) {

                    return articleService.remove({ id: params.id }).then(function () {

                        for (var i = 0; i < self.entities.length; i++) {
                            if (self.entities[i].id == params.id) {
                                self.entities.splice(i, 1);
                            };
                        };

                    }).catch(function (error) {

                    });
                };

                function initialize() {
                    return articleService.getAll().then(function (results) {
                        return self.entities = results;
                    });
                };


                initialize();
                

                return self;


            }],
            link: function (scope, elem, attr) {
 
            }         
        };
    }

})();