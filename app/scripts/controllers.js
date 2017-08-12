"use strict"; 

angular.module('app.controllers', [])

.controller('formController', function($scope, $http, gettextCatalog, $state, gettext, $transitions, $cookies, $location, $anchorScroll) {
	// we will store all of our form data in this object
   
    //$cookies.putObject('formData', $scope.formData); 
    $scope.svs				= ["starttijd", "vervoer", "slapen"];
    
    $scope.deelname			= ["1 keer", "2 keer","3 keer","4 keer","5 keer", "nog nooit"];
    $scope.formData 		= (typeof $cookies.getObject('formData')==="undefined")? {} : $cookies.getObject('formData', $scope.formData); 
    $scope.direction 		= "forwards";
    $scope.formData.kaarten = (typeof $scope.formData.kaarten==="unefined") ? 2 : $scope.formData.kaarten;
    $scope.formData.shirts 	= {};
    $scope.formData.reg 	= (typeof $scope.formData.reg==="undefined")? {} : $scope.formData.reg;
    $scope.formData.reg.geboortedatum 	= (typeof $scope.formData.reg==="undefined") ? "" : new Date($scope.formData.reg.geboortedatum);
    
    $scope.formData.user 	= "test";
    $scope.formData.password= "testpersoon1234";
    
    /* Dit alleen als deze nog niet bestaan, anders wordt de data gewist */
    $scope.formData.introducees 	= (typeof $scope.formData.introducees==="undefined") ? [] : $scope.formData.introducees;
    $scope.formData.introducees[0] 	= (typeof $scope.formData.introducees[0]==="undefined") ? {"email":"maaike@statuur.nl", "pwijzigen":"edit"} : $scope.formData.introducees[0];
    $scope.formData.introducees[1] 	= (typeof $scope.formData.introducees[1]==="undefined") ? {"email":"laarif@gmail.com", "pwijzigen":"edit"} : $scope.formData.introducees[1];
    $scope.formData.introducees[2] 	= (typeof $scope.formData.introducees[2]==="undefined") ? {"email":"bastiaaaan@yahoo.com", "pwijzigen":"edit"} : $scope.formData.introducees[2];
    
    
    /** functie voor togglen intrducee edit <> view **/
    $scope.states					= [{"gegevens":"edit", "starttijd":"view", "vervoer":"view", "slapen":"view"},{"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view"},{"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view"}];
    $scope.ticketprice		= 82.50;
	$scope.tshirtprice		= 12.50;
	$scope.overnachting		= 19.50;
    $scope.genders 			= ["m","v"];
    $scope.sizes 			= ["s","m","l","xl", "xxl"];
    $scope.maxkaarten 		= [1,2,3,4]; 
	$scope.pwijzigen		= 0;	
    $scope.stap 			= 1;
    $scope.prevstap 		= 0;
    
    //to update the menu at the right timing
    $transitions.onSuccess( {}, function(){		
		setTimeout(function(){
			 $scope.menu();
		}, 600);
		
	
	});
        
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
		
		//console.log($scope.formData.introducees[index]);
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
				//$scope.direction = "forwards";
				//$scope.stap = 2;
				$scope.setStap(2,'forwards');
				//$state.go('form.persoonlijke-gegevens');
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
		$scope.formData.reg.straatnaam 		= data.Straat;
		$scope.formData.reg.huisnummer 		= data.Huisnummer;
		$scope.formData.reg.postcode 		= data.Postcode;
		$scope.formData.reg.woonplaats 		= data.Plaats;
		$scope.formData.reg.telefoon 		= data.Telefoon;
		$scope.formData.reg.geboortedatum 	= new Date(data.Geb_datum);
		$scope.formData.reg.geslacht 		= data.Geslacht;
		$cookies.putObject('formData', $scope.formData); 
	}
	
	
	// function to process the form
    $scope.processForm = function() {
       //console.log($.param($scope.formData));
       $cookies.putObject('formData', $scope.formData); 	   	
       $http({
		    method: 'POST',
		    //url: 'http://slachtemarathon.statuur.nl/login',
		    url :'http://slachtemarathon.statuur.nl/api/registreer/deelnemer',
		    data: $.param($scope.formData),//"message=aap",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	if(response.data.status==="ok"){
	    		
				$state.go('form.betalen');
	    	}else{
		    	//$scope.loginError = true;
	    	}
	    		//$scope.logingIn = false;
	  	}, function errorCallback(response) {
	    	console.error(response);
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
		//console.log(stappen[$scope.stap].title);
    };	
    
    $scope.menu(); 
    
    $scope.setLanguage = function(lang) {
        gettextCatalog.setCurrentLanguage(lang);
		window.localStorage.taal = lang;
        $scope.formData.taal = lang;
        $scope.direction = "forwards";    
        //$state.go('form.inloggen');
        $scope.setStap($scope.stap+1,'forwards');

        $scope.menu();
        
    };	
    //get dorpen info
    $http({
		method: 'GET',
		url: 'http://slachtemarathon.statuur.nl/api/dorpen/get_dorpen'
	}).then(function successCallback(response) {
		delete response.data.status;
		$scope.dorpen = response.data;
		
		}, function errorCallback(response) {
    	console.error("ERROR code:"+response.data);
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
  