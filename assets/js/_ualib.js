angular.module('ualib', [
    'ngRoute',
    'ngAnimate',
    'ualib.templates',
    'ualib.ui',
    'hours',
    'oneSearch',
    'manage',
    'ualib.databases',
    'musicSearch',
    'ualib.staffdir',
    'ualib.softwareList',
    'ualib.news'
])


    .config(['$routeProvider', function($routeProvider) {
        /**
         * Register Bento Box display route with ngRoute's $routeProvider
         */
        $routeProvider
            .when('/home', {
                templateUrl: '../assets/js/_ualib-home.tpl.html'
            })
            .otherwise({
                redirectTo: '/home'
            });

    }])



    .run(['$routeParams', '$location', '$rootScope', '$document', 'duScrollOffset', function($routeParams, $location, $rootScope, $document, duScrollOffset){
        $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
            $rootScope.appStyle = {};
            $rootScope.appClass = $location.path().split('/')[1];
            if ($rootScope.appClass === 'home') {
                $rootScope.appClass = 'front-page';
                var bgNum = (Math.floor(Math.random() * 1000) % 16) + 1;
                $rootScope.appStyle = {"background-image": "url('wp-content/themes/roots-ualib/assets/img/quad-sunset-lg_" + bgNum + ".jpg')"};
                //console.log('Background 1.');
            }
            $rootScope.appClass += ' webapp';
        });

    }]);
