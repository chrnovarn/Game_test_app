angular.module('app', ['ngCookies']

.controller('cookController', ['$cookies', function($cookies) {
    // Retrieving a cookie
    var favoriteCookie = $cookies.get('myFavorite');
    // Setting a cookie
    $cookies.put('myFavorite', 'oatmeal');
}]));