'use strict';

/**
 * @ngdoc overview
 * @name slachtemarathonApp
 * @description
 * # slachtemarathonApp
 *
 * Main module of the application.
 */
angular
  .module('slachtemarathonApp', [
    'app.controllers',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    //'ngResource',
    'ngSanitize',
    //'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'gettext'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('form', {
            name: 'form',
            url: '/form',
            templateUrl: 'views/form.html',
            controller: 'formController'
        })
    
    .state('form.welkom', {
            url: '/welkom',
            naam: 'welkom',
            templateUrl: 'views/form-welkom.html'
            
        })     
    
    .state('form.inloggen', {
            url: '/inloggen',
            naam: 'inloggen',
            templateUrl: 'views/form-inloggen.html'
            
     }) 
        
    .state('form.persoonlijke-gegevens', {
            url: '/persoonlijke-gegevens',
            templateUrl: 'views/form-persoonlijke-gegevens.html'
        })    
    
    .state('form.starttijd', {
            url: '/starttijd',
            templateUrl: 'views/form-starttijd.html'
        })    
       
    .state('form.vervoer', {
            url: '/vervoer',
            templateUrl: 'views/form-vervoer.html'
        }) 
        
    .state('form.slapen', {
            url: '/slapen',
            templateUrl: 'views/form-slapen.html'
        })          
	
	.state('form.shirts', {
            url: '/shirts',
            templateUrl: 'views/form-shirts.html'
        })
    .state('form.overzicht', {
            url: '/overzicht',
            templateUrl: 'views/form-overzicht.html'
        })
	 
	.state('form.betalen', {
            url: '/betalen',
            templateUrl: 'views/form-betalen.html'
        });
    
 $urlRouterProvider.otherwise('/form/welkom');
  
  }).run(function(gettextCatalog, $http){
   	
   	
	 //$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';  	
  	
  	
   	gettextCatalog.debug = true;
    //gettextCatalog.debugPrefix = ":-(";
    //window.localStorage.taal="nl_NL";
   	gettextCatalog.baseLanguage = "fy_NL";
    //console.log(gettextCatalog);
	if(typeof window.localStorage.taal==="undefined"){
		gettextCatalog.setCurrentLanguage('fy_NL');
		window.localStorage.taal = 'fy_NL';
	}else{		
		//window.localStorage["taal"] = (window.localStorage["taal"] == "en") ? "fy_NL" : window.localStorage["taal"]; 
		gettextCatalog.setCurrentLanguage(window.localStorage.taal);
	}
	
	 
  })
  
  