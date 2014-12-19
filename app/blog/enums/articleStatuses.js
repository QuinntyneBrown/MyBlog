(function () {
    'use strict';
    var typesId = "articleStatuses";
    angular.module("blog").value(typesId, types);
    function types() {
        return {
            draft: 0,
            approved: 1,
            published: 2
        };
    }
    ;
})();
//# sourceMappingURL=articleStatuses.js.map