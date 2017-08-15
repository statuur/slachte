"use strict"; 

angular.module('app.controllers', [])


.controller('welkomController', function($scope, $http, gettextCatalog) {
	$http({
		method: 'GET',
		url: 'http://slachtemarathon.statuur.nl/api/dorpen/get_dorpen'
	}).then(function successCallback(response) {
		delete response.data.status;
		$scope.inschrijving_status = response.data.inschrijving_status;
		delete response.data.inschrijving_status
		$scope.dorpen = response.data;
		
		});
		
	$scope.setLanguage = function(lang) {
        gettextCatalog.setCurrentLanguage(lang);
		window.localStorage.taal = lang;
        
        document.location.href = "tickets.html";        
    };	
    
})

.controller('formController', function($scope, $http, gettextCatalog, $state, gettext, $transitions, $cookies, $location, $anchorScroll) {
	// we will store all of our form data in this object
   
    //$cookies.putObject('formData', $scope.formData); 
    $scope.svs							= ["starttijd", "vervoer", "slapen"];
    $scope.errors 						= 0;
	$scope.errormessage 				= "s";
	    
    $scope.deelname						= ["1 keer", "2 keer","3 keer","4 keer","5 keer", "nog nooit"];
    $scope.formData 					= (typeof $cookies.getObject('formData')==="undefined")? {} : $cookies.getObject('formData', $scope.formData); 
    $scope.direction 					= "forwards";
    $scope.formData.kaarten 			= (typeof $scope.formData.kaarten==="unefined") ? 2 : $scope.formData.kaarten;
    $scope.formData.shirts 				= {};
    $scope.formData.reg 				= (typeof $scope.formData.reg==="undefined")? {} : $scope.formData.reg;
    $scope.formData.reg.geboortedatum 	= (typeof $scope.formData.reg==="undefined") ? "" : new Date($scope.formData.reg.geboortedatum);
    //$scope.formData.reg.slaapplek		= (typeof $scope.formData.reg!=="undefined" && $scope.formData.reg.soortovernachting=="Festipi") ? "Ik regel het zelf" : "";
    $scope.formData.reg.betaald 		= (typeof $scope.formData.reg==="undefined") ? "" : 0;
    $scope.formData.user 				= "test";
    $scope.formData.password			= "testpersoon1234";
    
    /* Dit alleen als deze nog niet bestaan, anders wordt de data gewist */
    $scope.formData.introducees 		= (typeof $scope.formData.introducees==="undefined") ? [] : $scope.formData.introducees;
    $scope.formData.introducees[0] 		= (typeof $scope.formData.introducees[0]==="undefined") ? {"email":"maaike@statuur.nl", "pwijzigen":"edit"} : $scope.formData.introducees[0];
    $scope.formData.introducees[1] 		= (typeof $scope.formData.introducees[1]==="undefined") ? {"email":"laarif@gmail.com", "pwijzigen":"edit"} : $scope.formData.introducees[1];
    $scope.formData.introducees[2] 		= (typeof $scope.formData.introducees[2]==="undefined") ? {"email":"bastiaaaan@yahoo.com", "pwijzigen":"edit"} : $scope.formData.introducees[2];
    $scope.ticketprice					= 82.50;
	$scope.tshirtprice					= 12.50;
	$scope.overnachting					= 19.50;
    $scope.genders 						= ["m","v"];
    $scope.sizes 						= ["s","m","l","xl", "xxl"];
    $scope.maxkaarten 					= [1,2,3,4]; 
	$scope.pwijzigen					= 0;	
    $scope.stap 						= 1;
    $scope.prevstap 					= 0;
    
    //to update the menu at the right timing
    $transitions.onSuccess( {}, function(){		
		setTimeout(function(){
			 $scope.menu();
		}, 600);
		
	
	});
    /* TODO : BUGGY*/
    $scope.setError = function(message){	    
	    $scope.errors 			= 1;		
		$scope.errormessage		= message;
		//console.log(message)
		//console.log($scope.errors);
		
		setTimeout(function(){
			 console.log($scope);
			 $scope.errors 			= 0;
			 $scope.errormessage	= "";
			 console.log($scope.errors)
		}, 5000);
		/*
			<div ng-show="errors" ng-controller="formController" style="max-width:1280px;top:0px;left:0px;height:80%;padding:10% 15%;position:absolute;background:rgba(255,255,255,0.75);z-index:10;">
  	<div ng-show="errors" class="melding alert alert-warning" style="background:#E00915;color:#fff!important;position: relative;left:0%;top:0%;transform: translate(0%,100%)">{{errormessage}}</div>
</div>
		*/	
    }
    
    	
	    
    
        
    $scope.toggleTemplate = function(template, view, index){	    
	    //$scope.formData.introducees 			= [{"pwijzigen":"edit"},{"pwijzigen":"edit"},{"pwijzigen":"edit"}];
		//console.log($scope.states[index]);

	    //hier moet de $index factor nog bij!
		//$scope.formData.introducees[index].states[template] = view;	    
	    $scope.states[index][template] = view; //<!-- deze moet multidimensionaal
	    $cookies.putObject('formData', $scope.formData); 	   	  
    }
    
    $scope.showPrice = function(){
	   	//TODO ITERATE TROUGHT THE OBJECT AND CHECK IF THE VALUES ARE NOT NULL
	    
	   	
	   	$scope.formData.extrapersonen	= parseInt($scope.formData.reg.extrapersonen)
	   	$scope.totaaltickets 	= $scope.formData.kaarten * $scope.ticketprice	    
	    $scope.aantaltshirts	= Object.keys($scope.formData.shirts).length;
	    $scope.totaaltshirts	= (Object.keys($scope.formData.shirts).length > 0) ? Object.keys($scope.formData.shirts).length * $scope.tshirtprice : 0;
	    
	    $scope.extrapersonen	= ($scope.formData.extrapersonen > 0) ? $scope.formData.extrapersonen + 1 : 0;
	    $scope.totaalovernacht	= $scope.overnachting * $scope.extrapersonen;
		
	    $scope.totaalbedrag 	= ($scope.totaalovernacht + $scope.totaaltickets + $scope.totaaltshirts).toFixed(2);;
	    
	    
	    angular.element(document.getElementById('totaalbedrag')).val($scope.totaalbedrag)
	    angular.element(document.getElementById('showtotaalbedrag')).html('&euro; '+$scope.totaalbedrag)
	    
	    
	    
	    //console.log(parseInt($scope.formData.reg.extrapersonen))    	           
    }
       
    /* OVERZICHT FUNCTIES */    
    /** functie voor togglen introducee edit <> view **/
    $scope.states						= [{"gegevens":"edit", "starttijd":"view", "vervoer":"view", "slapen":"view"},{"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view"},{"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view"}];
    
    $scope.ftemplates 				= { "gegevens"	: {"view" : "views/blokken/freon-gegevens-view.html", "edit":"views/blokken/freon-gegevens-edit.html"},
	    								"starttijd"	: {"view" : "views/blokken/freon-starttijd-view.html", "edit":"views/blokken/freon-starttijd-edit.html"},
    									"vervoer"	: {"view" : "views/blokken/freon-vervoer-view.html", "edit":"views/blokken/freon-vervoer-edit.html"},
    									"slapen"	: {"view" : "views/blokken/freon-slapen-view.html", "edit":"views/blokken/freon-slapen-edit.html"},
    									};
    									
    $scope.pstates					= {"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view"};									
    $scope.templates 				= { "gegevens"	: {"view" : "views/blokken/introduce-gegevens-view.html", "edit":"views/blokken/introduce-gegevens-edit.html"},
	    								"starttijd"	: {"view" : "views/blokken/introduce-starttijd-view.html", "edit":"views/blokken/introduce-starttijd-edit.html"},
    									"vervoer"	: {"view" : "views/blokken/introduce-vervoer-view.html", "edit":"views/blokken/introduce-vervoer-edit.html"},
    									"slapen"	: {"view" : "views/blokken/introduce-slapen-view.html", "edit":"views/blokken/introduce-slapen-edit.html"},
    									};
    //$scope.states					= {"gegevens":"edit", "starttijd":"view", "vervoer":"view", "slapen":"view"};
    
    $scope.togglepTemplate = function(template, view){	    
		//als view edit is dan de andere views op view...
		$scope.pstates[template] = view;
	    $cookies.putObject('formData', $scope.formData); 	   	
	    
    }
    
	/* KOPIEER PERSOONSGEGEVENS NAAR DE INTRODUCEES */
    $scope.setIntroduceData			= function(index){
	    var copyfields = ["starttijd","vervoer", "slapen", "dorp", "soortovernachting", "slaapplek", "bagage"];
		angular.forEach($scope.formData.reg, function(value, key) {
		  if(copyfields.indexOf(key) > -1 ){
		  $scope.formData.introducees[index][key] = value;
		  }		  
		});
    }
    
    $scope.logingIn 	= false;
   	$scope.loginError	= false;
   	
   	$scope.inloggen = function(){
   		$cookies.putObject('formData', $scope.formData); 
	   	$scope.logingIn 	= true;
	   	$scope.loginError 	= false;
	   	$http({
		    method: 'POST',
		    //url: 'http://slachtemarathon.statuur.nl/login',
		    url :'http://slachtemarathon.statuur.nl/api/registreer/login',
		    data: $.param($scope.formData),//"message=aap",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	if(response.data.status==="ok"){
	    		$scope.parseData(response.data.data);
				$scope.setStap(1,'forwards');
	    	}else{
		    	$scope.loginError = true;
	    	}
	    	$scope.logingIn = false;
	  	}, function errorCallback(response) {
	    	console.error(response);
	  	});
	
	} 	
		
	$scope.parseData = function(data){
		//console.log(data);
		$scope.formData.reg.userID 			= data.ID;		
		$scope.formData.reg.email 			= data.user_email;
		$scope.formData.reg.email2 			= data.user_email;		
		$scope.formData.reg.voornaam 		= data.first_name;
		$scope.formData.reg.achternaam 		= data.last_name;
		$scope.formData.reg.tussenvoegsels	= data.tussenvoegsels;
		$scope.formData.reg.straat	 		= data.Straat;
		$scope.formData.reg.huisnummer 		= data.Huisnummer;
		$scope.formData.reg.postcode 		= data.Postcode;
		$scope.formData.reg.woonplaats 		= data.Plaats;
		$scope.formData.reg.telefoon 		= data.Telefoon;
		$scope.formData.reg.geboortedatum 	= new Date(data.Geb_datum);
		$scope.formData.reg.geslacht 		= data.Geslacht;
		$cookies.putObject('formData', $scope.formData); 
	}
	
	 $scope.Bedankt = function() {
   	 
   	 //get user_id and update it to betalen ajax request to deeelnemer betaald
   	 //$scope.formData.reg.betaald
   	 
   	 $http({
		    method: 'POST',
		    url :'http://slachtemarathon.statuur.nl/api/registreer/betaald',
		    data: $.param({"userID": $scope.formData.reg.userID, "betaald":"1"}),//"message=aap",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
			//console.log(response);
			$state.go('bedankt');
		}, function errorCallback(response) {
	    	console.error(response);//hier een foutmelding
	  	});
   	 
   	 
   	 }
	// function to process the form
    $scope.processForm = function() {
       //console.log($.param($scope.formData));
       $cookies.putObject('formData', $scope.formData); 	   	
       $http({
		    method: 'POST',
		    url :'http://slachtemarathon.statuur.nl/api/registreer/deelnemer',
		    data: $.param($scope.formData),//"message=aap",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	if(response.data.status==="ok"){
				$state.go('form.betalensimulatie');
	    	}else{
		    	//hier een foutmelding
	    	}
	  	}, function errorCallback(response) {
	    	console.error(response);//hier een foutmelding
	  	});
    };
    
    $scope.kiesdorp = function(dorp){
	    $scope.formData.reg.dorp = dorp;
	    //soort-overnachting
	    $location.hash('soort-overnachting');
	    // call $anchorScroll()
		$anchorScroll();
    };
    
    $scope.setStap	= function(stap, direction){
		$scope.stap		= stap;		
		$scope.direction = direction;//($scope.prevstap > $scope.stap) ? "backwards" : "forwards";		
		console.log($scope.stap, $scope.direction);
		setTimeout(function(){
			$state.go($scope.stappen[stap].name);			
		}, 50)
	    
	    $cookies.putObject('formData', $scope.formData); 	   	       
		$scope.prevstap = stap;
		
	};
	
    $scope.menu		= function() {
         var formsteps = $state.get();    
		 //console.log(formsteps);
		 var stappen = [];
		 //var stappeno = {};
		 var passed	 = 1;
		 var i = 0;
		 angular.forEach(formsteps, function(stap, key) {
		 	 if (stap.name.match(/(form.betalensimulatie)/i)) return false;
		 	 if (stap.name.match(/(form.)/i)) {
		 	 	 
		 	 	 var translated = gettextCatalog.getString(stap.name);
		 	 	 stap.title 	= translated;
		 	 	 stap.active	= $state.current.name===stap.name;
		 	 	 $scope.stap 	= (stap.active) ? i : $scope.stap;
		 	 	 passed			= ($state.current.name===stap.name) ? 0 : passed;
		 	 	 stap.passed	= passed;
		 	 	 //$scope.prevstap = (stap.active) ? i : $scope.prevstap;
		 	 	 stap.stap		= key;
		 	 	 this.push(stap);
		 	 	 i++;
		 	 }	 	 
		}, stappen);     
		$scope.stappen = stappen;            
		
    };	
    
    $scope.menu(); 
    
    
    
    //get dorpen info "?"+new Date().toString()
    $http({
		method: 'GET',
		url: 'http://slachtemarathon.statuur.nl/api/dorpen/get_dorpen'
	}).then(function successCallback(response) {
		delete response.data.status;
		$scope.inschrijving_status = response.data.inschrijving_status;
		delete response.data.inschrijving_status
		$scope.dorpen = response.data;
		
		}, function errorCallback(response) {
    	console.error("ERROR code:"+response);
     });
   
}).directive('matchValidator', [function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attr, ctrl) {
                var pwdWidget = elm.inheritedData('$formController')[attr.matchValidator];
				//console.log("?????");
                ctrl.$parsers.push(function(value) {
                    if (value === pwdWidget.$viewValue) {
                        ctrl.$setValidity('match', true);                            
                        return value;
                    }                        

                    if (value && pwdWidget.$viewValue) {
                        ctrl.$setValidity('match', false);
                    }

                });

                pwdWidget.$parsers.push(function(value) {
                    if (value && ctrl.$viewValue) {
                        ctrl.$setValidity('match', value === ctrl.$viewValue);
                    }
                    return value;
                });
            }
        };
    }]);
  