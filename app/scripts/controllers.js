"use strict"; 

angular.module('app.controllers', [])

//DUBBEL
.controller('welkomController', function($scope, $http, gettext, gettextCatalog,$cookies) {
	
	$http({
		method: 'GET',
		url: 'https://www.slachtemarathon.nl/api/systeem/status/'
	}).then(function successCallback(response) {
		delete response.data.status;
		$scope.inschrijving_status = response.data.inschrijving_status;
		delete response.data.inschrijving_status
		$scope.dorpen = response.data;
	}, function error(response) {
        console.log(response)
    });
    
	//$cookies.remove('cookies');	
	$scope.cookieAgree 	= (typeof $cookies.getObject('cookies')==="undefined")? 0 : $cookies.get("cookies");
 	$scope.cookiea		= gettextCatalog.getString("Ga je akkoord met de Cookie instellingen?");
	
 	 $scope.alert	= function(mes){
		mes = gettext(mes);
		alert(mes);
	} 
 	
 	$scope.cookieAgreement = function(lang) {
		 var expireDate = new Date();
		 expireDate.setDate(expireDate.getDate() + 1);
		 $cookies.put("cookies", 1, {'expires': expireDate});
		 $scope.cookieAgree =1;	
	}
		
	$scope.setLanguage = function(lang) {
        gettextCatalog.setCurrentLanguage(lang);
		window.localStorage.taal = lang;
        
        document.location.href = "tickets.html";        
    };	
    
})

.controller('formController', function($scope, $http, gettextCatalog, $state, gettext, $transitions, $cookies, $location, $anchorScroll) {
	//$cookies.remove('formData');
	$scope.buttondisabled				= false;     
	$scope.required						= gettextCatalog.getString("Nog niet alle vereiste velden zijn ingevuld. Kijk de gegevens goed na.");
	
	$scope.svs							= ["starttijd", "vervoer", "slapen"];
    $scope.opstapplekken				= [gettext("Sneek"), gettext("Leeuwarden"), gettext("Heerenveen"), gettext("Franeker/Harlingen")];
        
    $scope.deelname						= ["1 keer", "2 keer","3 keer","4 keer","5 keer", "nog nooit"];
    $scope.formData 					= (typeof $cookies.getObject('formData')==="undefined")? {} : $cookies.getObject('formData', $scope.formData); 
    $scope.direction 					= "forwards";
    $scope.formData.kaarten 			= (typeof $scope.formData.kaarten==="undefined") ? 1 : $scope.formData.kaarten;
    $scope.formData.shirts 				= (typeof $scope.formData.shirts==="undefined") ? {} : $scope.formData.shirts;
    $scope.formData.reg 				= (typeof $scope.formData.reg==="undefined")? {} : $scope.formData.reg;
    $scope.formData.reg.geboortedatum 	= (typeof $scope.formData.reg==="undefined") ? "" : new Date($scope.formData.reg.geboortedatum);
    //$scope.formData.reg.slaapplek		= (typeof $scope.formData.reg!=="undefined" && $scope.formData.reg.soortovernachting=="Festipi") ? "Ik regel het zelf" : "";
    $scope.formData.reg.betaald 		= (typeof $scope.formData.reg==="undefined") ? "" : 0;
    $scope.formData.user 				= "test";
    $scope.formData.password			= "testpersoon1234";
    
    /* Dit alleen als deze nog niet bestaan, anders wordt de data gewist */
    $scope.formData.introducees 		= (typeof $scope.formData.introducees==="undefined") ? [] : $scope.formData.introducees;
    $scope.formData.introducees[0] 		= (typeof $scope.formData.introducees[0]==="undefined") ? {"pwijzigen":"edit"} : $scope.formData.introducees[0];
    $scope.formData.introducees[0].geboortedatum 	= (typeof $scope.formData.introducees[0]==="undefined") ? "" : new Date($scope.formData.introducees[0].geboortedatum);
    
    $scope.formData.introducees[1] 		= (typeof $scope.formData.introducees[1]==="undefined") ? {"pwijzigen":"edit"} : $scope.formData.introducees[1];
    $scope.formData.introducees[1].geboortedatum 	= (typeof $scope.formData.introducees[1]==="undefined") ? "" : new Date($scope.formData.introducees[1].geboortedatum);
    
    $scope.formData.introducees[2] 		= (typeof $scope.formData.introducees[2]==="undefined") ? {"pwijzigen":"edit"} : $scope.formData.introducees[2];
    $scope.formData.introducees[2].geboortedatum 	= (typeof $scope.formData.introducees[2]==="undefined") ? "" : new Date($scope.formData.introducees[2].geboortedatum);
    $scope.formData.taal				= window.localStorage.taal;
	
    $scope.ticketprice					= 95;
	$scope.tshirtprice					= 11.50;
	$scope.overnachting					= 13;
	$scope.bijslaper					= 12.50;
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
    
    $scope.errors 						= false;
	
    /* TODO : sluitknop */
   
    $scope.setError = function(message){	    
	    $scope.errors 			= 1;		
		$scope.errormessage		= message;
		
		setTimeout(function(){
			 $scope.errors 			= 0;
			 $scope.errormessage	= "";
		}, 5000);
	 }	
	 
	 //$scope.setError("nu doet ie het wel.");
	 
	$scope.copyGegevens = function(checked, index){
	    angular.forEach($scope.formData.reg, function(value, key) {
	    if(key=="email" || key=="email2" || key=="voornaam" || key=="tussenvoegsels" || key=="achternaam" || key=="geboortedatum")return false;
	    $scope.formData.introducees[index][key] = (checked) ? value : "";
	    });
	}   
        
    $scope.showPrice = function(){
	   	//TODO ITERATE TROUGHT THE OBJECT AND CHECK IF THE VALUES ARE NOT NULL
	    $scope.formData.extrapersonen	= parseInt($scope.formData.reg.extrapersonen)
	   	$scope.totaaltickets 			= $scope.formData.kaarten * $scope.ticketprice	    
	    $scope.aantaltshirts			= Object.keys($scope.formData.shirts).length;
	    $scope.totaaltshirts			= (Object.keys($scope.formData.shirts).length > 0) ? Object.keys($scope.formData.shirts).length * $scope.tshirtprice : 0;
	    
	    $scope.extrapersonen			= ($scope.formData.extrapersonen > 0) ? $scope.formData.extrapersonen : 0;
	    $scope.totaalovernacht			= $scope.overnachting * $scope.extrapersonen;
		$scope.formData.totaalbedrag 	= ($scope.totaalovernacht + $scope.totaaltickets + $scope.totaaltshirts).toFixed(2);;
	    
	    angular.element(document.getElementById('totaalbedrag')).val($scope.totaalbedrag)
	    angular.element(document.getElementById('showtotaalbedrag')).html('&euro; '+$scope.formData.totaalbedrag)
	    
	    
	    
	    //console.log(parseInt($scope.formData.reg.extrapersonen))    	           
    }
       
    /* OVERZICHT FUNCTIES */    
    /** functie voor togglen introducee edit <> view **/
    $scope.states					= [{"gegevens":"edit", "starttijd":"view", "vervoer":"view", "slapen":"view"},{"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view"},{"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view"}];
    $scope.pstates					= {"kaarten":"view", "gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view"};									
    
    $scope.ftemplates 				= { "kaarten"	: {"view" : "views/blokken/freon-kaarten-view.html", "edit":"views/blokken/freon-kaarten-edit.html"},
	    								"gegevens"	: {"view" : "views/blokken/freon-gegevens-view.html", "edit":"views/blokken/freon-gegevens-edit.html"},
	    								"starttijd"	: {"view" : "views/blokken/freon-starttijd-view.html", "edit":"views/blokken/freon-starttijd-edit.html"},
    									"vervoer"	: {"view" : "views/blokken/freon-vervoer-view.html", "edit":"views/blokken/freon-vervoer-edit.html"},
    									"slapen"	: {"view" : "views/blokken/freon-slapen-view.html", "edit":"views/blokken/freon-slapen-edit.html"},
    									};
    									
    $scope.templates 				= { "gegevens"	: {"view" : "views/blokken/introduce-gegevens-view.html", "edit":"views/blokken/introduce-gegevens-edit.html"},
	    								"starttijd"	: {"view" : "views/blokken/introduce-starttijd-view.html", "edit":"views/blokken/introduce-starttijd-edit.html"},
    									"vervoer"	: {"view" : "views/blokken/introduce-vervoer-view.html", "edit":"views/blokken/introduce-vervoer-edit.html"},
    									"slapen"	: {"view" : "views/blokken/introduce-slapen-view.html", "edit":"views/blokken/introduce-slapen-edit.html"},
    									};
    
    $scope.toggleTemplate = function(template, view, index){	    
	    $scope.states[index][template] = view;
	    //TODO: alle andere velden kunnen beter ook uit
	    if(view=="edit"){ // = gegevens bewerken, dan andere bewerkingsvelden uit.
		    angular.forEach($scope.states, function(states, i) {
				console.log(states, i);
				angular.forEach(states, function(view1, template1) {
					
					if(index!=i){//als het niet om de betreffende view gaat
						//console.log($scope.states[i][template]);
						$scope.states[i][template] = "view";
					}
					
					//console.log(index+" : "+i+" : "+template1 + ': ' + view1);
				});
			});
	    }
	    
	    $cookies.putObject('formData', $scope.formData, {"secure":true}); 	   	  
    }
    
    $scope.togglepTemplate = function(template, view){	    
		$scope.pstates[template] = view;
		
		/*** als er een veld bewerkt wordt dan alle andere velden op view ***/
		//console.log(template, view);
		if(view=="edit"){ 
			angular.forEach($scope.pstates, function(view1, template1) {
				if(template1!=template){
					console.log(template, template1, view1);
					$scope.pstates[template1] = "view";
				}
		});
		}	 
		
		/*** Alle introducee bewerkingsvelden op view zetten ***/
		angular.forEach($scope.states, function(states, i) {
				angular.forEach(states, function(view1,template1) {
					$scope.states[i][template1] = "view";
				})
		});
		
	    $cookies.putObject('formData', $scope.formData, {"secure":true}); 	   	
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
    
    $scope.loginError	= false;
   	
   	$scope.inloggen = function(){
   		$cookies.putObject('formData', $scope.formData, {"secure":true}); 
	   	$scope.buttondisabled 	= true;
	   	$scope.loginError 		= false;
	   	
	   	console.log($scope.formData);
	   	$http({
		    method: 'POST',
		    //url: 'http://slachtemarathon.statuur.nl/login',
		    url :'https://www.slachtemarathon.nl/api/freon/login',
		    data: $.param($scope.formData),//"message=aap",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	if(response.data.status==="ok"){
	    		$scope.parseData(response.data.data);
				$scope.setStap(1,'forwards');
	    	}else{
		    	$scope.loginError = true;
	    	}
	    	$scope.buttondisabled  = false;
	  	}, function errorCallback(response) {
	    	console.error(response);
	  	});
	
	} 	
		
	$scope.parseData = function(data){
		console.log(data);
		$scope.formData.reg.userID 			= data.ID;		
		$scope.formData.reg.email 			= data.user_email;
		$scope.formData.reg.email2 			= data.user_email;		
		$scope.formData.reg.voornaam 		= data.first_name;
		$scope.formData.reg.achternaam 		= data.last_name;
		$scope.formData.reg.tussenvoegsels	= data.tussenvoegsels;
		$scope.formData.reg.straat	 		= data.Straat;
		$scope.formData.reg.huisnummer 		= data.Huisnummer;
		$scope.formData.reg.postcode 		= data.Postcode;
		$scope.formData.reg.plaats 			= data.Plaats;
		$scope.formData.reg.telefoon 		= data.Telefoon;
		$scope.formData.reg.geboortedatum 	= new Date(data.Geb_datum);
		$scope.formData.reg.geslacht 		= data.Geslacht;
		$scope.formData.reg.betaald 		= data.betaald;
		$cookies.putObject('formData', $scope.formData, {"secure":true}); 
	}
	
	 $scope.Bedankt = function() {
   	 
   	 //get user_id and update it to betalen ajax request to deeelnemer betaald
   	 if(typeof $scope.formData.reg.userID==="undefined" || $scope.formData.reg.userID==""){//controleren of er een goede cookie is.
	   	 document.location.href='tickets.html'
   	 }else{
   	 
   	 
   	 $http({
		    method: 'POST',
		    url :'https://www.slachtemarathon.nl/api/freon/betaald',
		    data: $.param({"userID": $scope.formData.reg.userID, "order_id": $scope.formData.order_id, "betaald":"1"}),//"message=aap",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
			console.log(response);
			//$state.go('bedankt');
		}, function errorCallback(response) {
	    	if(response.status==-1){
	    		//$cookies.getObject('formData');
	    		$scope.setError("Helaas is er even iets mis met het updaten van de betaalstatus, neem contact op met de organisatie en vermeld betalingsID ".$scope.formData.paymentID); 
    		}
	  	});
   	 }
   	 
   	 }
	
	$scope.opslaan = 0;
	// function to process the form
    $scope.processForm = function() {
       //console.log($.param($scope.formData));
       $cookies.putObject('formData', $scope.formData, {"secure":true}); 	   	
       $scope.opslaan = 1;
       $http({
		    method: 'POST',
		    url :'https://www.slachtemarathon.nl/api/freon/update',
		    data: $.param($scope.formData),//"message=aap",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	if(response.data.status==="ok"){
		    	$scope.opslaan = 0;
				document.location.href='betalen.php'; //bij live
		    	//$state.go('form.betalensimulatie');
	    	}else{
		    	//hier een foutmelding
	    	}
	  	}, function errorCallback(response) {
	    	console.error(response);//hier een foutmelding
	  	});
    };
    $scope.$location = $location;
    
    $scope.kiesdorp = function(dorp, index){//TODO: compatible with introducee
	    $scope.formData.reg.dorp = dorp;
	    //soort-overnachting
	    $location.hash('soort-overnachting');
	    // call $anchorScroll()
		$anchorScroll();
    };
    
    $scope.alert	= function(mes){
		mes = gettext(mes);
		alert(mes);
	}   
    $scope.setStap	= function(stap, direction){
		//console.log(form.$valid+" - "+form.$invalid);
		
		$scope.stap		= stap;		
		$scope.direction = direction;//($scope.prevstap > $scope.stap) ? "backwards" : "forwards";		
		//console.log($scope.stap, $scope.direction);
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
       
    //get dorpen.json "?"+new Date().toString() json/dorpen.json https://www.slachtemarathon.nl/api/dorpen/get_dorpen
    $http({
		method: 'GET',
		url: 'https://www.slachtemarathon.nl/api/systeem/dorpen/'
	}).then(function successCallback(response) {
		delete response.data.status;
		$scope.inschrijving_status = response.data.inschrijving_status;
		delete response.data.inschrijving_status
		$scope.dorpen = response.data;
		
		}, function errorCallback(response) {
    		//console.error("ERROR code:"+response);
    		if(response.status==-1){
	    		$scope.setError("Helaas is er even iets mis met het systeem, probeer het zo nog even");
    		}
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
  