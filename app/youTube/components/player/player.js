(function () {
    'use strict';

    var directiveId = "youTubePlayer";

    angular.module("youTube").directive(directiveId, ["$window", "youTubeService", control]);

    function control($window, youTubeService) {

        return {
            restrict: "E",
            template: "<div></div>",
            scope: {
            },
            link: function (scope, elem, attrs) {

                scope.model = youTubeService.getPlayerConfiguration();

                var tag = document.getElementById("youtube-player");

                if (tag) {
                    player = new YT.Player(elem.children()[0], {
                        playerVars: scope.model.playerVars,
                        height: scope.model.height,
                        width: scope.model.width,
                        videoId: scope.model.videoid
                    });
                }
                else {


                    tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/iframe_api";
                    tag.id = "youtube-player";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    var player;

                    scope.$watch("model.videoid", function (newValue, oldValue) {
                        if (newValue == oldValue) {
                            return;
                        }

                        player.cueVideoById(scope.model.videoid);

                    });

                    $window.onYouTubeIframeAPIReady = function () {
                        player = new YT.Player(elem.children()[0], {
                            playerVars: scope.model.playerVars,
                            height: scope.model.height,
                            width: scope.model.width,
                            videoId: scope.model.videoid
                        });
                    };
                }
            }
        };
    }
})();