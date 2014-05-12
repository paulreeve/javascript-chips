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
      url: "",
      views: {
        "sidebar": { templateUrl: "templates/sidebar.html" },
        "content": { templateUrl: "templates/home.html" },
        "footer": { templateUrl: "templates/footer.html" }
      }
    })
    .state('this', {
      url: "/this",
      views: {
        "sidebar": { templateUrl: "templates/sidebar.html" },
        "content": { templateUrl: "templates/this/this.html" },
        "footer": { templateUrl: "templates/footer.html" }
      }
    })
    .state('prototypes', {
      url: "/prototypes",
      views: {
        "sidebar": { templateUrl: "templates/sidebar.html" },
        "content": { templateUrl: "templates/content.html" },
        "footer": { templateUrl: "templates/footer.html" }
      }
    });
})
;
