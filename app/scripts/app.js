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
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  if(document.location.href.indexOf("tickets")!= -1){
  
	  $stateProvider
	    .state('form', {
	            name: 'form',
	            url: '/form',
	            templateUrl: 'views/form.html',
	            controller: 'formController'
	        })    
	    
	    .state('form.inloggen', {
	            url: '/inloggen',
	            naam: 'inloggen',
	            templateUrl: 'views/form-inloggen.html'
	            
	     }) 
	    
	     .state('form.aantalkaarten', {
	            url: '/aantalkaarten',
	            templateUrl: 'views/form-aantalkaarten.html'
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
	        })
	        
	    .state('form.betalensimulatie', {
	            url: '/betalensimulatie',
	            templateUrl: 'views/form-betalen-simulatie.html'
	            //templateUrl: 'betalen.php'
	        })
	    
	    .state('bedankt', {
	            url: '/bedankt',
	            templateUrl: 'views/bedankt.html',
	            controller: 'formController'
	        });
	    
	 $urlRouterProvider.otherwise('/form/inloggen');
	 

  }
  	$httpProvider.defaults.useXDomain = true;
  	delete $httpProvider.defaults.headers.common['X-Requested-With'];

  	
  }).run(function(gettextCatalog, $http){
   	
   	gettextCatalog.debug 		= true;
    gettextCatalog.baseLanguage = "fy_NL";
    
    if(typeof window.localStorage.taal==="undefined"){
		gettextCatalog.setCurrentLanguage('fy_NL');
		window.localStorage.taal = 'fy_NL';
	}else{		
		gettextCatalog.setCurrentLanguage(window.localStorage.taal);
	}
	
	 
  })
  
  