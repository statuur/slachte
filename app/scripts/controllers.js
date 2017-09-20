"use strict"; 

angular.module('app.controllers', [])

//DUBBEL
.controller('welkomController', function($scope, $http, gettext, gettextCatalog, $cookies) {
	
	$http({
		method: 'GET',
		url: 'https://www.slachtemarathon.nl/api/systeem/status/'
	}).then(function successCallback(response) {
		delete response.data.status;
		$scope.inschrijving_status = response.data.inschrijving_status;
	}, function error(response) {
        //console.log(response)
        $scope.setError($scope.errortxt);
    });
    
	//$cookies.remove('cookies');	
	$scope.cookieAgree 	= (typeof $cookies.get('cookies')==="undefined")? 0 : $cookies.get("cookies");
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
    /*
	    var imported = document.createElement('script');
var fileImport = 'angular-locale_' + selFormat + '.js';
imported.src = 'https://code.angularjs.org/1.2.10/i18n/' + fileImport;
document.head.appendChild(imported);
	   */ 
})

.controller('formController', function($filter, $scope, $http, gettextCatalog, $state, gettext, $transitions, $cookies, $location, $anchorScroll, $uiRouter) {
	//$cookies.remove('betaald') 
	//$cookies.remove('formData');
	//console.log($cookies.getObject('formData', $scope.formData));
	//delete window.localStorage.formData
	//console.log(JSON.parse(window.localStorage.formData));
	//$scope.locale						= (typeof $scope.formData.reg.taal!=="undefined")window.localStorage.taal;
	//window.localStorage.clear();
	$scope.dateOptions					= {
										    formatYear: 'yyyy',
										    datepickerMode: 'year',
										    maxDate: new Date(2006, 8, 31),
										    minDate: new Date(1930, 8, 31),
										    startingDay: 1,
										    showWeeks: false
										  }
	$scope.buttondisabled				= false;     
	$scope.required						= gettextCatalog.getString("Nog niet alle vereiste velden zijn ingevuld. Kijk de gegevens goed na.");
	$scope.sendlogintxt					= gettextCatalog.getString("Vul hieronder het e-mailadres in waarmee je als Freon geregistreerd staat en we versturen de e-mail met login gegevens opnieuw.");
	$scope.errortxt						= gettextCatalog.getString("Helaas is er even iets mis met het systeem, herlaad de pagina en probeer het nog eens.");
	$scope.sendloginsucces				= gettextCatalog.getString("Er is een e-mail naar je onderweg met de logingegevens. Controleer je e-mail.");	
	$scope.opstapplekken				= [gettext("Sneek"), gettext("Leeuwarden"), gettext("Heerenveen"), gettext("Franeker/Harlingen")];       
    $scope.deelname						= [1,2,3,4,5, gettextCatalog.getString("nog nooit")];
    $scope.formData 					= (typeof window.localStorage.formData==="undefined")? {} : JSON.parse(window.localStorage.formData); 
    $scope.formData.kaarten 			= (typeof $scope.formData.kaarten==="undefined") ? "" : $scope.formData.kaarten;
    $scope.formData.shirts 				= (typeof $scope.formData.shirts==="undefined") ? {} : $scope.formData.shirts;
    $scope.formData.hoodies 			= (typeof $scope.formData.hoodies==="undefined") ? {} : $scope.formData.hoodies;
    $scope.formData.reg 				= (typeof $scope.formData.reg==="undefined")? {} : $scope.formData.reg;
    
    $scope.formData.reg.geboortedatum 	= (typeof $scope.formData.reg==="undefined") ? "" : new Date($scope.formData.reg.geboortedatum);
    //$scope.formData.reg.slaapplek		= (typeof $scope.formData.reg!=="undefined" && $scope.formData.reg.soortovernachting=="Festipi") ? "Ik regel het zelf" : "";
	
	$scope.formData.reg.taal			= window.localStorage.taal;
    $scope.formData.reg.betaald 		= (typeof $scope.formData.reg==="undefined") ? "" : 0;
    $scope.formData.user 				= "testpersoon1";
    $scope.formData.password			= "tpersoon_1234*";
    $scope.direction 					= "forwards";
   
    $scope.initIntroducees = function(){
	     /* Dit alleen als deze nog niet bestaan, anders wordt de data gewist */		     
	    $scope.formData.introducees 		= (typeof $scope.formData.introducees==="undefined") ? [] : $scope.formData.introducees;
	    $scope.formData.introducees[0] 		= (typeof $scope.formData.introducees[0]==="undefined") ? {"pwijzigen":"edit"} : $scope.formData.introducees[0];
	    $scope.formData.introducees[1] 		= (typeof $scope.formData.introducees[1]==="undefined") ? {"pwijzigen":"edit"} : $scope.formData.introducees[1];
	    $scope.formData.introducees[2] 		= (typeof $scope.formData.introducees[2]==="undefined") ? {"pwijzigen":"edit"} : $scope.formData.introducees[2];
	}
    
    $scope.initIntroducees();
    
    $scope.ticketprice					= 95;
	$scope.tshirtprice					= 23.50;
	$scope.hoodieprice					= 18.50;
	$scope.verzendkosten				= 6.95;
	$scope.overnachting					= 13;
	$scope.bijslaper					= 13;
    $scope.mgenders						= {"m": gettextCatalog.getString("heren"), "v": gettextCatalog.getString("dames")}
    $scope.genders 						= ["m","v"];
    $scope.sizes 						= ["s","m","l","xl", "xxl"];
    $scope.maxkaarten 					= [1,2,3,4]; 	
	$scope.stap 						= 1;
    
   
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
	    //$scope.formData.introducees[index] = [];
	    angular.forEach($scope.formData.reg, function(value, key) {
	    if(key=="user_email" || key=="verzend-email" || key=="email" || key=="email2" || key=="voornaam" || key=="tussenvoegsels" || key=="achternaam" || key=="betaald" || key=="extrapersonen" || key=="geboortedatum" || key=="geslacht" || key=="ID" || key=="user_login")return false;
	    $scope.formData.introducees[index][key] = (checked) ? value : "";
	    });
	}   
   	       
    $scope.showPrice = function(){
	   	//TODO ITERATE TROUGHT THE OBJECT AND CHECK IF THE VALUES ARE NOT NULL
	    $scope.formData.extrapersonen	= parseInt($scope.formData.reg.extrapersonen)
	   	$scope.totaaltickets 			= $scope.formData.kaarten * $scope.ticketprice	    
	    //$scope.aantaltshirts			= Object.keys($scope.formData.shirts).length;
	    $scope.totaaltshirts			= ($scope.formData.aantaltshirts > 0) ? $scope.formData.aantaltshirts * $scope.tshirtprice : 0;
	    $scope.totaalhoodies			= ($scope.formData.aantalhoodies > 0) ? $scope.formData.aantalhoodies * $scope.hoodieprice : 0;
	    
	    $scope.verzendkosten			= ($scope.totaaltshirts > 0 || $scope.totaalhoodies > 0) ? $scope.verzendkosten	: 0;
	    
	    $scope.extrapersonen			= ($scope.formData.extrapersonen > 0) ? $scope.formData.extrapersonen : 0;
	    
	    $scope.totaalovernacht			= $scope.overnachting * $scope.extrapersonen;
		$scope.formData.totaalbedrag 	= ($scope.totaalovernacht + $scope.totaaltickets + $scope.totaaltshirts + $scope.totaalhoodies + $scope.verzendkosten).toFixed(2);;
	    
	    angular.element(document.getElementById('totaalbedrag')).val($scope.totaalbedrag)
	    angular.element(document.getElementById('showtotaalbedrag')).html('&euro; '+$scope.formData.totaalbedrag)
    }
       
    /* OVERZICHT FUNCTIES */    
    /** functie voor togglen introducee edit <> view **/
    $scope.states					= [{"gegevens":"edit", "starttijd":"view", "vervoer":"view", "slapen":"view", "kleding":"view"},{"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view", "kleding":"view"},{"gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view", "kleding":"view"}];
    $scope.pstates					= {"kaarten":"view", "gegevens":"view", "starttijd":"view", "vervoer":"view", "slapen":"view", "kleding":"view"};									
    
    $scope.ftemplates 				= { "kaarten"	: {"view" : "views/blokken/freon-kaarten-view.html", "edit":"views/blokken/freon-kaarten-edit.html"},
	    								"gegevens"	: {"view" : "views/blokken/freon-gegevens-view.html", "edit":"views/blokken/freon-gegevens-edit.html"},
	    								"starttijd"	: {"view" : "views/blokken/freon-starttijd-view.html", "edit":"views/blokken/freon-starttijd-edit.html"},
    									"vervoer"	: {"view" : "views/blokken/freon-vervoer-view.html", "edit":"views/blokken/freon-vervoer-edit.html"},
    									"slapen"	: {"view" : "views/blokken/freon-slapen-view.html", "edit":"views/blokken/freon-slapen-edit.html"},
    									"kleding"	: {"view" : "views/blokken/freon-kleding-view.html", "edit":"views/blokken/freon-kleding-edit.html"},
    									};
    									
    $scope.templates 				= { "gegevens"	: {"view" : "views/blokken/introduce-gegevens-view.html", "edit":"views/blokken/introduce-gegevens-edit.html"},
	    								"starttijd"	: {"view" : "views/blokken/introduce-starttijd-view.html", "edit":"views/blokken/introduce-starttijd-edit.html"},
    									"vervoer"	: {"view" : "views/blokken/introduce-vervoer-view.html", "edit":"views/blokken/introduce-vervoer-edit.html"},
    									"slapen"	: {"view" : "views/blokken/introduce-slapen-view.html", "edit":"views/blokken/introduce-slapen-edit.html"},
    									};
    
    $scope.toggleTemplate = function(template, view, index){	    
	    $scope.states[index][template] = view;
	    
	       angular.forEach($scope.states, function(states, i) {
				angular.forEach(states, function(view1, template1) {					
					//console.log(view+" : "+view1);
					if(template!=template1){//als het niet om de betreffende introducee gaat
						//console.log($scope.states[i][template]);
						$scope.states[i][template1] = "view";
					}
					
				});
			});
	    
	    window.localStorage.formData = JSON.stringify($scope.formData);
	    //window.localStorage.formData = $scope.formData;
	   ///$cookies.putObject('formData', $scope.formData, {"secure":true}); 	   	  
    }
    
    $scope.togglepTemplate = function(template, view){	    
		$scope.pstates[template] = view;
		/*** als er een veld bewerkt wordt dan alle andere velden op view ***/
		if(view=="edit"){ 
			angular.forEach($scope.pstates, function(view1, template1) {

				if(template1!=template){
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
		
		window.localStorage.formData = JSON.stringify($scope.formData);
		//window.localStorage.formData = $scope.formData;
	    //$cookies.putObject('formData', $scope.formData, {"secure":true}); 	   	
    }
    
	/* KOPIEER PERSOONSGEGEVENS NAAR DE INTRODUCEES */
    $scope.setIntroduceData			= function(index){
	    var copyfields = ["starttijd","vervoer", "slapen", "dorp", "soortovernachting", "slaapplek", "bagage"];
		//console.log($scope.formData);
		angular.forEach($scope.formData.reg, function(value, key) {
		  if(copyfields.indexOf(key) > -1 ){
		  $scope.formData.introducees[index][key] = value;
		  }		  
		});
    }
   
    $scope.sendInlog = function(){
	    
	    $scope.buttondisabled 	= true;
	    $http({
		    method: 'POST',
		    url :'https://www.slachtemarathon.nl/api/freon/sendInlog',
		    data: $.param({"email":$scope.formData.emailfreon, "taal":$scope.formData.taal}),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	if(response.data.status==="ok"){
				$scope.sendlogintxt	= $scope.sendloginsucces;
				setTimeout(function(){
					document.location.reload();
				}, 8000);
	    	}
	    	$scope.buttondisabled  = false;
	  	}, function errorCallback(response) {
	    	$scope.setError($scope.errortxt);
	    	console.error(response);
	  	});
    }
    
    $scope.loginError	= false;
   	
	   	$scope.inloggen = function(){
		//$cookies.putObject('formData', $scope.formData, {"secure":true}); 
	   	$scope.buttondisabled 	= true;
	   	$scope.loginError 		= false;
	   	
	   	
	   	$http({
		    method: 'POST',
		    url :'https://www.slachtemarathon.nl/api/freon/inloggen',
		    data: $.param($scope.formData),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	if(response.data.status==="ok"){
				
				if(response.data.betaald > 1504628362){
					//stappen uit het proces halen?
					$uiRouter.stateRegistry.deregister("form.aantalkaarten");
					$uiRouter.stateRegistry.deregister("form.persoonlijke-gegevens");
					$uiRouter.stateRegistry.deregister("form.starttijd");
					$uiRouter.stateRegistry.deregister("form.vervoer");
					$uiRouter.stateRegistry.deregister("form.slapen");
					$uiRouter.stateRegistry.deregister("form.kleding");
					$uiRouter.stateRegistry.deregister("form.betalen");	
					
					//sla dit op in een cookie voor de reload.
					$cookies.put('betaald', "1",{"secure":true});//{"secure":true}
					$scope.loggedin = 1;
					
				}
				$scope.parseData(response.data);
				//console.log("zou oke moeten zijn");
				setTimeout(function(){
					$scope.menu();
					$scope.setStap(1,'forwards');
				}, 500);
				
	    	}else{
		    	$scope.loginError = true;
	    	}
	    	
	    	$scope.buttondisabled  = false;
	  	}, function errorCallback(response) {
	    	$scope.setError($scope.errortxt);
	    	console.error(response);
	  	});
	
	} 	

	$scope.parseData = function(data){
		if(data.reg.geboortedatum!=""){
		data.reg.geboortedatum = data.reg.geboortedatum.split(" ")[0];
		//console.log(new Date(data.reg.geboortedatum));
		data.reg.geboortedatum 	= $filter('date')(new Date(data.reg.geboortedatum), 'dd-MM-yyyy');
		}
		
		if(angular.fromJson(data.reg.shirts) !== null){
			data.shirts 			= angular.fromJson(data.reg.shirts)
			data.aantaltshirts		= data.shirts.length;
			console.log(data.shirts);
		}
		
		if(angular.fromJson(data.reg.hoodies) !== null){
			data.hoodies	 		= angular.fromJson(data.reg.hoodies);
			data.aantalhoodies		= data.hoodies.length;
		}
		data.reg.shirts			= undefined;	
		data.reg.hoodies		= undefined;	
		data.reg.email			= data.reg.user_email;
		data.reg.email2			= data.reg.user_email;
		data.user				= data.reg.user_login;
		//data.password			= data.reg.user_login;
		
		if(typeof data.reg.taal!=="undefined" && data.reg.taal!=""){
			gettextCatalog.setCurrentLanguage(data.reg.taal);
			window.localStorage.taal = data.reg.taal;
		}
		//delete data.status;
		//delete data.reg.user_email;
		
		$scope.formData.user 				= data.reg.user_login;
		$scope.formData.password			= "testpersoon1234";//WEG BIJ LIVE
		
		$scope.formData = data;
		//console.log(data);
		//AFHANKELIJK VAN KEUZE WEL/NIET INLOGGEN MEELOPER
		if(typeof $scope.formData.introducees==="undefined" && $scope.formData.reg.role!="meeloper"){
			$scope.initIntroducees();
		}
		//console.log($scope.formData);
		
		window.localStorage.formData = JSON.stringify($scope.formData);
		//window.localStorage.formData = $scope.formData;
		//$cookies.putObject('formData', $scope.formData, {"secure":true}); 
	}


	
	
	$scope.isBetaald = function(){//angular.element(document.getElementById('totaalbedrag')).val($scope.totaalbedrag)		
		if(typeof $cookies.get('betaald')!==undefined && $cookies.get('betaald')==1 && !$scope.loggedin){
			
			$uiRouter.stateRegistry.deregister("form.aantalkaarten");
			$uiRouter.stateRegistry.deregister("form.persoonlijke-gegevens");
			$uiRouter.stateRegistry.deregister("form.starttijd");
			$uiRouter.stateRegistry.deregister("form.vervoer");
			$uiRouter.stateRegistry.deregister("form.slapen");
			$uiRouter.stateRegistry.deregister("form.kleding");
			$uiRouter.stateRegistry.deregister("form.betalen");	
			setTimeout(function(){
					$scope.menu();
					$scope.setStap(1,'forwards');
				}, 500);
		}
	}	
	
	$scope.bedankt = function() {
   	 
   	 //get user_id and update it to betalen ajax request to deeelnemer betaald
	   	 if(typeof $scope.formData.reg.ID==="undefined" || $scope.formData.reg.ID==""){//controleren of er een goede cookie is.
		   	 document.location.href='tickets.html'
	   	 }else{  	 
	   	 
	   	// $cookies.getObject('paymentID');
	   	 $scope.formData.orderID = $cookies.get('orderID');
	   	 $scope.formData.paymentID = $cookies.get('paymentID');
	   	 
	   	 $http({
			    method: 'POST',
			    url :'https://www.slachtemarathon.nl/api/freon/betaald',
			    data: $.param($scope.formData),
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function successCallback(response) {
				console.log(response);
				//delete cookies hier
				
			}, function errorCallback(response) {
		    	if(response.status==-1){
		    		//$cookies.getObject('formData');
		    		$scope.setError("Helaas is er even iets mis met het updaten van de betaalstatus, neem contact op met de organisatie en vermeld betalingsID ".$scope.formData.paymentID); 
	    		}
		  	});
	   	 }
   	 
   	 }
	
	$scope.formData.opslaan = false;
	// function to process the form
    $scope.processForm = function() {
       window.localStorage.formData = JSON.stringify($scope.formData);
       console.log($scope.formData);
       //window.localStorage.formData = $scope.formData;
       //$cookies.putObject('formData', $scope.formData, {"secure":true}); 	   	
       $scope.formData.opslaan = false;
       $http({
		    method: 'POST',
		    url :'https://www.slachtemarathon.nl/api/freon/update',
		    data: $.param($scope.formData),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	console.error(response.data);
	    	if(response.data.status==="ok"){
		    	$cookies.putObject('betalingsinfo', {"userID":$scope.formData.reg.ID,"voornaam":$scope.formData.reg.voornaam,"achternaam":$scope.formData.reg.achternaam, "totaalbedrag": $scope.formData.totaalbedrag, "kaarten":$scope.formData.kaarten}, {"secure":true});
				document.location.href='betalen.php'; //bij live
	    	}else{
		    	console.error(response);//TODO foutmelding tbv api controller
	    	}
	  	}, function errorCallback(response) {
	    	$scope.setError($scope.errortxt);
	    	console.error(response);//hier een foutmelding
	  	});
    };
    
    $scope.$location = $location;
        
    $scope.setStap	= function(stap, direction){
		$scope.stap		= stap;		
		$scope.direction = direction;		
		
			if($scope.stap==2 && $scope.direction=="forwards"){
				$http({
					method: 'POST',
					url :'https://www.slachtemarathon.nl/api/systeem/aantalKaarten',
					data: $.param({"aantalkaarten":$scope.formData.kaarten}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function successCallback(response) {
					//console.log(response.data);	    						    	
				}, function errorCallback(response) {							    	
				console.error(response);
							    	
				});
     
			}	
		
			if(stap==-1){
				document.location.href='index.html';
			}else{
				$state.go($scope.stappen[stap].name);			
			}
		
	    window.localStorage.formData = JSON.stringify($scope.formData);

	};
	
	//to update the menu at the right timing
    $transitions.onSuccess( {}, function(transition){		
		setTimeout(function(){
			 $scope.menu();
		}, 1010);
		
	
	});
      

	
    $scope.menu		= function() {
         var formsteps = $state.get();    
		 var stappen = [];
		 //console.log($state.current);
		 var passed	 = 1;
		 var i = 0;
		 angular.forEach(formsteps, function(stap, key) {
		 	 if (stap.name.match(/(form.betalensimulatie)/i)) return false;//KANWEG
		 	 if (stap.name.match(/(form.)/i)) {
		 	 	 var translated = gettextCatalog.getString(stap.name);
		 	 	 stap.title 	= translated;
		 	 	 stap.active	= $state.current.name===stap.name;
		 	 	 
		 	 	 $scope.stap 	= (stap.active) ? i : $scope.stap;
		 	 	 passed			= ($state.current.name===stap.name) ? 0 : passed;
		 	 	 stap.passed	= passed;
		 	 	 stap.stap		= key;
		 	 	 this.push(stap);
		 	 	 i++;
		 	 }	 	 
		}, stappen);     
		
		//$scope.$apply(function () {
			$scope.stappen = stappen;    
		//});
		//stappen['-1'] = "aap"
		//console.log(stappen);        
		
    };	
    
    $scope.menu(); 

    $http({
		method: 'GET',
		url: 'https://www.slachtemarathon.nl/api/systeem/basisinfo/?taal='+window.localStorage.taal
	}).then(function successCallback(response) {
		$scope.inschrijving_status 	= response.data.inschrijving_status;
		$scope.dorpen 				= response.data.dorpen;
		$scope.starttijden 			= response.data.starttijden;
		}, function errorCallback(response) {
    		if(response.status == -1){
	    		$scope.setError("Helaas is er even iets mis met het systeem, probeer het zo nog even");
    		}
     });
   
})
.directive('freonenEmailExists', function($http, $q) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
             ngModel.$asyncValidators.freonenEmailExists = function(modelValue, viewValue) {
					 if(ngModel.$pristine || scope.originalEmail===ngModel.$viewValue){return $q(function(r) {r(1);});}else{
						 return $http({
									    method: 'POST',
									    url :'https://www.slachtemarathon.nl/api/freon/emailCheck',
									    data: $.param({"email":ngModel.$viewValue}),
									    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
									}).then(function successCallback(response) {
							    		//console.log(response);
							    	if(response.data.exists){
								    	return $q.resolve('goed e-mailadres');							    	
							    	}else{
								    	return $q.reject('e-mail bestaat niet');
							    	}
							  	}, function errorCallback(response) {							    	
							    	console.error(response);
							    	return $q.reject('selected username does not exists');
							  	});
					 }
				}; 	 
        }
    };
})
 
.directive('emailExists', function($http, $q) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
             ngModel.$asyncValidators.emailExists = function(modelValue, viewValue) {
					 if(ngModel.$pristine || scope.originalEmail===ngModel.$viewValue){return $q(function(r) {r(1);});}else{
						 return $http({
									    method: 'POST',
									    url :'https://www.slachtemarathon.nl/api/freon/emailCheck',
									    data: $.param({"email":ngModel.$viewValue}),
									    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
									}).then(function successCallback(response) {
							    		//console.log(response);
							    	if(response.data.exists){
								    	return $q.reject('e-mail bestaat al');							    	
							    	}else{
								    	return $q.resolve('goed e-mailadres');
							    	}
							  	}, function errorCallback(response) {							    	
							    	console.error(response);
							    	return $q.reject('selected username does not exists');
							  	});
					 }
				}; 	 
        }
    };
})
.directive('matchValidator', [function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attr, ctrl) {
                	//store original value otherwise there will always be  a double return value
                	var pwdWidget = elm.inheritedData('$formController')[attr.matchValidator];
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
  