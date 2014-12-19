(function () {
    "use strict";
    var app = angular.module("app", [
        "ngAnimate",
        "ngRoute",
        "ui.tinymce",
        "infinite-scroll",
        "admin",
        "blog",
        "book",
        "common",
        "configuration",
        "core",
        "search",
        "session",
        "trainingPlan",
        "user",
        "youTube"
    ]);
    app.config(["$httpProvider", "$locationProvider", "$routeProvider", "$rootScopeProvider", function ($httpProvider, $locationProvider, $routeProvider, $rootScopeProvider) {
        $rootScopeProvider.digestTtl(8);
        $httpProvider.interceptors.push("authorizationInterceptor");
        $httpProvider.useApplyAsync(true);
        $locationProvider.html5Mode(false);
        $routeProvider.when("/", {
            templateUrl: 'app/home/views/default.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        }).when("/about", {
            templateUrl: 'app/home/views/about.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        }).when("/settings", {
            templateUrl: 'app/home/views/settings.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        }).when("/404", {
            templateUrl: 'app/home/views/404.html',
        }).otherwise("/404");
    }]);
    app.run(["$http", "$location", "$rootScope", "$route", "currentUser", "token", function ($http, $location, $rootScope, $route, currentUser, token) {
        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {
            $rootScope.inViewTransition = true;
            if (newUrl.originalPath == "/signin") {
                token.set({ data: null });
            }
            ;
            if (newUrl.$$route && newUrl.$$route.authorizationRequired) {
                if (token.get() == null) {
                    $rootScope.$evalAsync(function () {
                        $location.path("/signin");
                    });
                }
                ;
            }
            ;
        });
        $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {
            $rootScope.inViewTransition = false;
            if ($route.current.$$route.authorizationRequired && (currentUser.get() == null || currentUser.get() == "")) {
                $location.path("/signin");
            }
            ;
        });
    }]);
})();
//# sourceMappingURL=module.js.map
var app;
(function (app) {
    "use strict";
    app.admin = angular.module("admin", ["blog", "configuration", "common", "core", "session", "ngRoute", "ngSanitize"]);
    app.admin.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/admin", {
            redirectTo: function () {
                return "/admin/articles";
            }
        });
    }]);
    app.admin.run(["$rootScope", "$location", function ($rootScope, $location) {
        $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {
            $rootScope.isAdmin = $location.path().substring(0, 6) == '/admin';
        });
    }]);
})(app || (app = {}));
//# sourceMappingURL=module.js.map
var admin;
(function (admin) {
    "use strict";
    var componentId = "adminMenu";
    angular.module("admin").directive(componentId, ["$location", "$routeParams", "articleService", "session", component]);
    function component($location, $routeParams, articleService, session) {
        return {
            templateUrl: "/app/admin/components/adminMenu/adminMenu.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attr) {
                scope.isUserInRole = session.isUserInRole;
                scope.currentUser = session.getCurrentUser();
            }
        };
    }
})(admin || (admin = {}));
//# sourceMappingURL=adminMenu.js.map
(function () {
    "use strict";
    var app = angular.module("blog", ["configuration", "common", "core", "session", "ngRoute", "ngSanitize"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/article/:slug", {
            templateUrl: "/app/blog/views/article.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        }).when("/admin/article/create", {
            templateUrl: "/app/blog/views/edit.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        }).when("/admin/article/edit/:id", {
            templateUrl: "/app/blog/views/edit.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        }).when("/admin/articles", {
            templateUrl: "/app/blog/views/list.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        });
    }]);
})();
//# sourceMappingURL=module.js.map
/// <reference path="../../../../scripts/typings/moment/moment.d.ts" />
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
                model: "="
            },
            link: function (scope, elem, attr) {
                $sce.trustAsHtml(scope.model.htmlBody);
                scope.goToFullView = function (model) {
                    $location.path("/article/" + model.slug);
                };
                scope.displayDate = function (date) {
                    return moment(scope.model.pubDate).format("MMMM Do YYYY");
                };
            }
        };
    }
})();
//# sourceMappingURL=articleBriefView.js.map
(function () {
    "use strict";
    var componentId = "articleEditor";
    angular.module("blog").directive(componentId, [component]);
    function component() {
        return {
            templateUrl: "/app/blog/components/articleEditor/articleEditor.html",
            restrict: "E",
            replace: true,
            controllerAs: "viewModel",
            controller: ["$location", "$routeParams", "$scope", "articleService", "articleStatuses", function ($location, $routeParams, $scope, articleService, articleStatuses) {
                var timeoutId = null;
                $scope.$watch(function ($scope) {
                    return self.entity.title;
                }, function (newValue) {
                    if (!self.entity.id && newValue != null) {
                        try {
                            clearTimeout(timeoutId);
                        }
                        catch (error) {
                        }
                        timeoutId = setTimeout(function () {
                            return articleService.add({ model: self.entity }).then(function (results) {
                                $location.path("/admin/article/edit/" + results.data.id);
                            });
                        }, 1000);
                    }
                    self.entity.slug = self.entity.title.replace(" ", "-").toLowerCase();
                });
                var self = this;
                self.entity = {};
                self.remove = function () {
                    return articleService.remove({ id: self.entity.id }).then(function () {
                        $location.path("/admin/articles");
                    }).catch(function (error) {
                    });
                };
                self.save = function save() {
                    if (self.entity.id) {
                        return articleService.update({ model: self.entity }).then(function (results) {
                            $location.path("/admin/articles");
                        });
                    }
                    else {
                        self.entity.pubDate = new Date().toISOString();
                        return articleService.add({ model: self.entity }).then(function (results) {
                            $location.path("/admin/articles");
                        });
                    }
                };
                self.approve = function approve() {
                    self.entity.status = articleStatuses().approved;
                    self.save();
                };
                self.publish = function publish() {
                    self.entity.status = articleStatuses().published;
                    self.save();
                };
                function initialize() {
                    return articleService.getById({ id: $routeParams.id }).then(function (results) {
                        if (results) {
                            return self.entity = results;
                        }
                    });
                }
                ;
                initialize();
                return self;
            }],
            link: function (scope, elem, attr) {
            }
        };
    }
})();
//# sourceMappingURL=articleEditor.js.map
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
                            }
                            ;
                        }
                        ;
                    }).catch(function (error) {
                    });
                };
                function initialize() {
                    return articleService.getAll().then(function (results) {
                        return self.entities = results;
                    });
                }
                ;
                initialize();
                return self;
            }],
            link: function (scope, elem, attr) {
            }
        };
    }
})();
//# sourceMappingURL=articleListView.js.map
(function () {
    "use strict";
    var componentId = "articleView";
    angular.module("blog").directive(componentId, ["$route", "$sce", "articleService", component]);
    function component($route, $sce, articleService) {
        return {
            templateUrl: "/app/blog/components/articleView/articleView.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attr) {
                scope.displayDate = function (date) {
                    return moment(scope.model.pubDate).format("MMMM Do YYYY");
                };
                return articleService.getBySlug({ slug: $route.current.params.slug }).then(function (results) {
                    scope.model = results;
                    $sce.trustAsHtml(scope.model.htmlBody);
                });
            }
        };
    }
})();
//# sourceMappingURL=articleView.js.map
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
(function () {
    "use strict";
    var dataServiceId = "articleService";
    angular.module("blog").service(dataServiceId, ["$http", "$q", "$rootScope", "articleStatuses", dataService]);
    function dataService($http, $q, $rootScope, articleStatuses) {
        var self = this;
        var baseUri = "api/article/";
        self.cache = {
            getAll: null,
            getById: null,
            getBySlug: null
        };
        $rootScope.$on("$locationChangeStart", function () {
            self.clearCache();
        });
        self.clearCache = function clearCache() {
            self.cache = {
                getAll: null,
                getById: null,
                getBySlug: null
            };
        };
        self.getAll = function getAll(params) {
            if (self.cache.getAll) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getAll);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getAll", params: params }).then(function (results) {
                self.cache.getAll = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.getById = function getById(params) {
            if (self.cache.getById && self.cache.getById.id == params.id) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getById);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getbyid?id=" + params.id }).then(function (results) {
                self.cache.getById = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.getBySlug = function getBySlug(params) {
            if (self.cache.getBySlug && self.cache.getBySlug.slug == params.slug) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getBySlug);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getbyslug?slug=" + params.slug }).then(function (results) {
                self.cache.getBySlug = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.remove = function remove(params) {
            return $http({ method: "DELETE", url: baseUri + "delete?id=" + params.id }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        self.add = function add(params) {
            return $http({ method: "POST", url: baseUri + "add", data: JSON.stringify(params.model) }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        self.publish = function publish(params) {
            params.model.pubDate = Date.now;
            params.model.status = articleStatuses().published;
            return self.update({ model: params.model });
        };
        self.approve = function approve(params) {
            params.model.status = articleStatuses().approved;
            return self.update({ model: params.model });
        };
        self.update = function update(params) {
            return $http({ method: "PUT", url: baseUri + "update", data: JSON.stringify(params.model) }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        return self;
    }
})();
//# sourceMappingURL=articleService.js.map
(function () {
    "use strict";
    var serviceId = "blogRouteResolver";
    angular.module("blog").service(serviceId, ["$location", "$q", "$route", "articleService", "configurationService", "identityService", service]);
    function service($location, $q, $route, articleService, configurationService, identityService) {
        var self = this;
        self.resolveRoute = function resolveRoute() {
            return configurationService.get().then(function () {
                return identityService.getCurrentUser().then(function () {
                    if ($route.current.params.id) {
                        return articleService.getById({ id: $route.current.params.id }).then(function () {
                        });
                    }
                    else if ($route.current.params.slug) {
                        return articleService.getBySlug({ slug: $route.current.params.slug }).then(function () {
                        });
                    }
                    else {
                        return articleService.getAll().then(function () {
                        });
                    }
                });
            });
        };
        return self;
    }
    ;
})();
//# sourceMappingURL=blogRouteResolver.js.map
(function () {
    "use strict";
    var app = angular.module("book", ["configuration", "common", "core", "session", "ngRoute"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/book/:slug", {
            templateUrl: "/app/book/views/default.html",
            resolve: ["bookRouteResolver", function (bookRouteResolver) {
                return bookRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        });
    }]);
})();
//# sourceMappingURL=module.js.map
//# sourceMappingURL=bookBrief.js.map
//# sourceMappingURL=bookEditor.js.map
//# sourceMappingURL=bookFull.js.map
//# sourceMappingURL=bookList.js.map
(function () {
    "use strict";
    var app = angular.module("common", ["configuration", "session"]);
})();
//# sourceMappingURL=module.js.map
(function () {
    "use strict";

    var componentId = "commonHeader";

    angular.module("common").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/common/components/commonHeader/commonHeader.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
(function () {
    "use strict";

    var componentId = "identityMenu";

    angular.module("common").directive(componentId, ["session", component]);

    function component(session) {

        return {
            templateUrl: "/app/common/components/identityMenu/identityMenu.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {

                scope.session = session;
            }
        };
    }
})();
(function () {
    "use strict";

    var componentId = "commonLogo";

    angular.module("common").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/common/components/commonLogo/commonLogo.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
(function () {

    "use strict";

    angular.module('ui.tinymce', [])
     .value('uiTinymceConfig', {})
     .directive('uiTinymce', ['uiTinymceConfig', function (uiTinymceConfig) {
         uiTinymceConfig = uiTinymceConfig || {};
         var generatedIds = 0;
         return {
             priority: 10,
             require: 'ngModel',
             link: function (scope, elm, attrs, ngModel) {
                 var expression, options, tinyInstance,
                   updateView = function () {
                       ngModel.$setViewValue(elm.val());
                       if (!scope.$root.$$phase) {
                           scope.$apply();
                       }
                   };


                 // generate an ID if not present 
                 if (!attrs.id) {
                     attrs.$set('id', 'uiTinymce' + generatedIds++);
                 }


                 if (attrs.uiTinymce) {
                     expression = scope.$eval(attrs.uiTinymce);
                 } else {
                     expression = {};
                 }


                 // make config'ed setup method available 
                 if (expression.setup) {
                     var configSetup = expression.setup;
                     delete expression.setup;
                 }


                 options = {
                     plugins: [
                         "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                         "searchreplace wordcount visualblocks visualchars code fullscreen",
                         "insertdatetime media nonbreaking save table contextmenu directionality",
                         "emoticons template paste textcolor colorpicker textpattern"
                     ],
                     toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                     toolbar2: "print preview media | forecolor backcolor emoticons",
                     // Update model when calling setContent (such as from the source editor popup) 
                     setup: function (ed) {
                         var args;
                         ed.on('init', function (args) {
                             ngModel.$render();
                             ngModel.$setPristine();
                         });
                         // Update model on button click 
                         ed.on('ExecCommand', function (e) {
                             ed.save();
                             updateView();
                         });
                         // Update model on keypress 
                         ed.on('KeyUp', function (e) {
                             ed.save();
                             updateView();
                         });
                         // Update model on change, i.e. copy/pasted text, plugins altering content 
                         ed.on('SetContent', function (e) {
                             if (!e.initial && ngModel.$viewValue !== e.content) {
                                 ed.save();
                                 updateView();
                             }
                         });
                         ed.on('blur', function (e) {
                             //elm.blur();
                         });
                         // Update model when an object has been resized (table, image) 
                         ed.on('ObjectResized', function (e) {
                             ed.save();
                             updateView();
                         });
                         if (configSetup) {
                             configSetup(ed);
                         }
                     },
                     mode: 'exact',
                     elements: attrs.id
                 };
                 // extend options with initial uiTinymceConfig and options from directive attribute value 
                 angular.extend(options, uiTinymceConfig, expression);
                 setTimeout(function () {
                     tinymce.init(options);
                 });


                 ngModel.$render = function () {
                     if (!tinyInstance) {
                         tinyInstance = tinymce.get(attrs.id);
                     }
                     if (tinyInstance) {
                         tinyInstance.setContent(ngModel.$viewValue || '');
                     }
                 };


                 scope.$on('$destroy', function () {
                     if (!tinyInstance) { tinyInstance = tinymce.get(attrs.id); }
                     if (tinyInstance) {
                         tinyInstance.remove();
                         tinyInstance = null;
                     }
                 });
             }
         };
     }]);

})();


(function () {
    "use strict";
    var app = angular.module("configuration", []);
})();
//# sourceMappingURL=module.js.map
(function () {

    "use strict";

    var serviceId = "configurationService";

    angular.module("configuration").service(serviceId, ["$http","$rootScope",service]);

    function service($http, $rootScope) {

        var self = this;

        var baseUri = "api/configuration/"

        self.get = function get() {

            return $http({ method: "GET", url: baseUri + "get" }).then(function (results) {

                $rootScope.configuration = results.data;

            }).catch(function (error) {

            });
        }

        return self;

    };

})();
(function () {
    "use strict";
    var app = angular.module("core", ["configuration", "session"]);
})();
//# sourceMappingURL=module.js.map
(function () {

    "use strict";

    var interceptorId = "authorizationInterceptor";

    angular.module("core").factory(interceptorId, ["$q", "$rootScope", "token", interceptor]);

    function interceptor($q, $rootScope, token) {

        var self = this;

        self.request = function (config) {

            if (token.get()) {

                config.headers["Authorization"] = "basic " + token.get();
            }

            return config;
        };

        return self;

    };

})();
(function () {
    "use strict";

    var factoryId = "storage";

    angular.module("core").factory(factoryId, [factory]);

    function factory() {

        var STORAGE_ID = 'ngBlogStorage';

        return {
            get: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            getByName: function (params) {
                var items = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');

                for (var i = 0; i < items.length; i++) {
                    if (params.name === items[i].name) {
                        return items[i];
                    };
                };

                return null;
            },

            put: function (params) {

                var items = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');

                for (var i = 0; i < items.length; i++) {
                    if (params.name === items[i].name) {
                        items[i].value = params.value;
                        localStorage.setItem(STORAGE_ID, JSON.stringify(items));
                        return;
                    };
                };

                items.push(params);
                localStorage.setItem(STORAGE_ID, JSON.stringify(items));

            }
        };

    };

})();

//# sourceMappingURL=module.js.map
//# sourceMappingURL=courseBrief.js.map
//# sourceMappingURL=courseEditor.js.map
//# sourceMappingURL=courseFull.js.map
//# sourceMappingURL=courseList.js.map
//# sourceMappingURL=courseRouteResolver.js.map
//# sourceMappingURL=courseService.js.map
//# sourceMappingURL=module.js.map
//# sourceMappingURL=feedbackService.js.map
//# sourceMappingURL=module.js.map
//# sourceMappingURL=feedbackService.js.map
(function () {
    "use strict";
    var componentId = "homeListView";
    angular.module("app").directive(componentId, [component]);
    function component() {
        return {
            templateUrl: "/app/home/components/homeListView/homeListView.html",
            replace: true,
            restrict: "E",
            controllerAs: "viewModel",
            controller: ["articleService", "articleStatuses", function (articleService, articleStatuses) {
                var self = this;
                self.articleStatuses = articleStatuses;
                function initialize() {
                    return articleService.getAll({ status: articleStatuses().published }).then(function (results) {
                        return self.articles = results;
                    });
                }
                self.loadMoreArticles = function () {
                };
                initialize();
                return self;
            }],
            link: function (scope, elem, attr) {
            }
        };
    }
})();
//# sourceMappingURL=homeListView.js.map
(function () {
    "use strict";
    var serviceId = "homeRouteResolver";
    angular.module("app").service(serviceId, ["$q", "$route", "articleService", "articleStatuses", "configurationService", "identityService", service]);
    function service($q, $route, articleService, articleStatuses, configurationService, identityService) {
        var self = this;
        self.resolveRoute = function resolveRoute() {
            return configurationService.get().then(function () {
                return $q.all([
                    articleService.getAll({ status: articleStatuses().published }),
                    identityService.getCurrentUser()
                ]).then(function (results) {
                    console.log("");
                });
            });
        };
        return self;
    }
    ;
})();
//# sourceMappingURL=homeRouteResolver.js.map
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
//# sourceMappingURL=liveTile.js.map
//# sourceMappingURL=module.js.map
//# sourceMappingURL=module.js.map
//# sourceMappingURL=notificationService.js.map
//# sourceMappingURL=module.js.map
//# sourceMappingURL=feedbackService.js.map
(function () {
    "use strict";
    var app = angular.module("search", ["configuration", "common", "core"]);
})();
//# sourceMappingURL=module.js.map
(function () {
    "use strict";
    var componentId = "search";
    angular.module("search").directive(componentId, ["$rootScope", "searchService", component]);
    function component($rootScope, searchService) {
        return {
            templateUrl: "/app/search/components/search/search.html",
            replace: true,
            restrict: "EA",
            scope: {},
            link: function (scope, elem, attr) {
                var timeoutId = null;
                scope.$watch(function (scope) {
                    return scope.term;
                }, function (newValue) {
                    try {
                        clearTimeout(timeoutId);
                    }
                    catch (error) {
                    }
                    timeoutId = setTimeout(function () {
                        return scope.search();
                    }, 300);
                });
                scope.term = "";
                scope.results = [];
                scope.search = function search() {
                    return searchService.simpleSearch({ term: scope.term }).then(function (results) {
                        scope.results = results.data;
                    });
                };
                $rootScope.$on("$routeChangeStart", function () {
                    scope.results = [];
                    scope.term = "";
                });
            }
        };
    }
})();
//# sourceMappingURL=search.js.map
(function () {
    "use strict";
    var serviceId = "searchService";
    angular.module("search").service(serviceId, ["$http", service]);
    function service($http) {
        var self = this;
        self.simpleSearch = function simpleSearch(params) {
            return $http({ method: "GET", url: "api/search/simple", params: params }).then(function (results) {
                return results.data;
            });
        };
        return self;
    }
})();
//# sourceMappingURL=searchService.js.map
(function () {
    "use strict";
    var app = angular.module("session", ["configuration", "common", "core"]);
})();
//# sourceMappingURL=module.js.map
(function () {
    "use strict";
    var serviceId = "session";
    angular.module("session").service(serviceId, ["$location", "$http", "$q", "configuration", "configurationService", "currentUser", "token", service]);
    function service($location, $http, $q, configuration, configurationService, currentUser, token) {
        var self = this;
        self.isLoggedIn = function isLoggedIn() {
            return self.getCurrentUser() != null && self.getCurrentUser() != "";
        };
        self.isUserInRole = function isUserInRole(roleName) {
            if (self.isLoggedIn()) {
                var user = self.getCurrentUser();
                for (var i = 0; i < user.roles.length; i++) {
                    if (roleName == user.roles[i].name) {
                        return true;
                    }
                }
                ;
            }
            return false;
        };
        self.getCurrentUser = function getCurrentUser() {
            return currentUser.get();
        };
        self.signOut = function () {
            $http({ method: "GET", url: "api/identity/signout" }).then(function () {
            });
            token.set({ data: null });
            currentUser.set({ data: null });
            $location.path("/");
        };
        self.setConfigurationAsync = function setConfigurationAsync() {
            var _configuration = configuration.get();
            if (_configuration) {
                return $q.when(_configuration);
            }
            return configurationService.get().then(function (results) {
                configuration.set({ data: results });
                return configuration.get();
            });
        };
        self.getConfiguration = function getConfiguration() {
            return configuration.get();
        };
        return self;
    }
    ;
})();
//# sourceMappingURL=session.js.map
(function () {
    "use strict";
    var serviceId = "configuration";
    angular.module("session").service(serviceId, ["$rootScope", "storage", service]);
    function service($rootScope, storage) {
        var self = this;
        var data = null;
        var name = "configuration";
        self.get = function get() {
            if (data) {
                return data;
            }
            ;
            try {
                data = storage.getByName({ name: name }).value;
            }
            catch (error) {
            }
            return data;
        };
        self.set = function set(params) {
            data = params.data;
            storage.put({ name: name, value: params.data });
        };
        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {
            if (newUrl.originalPath == "/signin") {
                data = null;
                self.set({ data: null });
            }
        });
        return self;
    }
    ;
})();
//# sourceMappingURL=configuration.js.map
(function () {
    "use strict";
    var serviceId = "currentUser";
    angular.module("session").service(serviceId, ["$rootScope", "storage", service]);
    function service($rootScope, storage) {
        var self = this;
        var data = null;
        var name = "currentUser";
        self.get = function get() {
            if (data) {
                return data;
            }
            ;
            try {
                data = storage.getByName({ name: name }).value;
            }
            catch (error) {
            }
            return data;
        };
        self.set = function set(params) {
            data = params.data;
            storage.put({ name: name, value: params.data });
        };
        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {
            if (newUrl.originalPath == "/signin") {
                data = null;
                self.set({ data: null });
            }
        });
        return self;
    }
    ;
})();
//# sourceMappingURL=currentUser.js.map
(function () {
    "use strict";
    var serviceId = "token";
    angular.module("session").service(serviceId, ["$rootScope", "storage", service]);
    function service($rootScope, storage) {
        var self = this;
        var data = null;
        var name = "token";
        self.get = function get() {
            if (data) {
                return data;
            }
            ;
            try {
                data = storage.getByName({ name: name }).value;
            }
            catch (error) {
            }
            return data;
        };
        self.set = function set(params) {
            data = params.data;
            storage.put({ name: name, value: params.data });
        };
        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {
            if (newUrl.originalPath == "/signin") {
                data = null;
                self.set({ data: null });
            }
        });
        return self;
    }
    ;
})();
//# sourceMappingURL=token.js.map
(function () {
    "use strict";
    var app = angular.module("trainingPlan", ["configuration", "common", "core", "session", "ngRoute"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/trainingPlan/:slug", {
            templateUrl: "/app/trainingPlan/views/default.html",
            resolve: ["trainingPlanRouteResolver", function (trainingPlanRouteResolver) {
                return trainingPlanRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        });
    }]);
})();
//# sourceMappingURL=module.js.map
(function () {
    "use strict";
    var serviceId = "trainingPlanRouteResolver";
    angular.module("trainingPlan").service(serviceId, ["$location", "$q", "$route", "trainingPlanService", "configurationService", "identityService", service]);
    function service($location, $q, $route, trainingPlanService, configurationService, identityService) {
        var self = this;
        self.resolveRoute = function resolveRoute() {
            return configurationService.get().then(function () {
                return identityService.getCurrentUser().then(function () {
                    if ($route.current.params.id) {
                        return trainingPlanService.getById({ id: $route.current.params.id }).then(function () {
                        });
                    }
                    else if ($route.current.params.slug) {
                        return trainingPlanService.getBySlug({ slug: $route.current.params.slug }).then(function () {
                        });
                    }
                    else {
                        return trainingPlanService.getAll().then(function () {
                        });
                    }
                });
            });
        };
        return self;
    }
    ;
})();
//# sourceMappingURL=trainingPlanRouteResolver.js.map
(function () {
    "use strict";
    var dataServiceId = "trainingPlanService";
    angular.module("blog").service(dataServiceId, ["$http", "$q", "$rootScope", "trainingPlanStatuses", dataService]);
    function dataService($http, $q, $rootScope, trainingPlanStatuses) {
        var self = this;
        var baseUri = "api/trainingPlan/";
        self.cache = {
            getAll: null,
            getById: null,
            getBySlug: null
        };
        $rootScope.$on("$locationChangeStart", function () {
            self.clearCache();
        });
        self.clearCache = function clearCache() {
            self.cache = {
                getAll: null,
                getById: null,
                getBySlug: null
            };
        };
        self.getAll = function getAll(params) {
            if (self.cache.getAll) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getAll);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getAll", params: params }).then(function (results) {
                self.cache.getAll = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.getById = function getById(params) {
            if (self.cache.getById && self.cache.getById.id == params.id) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getById);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getbyid?id=" + params.id }).then(function (results) {
                self.cache.getById = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.getBySlug = function getBySlug(params) {
            if (self.cache.getBySlug && self.cache.getBySlug.slug == params.slug) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getBySlug);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getbyslug?slug=" + params.slug }).then(function (results) {
                self.cache.getBySlug = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.remove = function remove(params) {
            return $http({ method: "DELETE", url: baseUri + "delete?id=" + params.id }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        self.add = function add(params) {
            return $http({ method: "POST", url: baseUri + "add", data: JSON.stringify(params.model) }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        self.publish = function publish(params) {
            params.model.pubDate = Date.now;
            params.model.status = trainingPlanStatuses().published;
            return self.update({ model: params.model });
        };
        self.approve = function approve(params) {
            params.model.status = trainingPlanStatuses().approved;
            return self.update({ model: params.model });
        };
        self.update = function update(params) {
            return $http({ method: "PUT", url: baseUri + "update", data: JSON.stringify(params.model) }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        return self;
    }
})();
//# sourceMappingURL=trainingPlanService.js.map
(function () {
    "use strict";
    var app = angular.module("user", ["configuration", "common", "core", "session"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/signin", {
            templateUrl: "/app/user/views/signin.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        }).when("/admin/user/create", {
            templateUrl: "/app/user/views/edit.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        }).when("/admin/user/edit/:id", {
            templateUrl: "/app/user/views/edit.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute({ route: "/admin/user/edit/:id" });
            }],
            authorizationRequired: true
        }).when("/admin/users", {
            templateUrl: "/app/user/views/list.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute({ route: "/admin/users" });
            }],
            authorizationRequired: true,
            adminRoute: true
        }).when("/register", {
            templateUrl: "/app/user/views/register.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        });
    }]);
})();
//# sourceMappingURL=module.js.map
(function () {
    "use strict";
    var componentId = "registrationForm";
    angular.module("user").directive(componentId, ["$location", "identityService", component]);
    function component($location, identityService) {
        return {
            templateUrl: "/app/user/components/registrationForm/registrationForm.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {
                scope.submit = function () {
                    identityService.register({ model: scope.model }).then(function () {
                        $location.path("/signin");
                    });
                };
            }
        };
    }
})();
//# sourceMappingURL=registrationForm.js.map
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
                    username: "Quinntyne",
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
//# sourceMappingURL=signInForm.js.map
(function () {
    "use strict";
    var componentId = "userEditor";
    angular.module("user").directive(componentId, [component]);
    function component() {
        return {
            templateUrl: "/app/user/components/userEditor/userEditor.html",
            restrict: "E",
            replace: true,
            controllerAs: "viewModel",
            controller: ["$location", "$routeParams", "$scope", "userService", function ($location, $routeParams, $scope, userService) {
                var self = this;
                self.entity = {};
                self.save = function save() {
                    if (self.entity.id) {
                        return userService.update({ model: self.entity }).then(function (results) {
                            $location.path("/admin/users");
                        });
                    }
                    else {
                        return userService.add({ model: self.entity }).then(function (results) {
                            $location.path("/admin/users");
                        });
                    }
                };
                function initialize() {
                    return userService.getById({ id: $routeParams.id }).then(function (results) {
                        if (results) {
                            return self.entity = results;
                        }
                    });
                }
                ;
                initialize();
                return self;
            }],
            link: function (scope, elem, attr) {
            }
        };
    }
})();
//# sourceMappingURL=userEditor.js.map
(function () {
    "use strict";
    var componentId = "userListView";
    angular.module("user").directive(componentId, [component]);
    function component() {
        return {
            templateUrl: "/app/user/components/userListView/userListView.html",
            restrict: "E",
            replace: true,
            controllerAs: "viewModel",
            controller: ["userService", function (userService) {
                var self = this;
                self.remove = function (params) {
                    return userService.remove({ id: params.id }).then(function () {
                        for (var i = 0; i < self.entities.length; i++) {
                            if (self.entities[i].id == params.id) {
                                self.entities.splice(i, 1);
                            }
                            ;
                        }
                        ;
                    }).catch(function (error) {
                    });
                };
                function initialize() {
                    return userService.getAll().then(function (results) {
                        return self.entities = results;
                    });
                }
                ;
                initialize();
                return self;
            }],
            link: function (scope, elem, attr) {
            }
        };
    }
})();
//# sourceMappingURL=userListView.js.map
(function () {
    "use strict";
    var serviceId = "identityService";
    angular.module("user").service(serviceId, ["$http", "currentUser", service]);
    function service($http, currentUser) {
        var self = this;
        self.signIn = function signIn(params) {
            return $http({ method: "POST", url: "api/identity/signin", data: JSON.stringify(params.model) }).then(function (results) {
                return results.data.token;
            }).catch(function (error) {
            });
        };
        self.register = function register(params) {
            return $http({ method: "POST", url: "api/identity/register", data: JSON.stringify(params.model) }).then(function (results) {
                return results.data.token;
            }).catch(function (error) {
            });
        };
        self.getCurrentUser = function getCurrentUser() {
            return $http({ method: "GET", url: "api/user/getCurrentUser" }).then(function (results) {
                currentUser.set({ data: results.data });
                return currentUser.get();
            }).catch(function (error) {
            });
        };
        return self;
    }
})();
//# sourceMappingURL=identityService.js.map
(function () {
    "use strict";
    var serviceId = "userRouteResolver";
    angular.module("user").service(serviceId, ["$q", "$route", "configurationService", "userService", service]);
    function service($q, $route, configurationService, userService) {
        var self = this;
        self.resolveRoute = function resolveRoute(params) {
            return configurationService.get().then(function () {
                if (params) {
                    switch (params.route) {
                        case "/admin/users":
                            return userService.getAll().then(function () {
                            });
                            break;
                        case "/admin/user/edit/:id":
                            return userService.getById({ id: $route.params.id }).then(function () {
                            });
                            break;
                    }
                }
            });
        };
        return self;
    }
    ;
})();
//# sourceMappingURL=userRouteResolver.js.map
(function () {
    "use strict";
    var dataServiceId = "userService";
    angular.module("user").service(dataServiceId, ["$http", "$q", "$rootScope", dataService]);
    function dataService($http, $q, $rootScope) {
        var self = this;
        var baseUri = "api/user/";
        self.cache = {
            getAll: null,
            getById: null
        };
        $rootScope.$on("$locationChangeStart", function () {
            self.clearCache();
        });
        self.clearCache = function clearCache() {
            self.cache = {
                getAll: null,
                getById: null
            };
        };
        self.getAll = function getAll(params) {
            if (self.cache.getAll) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getAll);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getAll", params: params }).then(function (results) {
                self.cache.getAll = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.getById = function getById(params) {
            if (self.cache.getById && self.cache.getById.id == params.id) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getById);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getbyid?id=" + params.id }).then(function (results) {
                self.cache.getById = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.remove = function remove(params) {
            return $http({ method: "DELETE", url: baseUri + "delete?id=" + params.id }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        self.add = function add(params) {
            return $http({ method: "POST", url: baseUri + "add", data: JSON.stringify(params.model) }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        self.update = function update(params) {
            return $http({ method: "PUT", url: baseUri + "update", data: JSON.stringify(params.model) }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        return self;
    }
})();
//# sourceMappingURL=userService.js.map
(function () {
    "use strict";
    var app = angular.module("youTube", ["configuration", "common", "core", "session", "ngRoute"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/videoplayer/:videoid", {
            templateUrl: "/app/youTube/views/default.html",
            resolve: ["youTubeRouteResolver", function (youTubeRouteResolver) {
                return youTubeRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        });
    }]);
})();
//# sourceMappingURL=module.js.map
(function () {
    'use strict';

    var directiveId = "youTubePlayer";

    angular.module("youTube").directive(directiveId, ["$window", "youTubeService", control]);

    function control($window, youTubeService) {
        return {
            restrict: "E",
            template: "<div></div>",
            scope: {},
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
                } else {
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

(function () {
    "use strict";
    var componentId = "videoEditor";
    angular.module("youTube").directive(componentId, [component]);
    function component() {
        return {
            templateUrl: "/app/youTube/components/videoEditor/videoEditor.html",
            restrict: "E",
            replace: true,
            controllerAs: "viewModel",
            controller: ["$location", "$routeParams", "$scope", "videoStatuses", "youTubeService", function ($location, $routeParams, $scope, videoStatuses, youTubeService) {
                var timeoutId = null;
                $scope.$watch(function ($scope) {
                    return self.entity.title;
                }, function (newValue) {
                    if (!self.entity.id && newValue != null) {
                        try {
                            clearTimeout(timeoutId);
                        }
                        catch (error) {
                        }
                        timeoutId = setTimeout(function () {
                            return youTubeService.add({ model: self.entity }).then(function (results) {
                                $location.path("/admin/video/edit/" + results.data.id);
                            });
                        }, 1000);
                    }
                    self.entity.slug = self.entity.title.replace(" ", "-").toLowerCase();
                });
                var self = this;
                self.entity = {};
                self.remove = function () {
                    return youTubeService.remove({ id: self.entity.id }).then(function () {
                        $location.path("/admin/videos");
                    }).catch(function (error) {
                    });
                };
                self.save = function save() {
                    if (self.entity.id) {
                        return youTubeService.update({ model: self.entity }).then(function (results) {
                            $location.path("/admin/videos");
                        });
                    }
                    else {
                        self.entity.pubDate = new Date().toISOString();
                        return youTubeService.add({ model: self.entity }).then(function (results) {
                            $location.path("/admin/videos");
                        });
                    }
                };
                self.approve = function approve() {
                    self.entity.status = videoStatuses().approved;
                    self.save();
                };
                self.publish = function publish() {
                    self.entity.status = videoStatuses().published;
                    self.save();
                };
                function initialize() {
                    return youTubeService.getById({ id: $routeParams.id }).then(function (results) {
                        if (results) {
                            return self.entity = results;
                        }
                    });
                }
                ;
                initialize();
                return self;
            }],
            link: function (scope, elem, attr) {
            }
        };
    }
})();
//# sourceMappingURL=videoEditor.js.map
(function () {
    "use strict";
    var serviceId = "youTubeRouteResolver";
    angular.module("youTube").service(serviceId, ["$location", "$q", "$route", "youTubeService", "configurationService", "identityService", service]);
    function service($location, $q, $route, youTubeService, configurationService, identityService) {
        var self = this;
        self.resolveRoute = function resolveRoute() {
            return configurationService.get().then(function () {
                return identityService.getCurrentUser().then(function () {
                });
            });
        };
        return self;
    }
    ;
})();
//# sourceMappingURL=youTubeRouteResolver.js.map
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
                    controls: 0,
                }
            };
        };
        return self;
    }
    ;
})();
//# sourceMappingURL=youTubeService.js.map
