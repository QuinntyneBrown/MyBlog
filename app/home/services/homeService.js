(function () {
    "use strict";
    var serviceId = "homeService";
    angular.module("app").service(serviceId, ["articleService", service]);
    function service(articleService) {
        var self = this;
        self.getAllArticles = function getAllArticles() {
            return articleService.getAll();
        };
        return self;
    }
})();
//# sourceMappingURL=homeService.js.map