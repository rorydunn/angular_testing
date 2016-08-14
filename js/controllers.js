var app = angular.module("kwencher", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm/"
    })
    .when("/add-movie", {
        templateUrl : "form.html"
    })
    .when("/movies", {
        templateUrl : "list.html"
    });
});
app.controller("HttpGetController", function ($scope, $http) {

    //Gets list of Movies
    $http.get('http://movieapp-sitepointdemos.rhcloud.com/api/movies/').success(function(data) {
      $scope.movies = data;
    });

    //Submits A new movie
    $scope.SendData = function () {
       // use $.param jQuery function to serialize data from JSON
        var data = $.param({
            title: $scope.title,
            director: $scope.director,
            releaseYear: $scope.releaseYear,
            genre: $scope.genre
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('http://movieapp-sitepointdemos.rhcloud.com/api/movies/', data, config)
        .success(function (data, status, headers, config) {
            $scope.PostDataResponse = data;
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });
    };

});
app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {country: 'in'}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});

function MyCtrl($scope) {
    $scope.gPlace;
}
