"use strict"; 

angular.module('app.controllers', [])

.controller('formController', function($locale,$filter, $scope, $http, $state, $transitions, $cookies, $location, $anchorScroll, $uiRouter) {
	/*$cookies.remove('betaald') 
	$cookies.remove('formData');
	window.localStorage.clear();
	window.localStorage.clear();
	*/
	
	$scope.$watch('formData.reg.slapen', function (newval, oldval) {
		
		if(newval=="Ik slaap thuis"){
		$scope.formData.extrapersonen 			= "";
		$scope.extrapersonen 					= "";
		$scope.formData.reg.dorp 				= "";
		$scope.formData.reg.slaapplek			= "";
		$scope.formData.reg.soortovernachting	= "";
		$scope.formData.reg.nachtenslapen		= "";
		$scope.formData.reg.tentcaravancamper	= "";

		}
	})
	
	$scope.$watch('formData.reg.dorp', function (newval, oldval) {
		
		if(newval=="Tritzum"){
			$scope.formData.reg.slaapplek 			= "";//
			$scope.formData.reg.soortovernachting	= "In eigen tent";
			$scope.formData.reg.nachtenslapen		= "";
			$scope.formData.reg.tentcaravancamper	= "";
			$scope.formData.reg.extrapersonen		= "";
		}else{
			$scope.formData.reg.soortovernachting	= "";
		}	
	});
		
	$scope.$watch('formData.introducees[1].dorp', function (newval, oldval) {
		
		if(newval=="Tritzum"){
			$scope.formData.introducees[1].slaapplek 			= "";//
			$scope.formData.introducees[1].soortovernachting	= "In eigen tent";
			$scope.formData.introducees[1].nachtenslapen		= "";
			$scope.formData.introducees[1].tentcaravancamper	= "";
			$scope.formData.introducees[1].extrapersonen		= "";
		}else{
			$scope.formData.introducees[1].soortovernachting	= "";
		}	
	});


	$scope.$watch('formData.introducees[2].dorp', function (newval, oldval) {
		
		if(newval=="Tritzum"){
			$scope.formData.introducees[2].slaapplek 			= "";//
			$scope.formData.introducees[2].soortovernachting	= "In eigen tent";
			$scope.formData.introducees[2].nachtenslapen		= "";
			$scope.formData.introducees[2].tentcaravancamper	= "";
			$scope.formData.introducees[2].extrapersonen		= "";
		}else{
			$scope.formData.introducees[2].soortovernachting	= "";
		}	
	});

	
	$scope.ticketprice					= 95;
	$scope.tshirtprice					= 18.50;
	$scope.hoodieprice					= 39.50;
	$scope.verzendkosten				= 6.95;
	$scope.overnachting					= 13;
	$scope.bijslaper					= 13;
    $scope.mgenders						= {"m": "heren", "v": "dames"}
    $scope.genders 						= ["m","v"];
    $scope.sizes 						= ["s","m","l","xl", "xxl"];
    $scope.maxkaarten 					= [1,2,3,4]; 	
	$scope.stap 						= 1;
    $scope.errors 						= false;

	$scope.dateOptions					= {
										    formatYear: 'yyyy',
										    datepickerMode: 'year',
										    maxDate: new Date(2006, 8, 30),
										    minDate: new Date(1930, 8, 30),
										    startingDay: 1,
										    showWeeks: false
										  }
										  
	$scope.buttondisabled				= false;     
	$scope.required						= "Nog niet alle vereiste velden zijn ingevuld. Kijk de gegevens goed na.";
	$scope.sendlogintxt					= "Vul hieronder het e-mailadres in waarmee je als Freon geregistreerd staat en we versturen de e-mail met login gegevens opnieuw.";
	$scope.errortxt						= "Helaas is er even iets mis met het systeem, herlaad de pagina en probeer het nog eens.";
	$scope.sendloginsucces				= "Er is een e-mail naar je onderweg met de logingegevens. Controleer je e-mail.";	
	$scope.opstapplekken				= ["Sneek", "Leeuwarden", "Heerenveen", "Franeker/Harlingen"];       
    $scope.deelname						= [1,2,3,4,5, "nog nooit"];
    $scope.formData 					= (typeof window.localStorage.formData==="undefined")? {} : JSON.parse(window.localStorage.formData); 
    $scope.formData.kaarten 			= (typeof $scope.formData.kaarten==="undefined") ? "" : $scope.formData.kaarten;
    $scope.formData.shirts 				= (typeof $scope.formData.shirts==="undefined") ? {} : $scope.formData.shirts;
    $scope.formData.hoodies 			= (typeof $scope.formData.hoodies==="undefined") ? {} : $scope.formData.hoodies;
    $scope.formData.reg 				= (typeof $scope.formData.reg==="undefined")? {} : $scope.formData.reg;
    
    $scope.formData.reg.geboortedatum 	= (typeof $scope.formData.reg==="undefined") ? "" : new Date($scope.formData.reg.geboortedatum);
    //$scope.formData.reg.slaapplek		= (typeof $scope.formData.reg!=="undefined" && $scope.formData.reg.soortovernachting=="Festipi") ? "Ik regel het zelf" : "";
	$scope.personen						= ["persoon","personen", "personen", "personen", "personen"];
	$scope.skaarten						= ["startkaart","startkaarten"];
	$scope.formData.reg.taal			= "nl_NL";
    $scope.betaald 						= ($cookies.get('betaald')==1) ? 1 : 0;
	$scope.formData.user 				= "";
    $scope.formData.password			= "";
    $scope.direction 					= "forwards";
	
	
	$scope.setDirty	= function(mes){
		setTimeout(function(){
			angular.forEach($scope.form.$error.required, function(field) {
				field.$setDirty();
			});
		}, 100);			
	}
	
	$scope.alert	= function(mes){
		
		alert(mes);
	}
	
		
    $scope.initIntroducees = function(){
	     /* Dit alleen als deze nog niet bestaan, anders wordt de data gewist */		     
	    $scope.formData.introducees 	= (typeof $scope.formData.introducees==="undefined") ? [] : $scope.formData.introducees;
	    $scope.formData.introducees[0] 	= (typeof $scope.formData.introducees[0]==="undefined" || $scope.formData.introducees[0]===null) ? {"pwijzigen":"edit"} : $scope.formData.introducees[0];
	    
	    $scope.formData.introducees[0].geboortedatum 	= (typeof $scope.formData.introducees[0].geboortedatum==="undefined") ? new Date() : new Date($scope.formData.introducees[0].geboortedatum);
	    
	    
	    $scope.formData.introducees[1] 	= (typeof $scope.formData.introducees[1]==="undefined" || $scope.formData.introducees[1]===null) ? {"pwijzigen":"edit"} : $scope.formData.introducees[1];
	    $scope.formData.introducees[1].geboortedatum 	= (typeof $scope.formData.introducees[1].geboortedatum==="undefined") ? "" : new Date($scope.formData.introducees[1].geboortedatum);
	    $scope.formData.introducees[2] 	= (typeof $scope.formData.introducees[2]==="undefined" || $scope.formData.introducees[2]===null) ? {"pwijzigen":"edit"} : $scope.formData.introducees[2];
	    $scope.formData.introducees[2].geboortedatum 	= (typeof $scope.formData.introducees[2].geboortedatum==="undefined") ? "" : new Date($scope.formData.introducees[2].geboortedatum);
	}
    
    $scope.initIntroducees();
     
    $scope.copyGegevens = function(checked, index){
	    //$scope.formData.introducees[index] = [];
	    //TODO omdraaien alleen de key in de velden
	    angular.forEach($scope.formData.reg, function(value, key) {
	    	if(key=="user_email" || key=="verzendemail" || key=="sendemail" ||  key=="email" || key=="email2" || key=="voornaam" || key=="tussenvoegsels" || key=="achternaam" || key=="betaald" || key=="extrapersonen" || key=="geboortedatum" || key=="geslacht" || key=="ID" || key=="user_login") return false;
	    
			$scope.formData.introducees[index][key] = (checked) ? value : "";
	    
	    
	    });
	}   

    /* KOPIEER PERSOONSGEGEVENS NAAR DE INTRODUCEES */
    $scope.setIntroduceData			= function(index){//"extrapersonen",
	    var copyfields = ["starttijd","vervoer", "slapen", "dorp", "soortovernachting", "slaapplek", "bagage", "nachtenslapen", "tentcaravancamper", "opstapplek"];
		
		angular.forEach($scope.formData.reg, function(value, key) {
		  if(copyfields.indexOf(key) > -1 && value!=""){
		  $scope.formData.introducees[index][key] = value;
		  }		  
		});
    }
    

 
    $scope.setError = function(message){	    
	    $scope.errors 			= 1;		
		$scope.errormessage		= message;
		
		setTimeout(function(){
			 $scope.errors 			= 0;
			 $scope.errormessage	= "";
		}, 5000);
	 }	
	 
	   	       
    $scope.showPrice = function(){
	   	//TODO ITERATE TROUGHT THE OBJECT AND CHECK IF THE VALUES ARE NOT NULL
	   // 
	    $scope.formData.extrapersonen	= parseInt($scope.formData.reg.extrapersonen)
	   	$scope.totaaltickets 			= $scope.formData.kaarten * $scope.ticketprice	    
	    //$scope.aantaltshirts			= Object.keys($scope.formData.shirts).length;
	    $scope.totaaltshirts			= ($scope.formData.aantaltshirts > 0) ? $scope.formData.aantaltshirts * $scope.tshirtprice : 0;
	    $scope.totaalhoodies			= ($scope.formData.aantalhoodies > 0) ? $scope.formData.aantalhoodies * $scope.hoodieprice : 0;
	    $scope.verzendkostent			= ($scope.formData.aantaltshirts > 0 || $scope.formData.aantalhoodies > 0) ? $scope.verzendkosten	: 0;
	    
	    $scope.extrapersonen			= ($scope.formData.extrapersonen > 0) ? $scope.formData.extrapersonen : 0;
	    
	    $scope.totaalovernacht			= $scope.overnachting * $scope.extrapersonen;
		$scope.formData.totaalbedrag 	= ($scope.totaalovernacht + $scope.totaaltickets + $scope.totaaltshirts + $scope.totaalhoodies + $scope.verzendkostent).toFixed(2);
	    //quick and dirty
	    $scope.formData.totaaltickets	= $scope.totaaltickets;
	    $scope.formData.totaaltshirts	= $scope.totaaltshirts;
	    $scope.formData.totaalhoodies	= $scope.totaalhoodies;
	    $scope.formData.verzendkosten	= $scope.verzendkostent;
	    $scope.formData.totaalovernacht	= $scope.totaalovernacht;
	     
	     
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
					
					if(template!=template1){//als het niet om de betreffende template gaat
						$scope.states[i][template1] = "view";
					}else if(i!=index){ //als het niet om de betreffende introducee gaat
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
    
	
   
    $scope.sendInlog = function(){
	    
	    $scope.buttondisabled 	= true;
	    $http({
		    method: 'POST',
		    url :'https://www.slachtemarathon.nl/api/freon/sendInlog',
		    data: $.param({"email":$scope.formData.emailfreon, "taal":"nl_NL"}),
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
				 
				if(typeof response.data.betaald!="undefined" && response.data.betaald > 1504628362){
					//stappen uit het proces halen?
					$uiRouter.stateRegistry.deregister("form.aantalkaarten");
					$uiRouter.stateRegistry.deregister("form.persoonlijke-gegevens");
					$uiRouter.stateRegistry.deregister("form.starttijd");
					$uiRouter.stateRegistry.deregister("form.vervoer");
					$uiRouter.stateRegistry.deregister("form.slapen");
					$uiRouter.stateRegistry.deregister("form.kleding");
					$uiRouter.stateRegistry.deregister("form.betalen");	
					
					//sla dit op in een cookie voor de reload.
					$cookies.put('betaald', "1", {"secure":true});
					$scope.betaald	= 1;
					//$cookies.put('loggedin', "1");/
					$scope.loggedin = 1;
					
				}else{
					$cookies.put('betaald', "0", {"secure":true});
					$scope.betaald	= 0;
					
				}
				
				$scope.parseData(response.data);
				
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
	    	
	  	});
	
	} 	
	$scope.reminder=0;
	$scope.setReminder = function(val){
		$scope.reminder = val;
	}
	
	$scope.parseData = function(data){
		
		if(data.reg.geboortedatum!=""){
			data.reg.geboortedatum 	= new Date(data.reg.geboortedatum); //$filter('date')(new Date(data.reg.geboortedatum), 'dd-MM-yyyy');
		}
		/*
		if($scope.betaald){
		if(data.reg.shirts!="" && angular.fromJson(data.reg.shirts) !== null){
			data.shirts 			= angular.fromJson(data.reg.shirts)
			data.aantaltshirts		= data.shirts.length;
		}
		
		if(data.reg.hoodies!="" && angular.fromJson(data.reg.hoodies) !== null){
			data.hoodies	 		= angular.fromJson(data.reg.hoodies);
			data.aantalhoodies		= data.hoodies.length;
		}
		}
		*/
		delete data.reg.shirts	
		delete data.reg.hoodies	
		data.reg.email			= data.reg.user_email;
		data.reg.email2			= data.reg.user_email;
		data.user				= data.reg.user_login;
		//data.password			= data.reg.user_login;
		
		/*if(typeof data.reg.taal!=="undefined" && data.reg.taal!=""){
			window.localStorage.taal = data.reg.taal;
		}*/
		//delete data.status;
		//delete data.reg.user_email;
		
		//$scope.formData.user 				= data.reg.user_login;
		//$scope.formData.password			= "testpersoon1234";//WEG BIJ LIVE
		
		$scope.formData = data;
		
		
		//AFHANKELIJK VAN KEUZE WEL/NIET INLOGGEN MEELOPER
		
		//if($scope.formData.introducees.length==0){
			$scope.initIntroducees();
		//}
		
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
				
				//delete cookies hier
				
					$cookies.remove('betaald');
					$cookies.remove('formData');
					$cookies.remove('paymentID');
					$cookies.remove('orderID');
					$cookies.remove('meelopers');
					window.localStorage.clear();
				/**/	
			}, function errorCallback(response) {
		    	if(response.status==-1){
		    		//$cookies.getObject('formData');
		    		$scope.setError("Helaas is er even iets mis met het updaten van de betaalstatus, neem contact op met de organisatie en vermeld betalingsID ".$scope.formData.paymentID); 
	    		}
		  	});
	   	 }
   	 
   	 }
	
	
	$scope.formData.opslaan = false;
	$scope.voorkeurenOpslaan = function() {
		//TODO: geboortedatum aanpasen
		$scope.formData.aanpassen = 1;
		$http({
		    method: 'POST',
		    url :'https://www.slachtemarathon.nl/api/freon/update',
		    data: $.param($scope.formData),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	
	    	if(response.data.status==="ok"){
		    	$cookies.putObject('betalingsinfo', {"userID":$scope.formData.reg.ID,"voornaam":$scope.formData.reg.voornaam,"achternaam":$scope.formData.reg.achternaam, "totaalbedrag": $scope.formData.totaalbedrag, "kaarten":$scope.formData.kaarten}, {"secure":true});				
				$scope.alert("gegevens opgeslagen, je wordt nu teruggestuurd naaar inloggen");
				$state.go("form.inloggen");
	    	}else{
		    	//console.error(response);//TODO foutmelding tbv api controller
	    	}
	  	}, function errorCallback(response) {
	    	$scope.setError($scope.errortxt);
	    	console.error(response);//hier een foutmelding
	  	});
	}
	
	$scope.setGeboortedata = function() {
		 $scope.formData.reg.geboortedatum = ($scope.formData.reg.geboortedatum!="") ? $filter('date')(new Date($scope.formData.reg.geboortedatum), 'yyyy-MM-dd 00:00:00') : $scope.formData.reg.geboortedatum;
		 
		 angular.forEach($scope.formData.introducees, function(introducee, key) {
		 	if(introducee.user_email!="" && introducee.geboortedatum!=""){
			
			introducee.geboortedatum = (new Date(introducee.geboortedatum).getTime()==0) ? "" : $filter('date')(new Date(introducee.geboortedatum), 'yyyy-MM-dd 00:00:00')  	
		 	}
		 });	 
	}	
	
	$scope.formData.opslaan = false;
	// function to process the form
    $scope.processForm = function() {
       window.localStorage.formData = JSON.stringify($scope.formData);
	   $scope.setGeboortedata();
       
       window.localStorage.formData = JSON.stringify($scope.formData);
       //$cookies.putObject('formData', $scope.formData, {"secure":true}); 	   	
       $scope.formData.opslaan = false;
       $http({
		    method: 'POST',
		    url :'https://www.slachtemarathon.nl/api/freon/update',
		    data: $.param($scope.formData),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
	    	
	    	if(response.data.status==="ok"){
		    	$cookies.putObject('betalingsinfo', {"userID":$scope.formData.reg.ID,"voornaam":$scope.formData.reg.voornaam,"achternaam":$scope.formData.reg.achternaam, "totaalbedrag": $scope.formData.totaalbedrag, "kaarten":$scope.formData.kaarten}, {"secure":true});				
				document.location.href='betalen.php'; 
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
		
				}, function errorCallback(response) {							    	
				//console.error(response);
							    	
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
		 
		 var passed	 = 1;
		 var i = 0;
		 angular.forEach(formsteps, function(stap, key) {
		 	 if (stap.name.match(/(form.betalensimulatie)/i)) return false;//KANWEG
		 	 if (stap.name.match(/(form.)/i)) {
		 	 	 var parts 		= stap.name.split("form.");
		 	 	 
		 	 	 var nicename	= parts[1];
		 	 	 nicename		= nicename.replace("-", " ");
		 	 	 stap.title 	= nicename;
		 	 	 stap.active	= $state.current.name===stap.name;
		 	 	 
		 	 	 $scope.stap 	= (stap.active) ? i : $scope.stap;
		 	 	 passed			= ($state.current.name===stap.name) ? 0 : passed;
		 	 	 stap.passed	= passed;
		 	 	 stap.stap		= key;
		 	 	 this.push(stap);
		 	 	 i++;
		 	 }	 	 
		}, stappen);     
		
			$scope.stappen = stappen;    

		
		
    };	
    
    $scope.menu(); 

    $http({
		method: 'GET',
		url : 'https://www.slachtemarathon.nl/lightapi/basisinfo/nl_NL'
		
	}).then(function successCallback(response) {
		
		$scope.inschrijving_status 	= response.data.inschrijving_status;
		$scope.dorpen 				= response.data.dorpen;
		$scope.Trainingsshirt		= response.data.Trainingsshirt;
		$scope.Hoodie				= response.data.Hoodie;
		$scope.starttijden 			= response.data.starttijden;
		}, function errorCallback(response) {
    		if(response.status == -1){
	    		$scope.setError("Helaas is er even iets mis met het systeem, probeer het zo nog even");
    		}
     });
   
})
.controller('welkomController', function($scope, $http, $cookies) {
	
	$http({
		method: 'GET',
		url: 'https://www.slachtemarathon.nl/lightapi/status/'
	}).then(function successCallback(response) {
		delete response.data.status;
		$scope.inschrijving_status = response.data.inschrijving_status;
	}, function error(response) {
        $scope.setError($scope.errortxt);
    });
    
	//$cookies.remove('cookies');	
	$scope.cookieAgree 	= (typeof $cookies.get('cookies')==="undefined")? 0 : $cookies.get("cookies");
 	$scope.cookiea		= "Ga je akkoord met de Cookie instellingen?";
	
 	$scope.alert	= function(mes){
		
		alert(mes);
	}
	
	$scope.setError = function(message){	    
	    $scope.errors 			= 1;		
		$scope.errormessage		= message;
		
		setTimeout(function(){
			 $scope.errors 			= 0;
			 $scope.errormessage	= "";
		}, 5000);
	 }	
	 
 	$scope.cookieAgreement = function(lang) {
		 var expireDate = new Date();
		 expireDate.setDate(expireDate.getDate() + 1);
		 $cookies.put("cookies", 1, {'expires': expireDate});//, {"secure":true}
		 $scope.cookieAgree =1;	
	}
		
	$scope.setLanguage = function(lang) {
        document.location.href = "tickets.html";        
    };	
    /*
	    var imported = document.createElement('script');
var fileImport = 'angular-locale_' + selFormat + '.js';
imported.src = 'https://code.angularjs.org/1.2.10/i18n/' + fileImport;
document.head.appendChild(imported);
	   */ 
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
  