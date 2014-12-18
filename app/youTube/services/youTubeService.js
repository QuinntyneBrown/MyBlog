(function () {
    "use strict";

    var serviceId = "youTubeService";

    angular.module("youTube").service(serviceId, ["$route", service]);

    function service($route) {
        var self = this;

        self.getPlayerConfiguration = function getPlayerConfiguration() {
            return {
                videoid: $route.current.params.videoid,
                height: "390",
                width: "640",
                playerVars: {
                    autoplay: 1,
                    html5: 1,
                    theme: "light",
                    modesbranding: 0,
                    color: "white",
                    iv_load_policy: 3,
                    showinfo: 0,
                    controls: 0
                }
            };
        };

        return self;
    }
    ;
})();
//# sourceMappingURL=youTubeService.js.map
