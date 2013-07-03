app = angular.module('meteorapp', ["meteor"]);

app.config([ "$routeProvider", function( $routeProvider) {
    $routeProvider.when("/",
        {
            templateUrl: "partials/lists.html",
            controller: "MeteorCtrl"
        })
//        .otherwise({redirectTo: '/'});
    Meteor.subscribe('lists');
    Meteor.subscribe('todos');
}]);

app.directive('ngEnter', function() {
    return function(scope, elm, attrs) {
        elm.bind('keypress', function(e) {
            if (e.charCode === 13) scope.$apply(attrs.ngEnter);
        });
    };
});