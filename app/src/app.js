angular.module('jsChips', [
	'ui.router',
  'hljs',
  'javascript-chips-tpl'
])

.controller('jsChipsCtrl', ['$scope', function ($scope) {

}])

.config(function($stateProvider) {
  $stateProvider
    .state('index', {
      url: "/",
      views: {
        "sidebar": { templateUrl: "templates/sidebar.html" },
        "content": { templateUrl: "templates/content.html" }
      }
    })
    .state('this', {
      url: "/this",
      views: {
        "sidebar": { templateUrl: "templates/sidebar.html" },
        "content": { templateUrl: "templates/this/this.html" }
      }
    })
    .state('prototypes', {
      url: "/prototypes",
      views: {
        "sidebar": { templateUrl: "templates/sidebar.html" },
        "content": { templateUrl: "templates/content.html" }
      }
    });
})
;
