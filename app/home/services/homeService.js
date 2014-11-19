(function () {
    
    "use strict";

    var serviceId = "homeService";
    
    angular.module("app").service(serviceId, ["blogService", service]);


    function service() {

        var self = this;

        self.getAllArticles = function getAllArticles() {

            return blogService.getAllArticles();

        };

        return self;
    }


})();