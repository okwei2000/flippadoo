var _baseUrl = "http://dev.tickittaskit.com/flippadoo/mobile/"
//var _baseUrl = "http://192.168.1.240:8080/flippadoo/mobile/"


ionicApp.controller('MainCtrl', function($scope,$rootScope) {
 
});    


ionicApp.controller('HomeTabCtrl', function($scope,$interval,$http,$state, $cordovaGeolocation,$cordovaDialogs,geoLocationService){
	var gpsAuto = localStorage.getItem("gpsAuto");
	 //alert(gpsAuto);
	 if (gpsAuto == 'true') {
		 //alert("on");
		  $scope.main.pushNotification = { checked: true }
		 }else{
			 $scope.main.pushNotification = { checked: false }
			 localStorage.removeItem("startDate"); 
             localStorage.removeItem("endDate"); 
			 }
			 if(localStorage.getItem("user")){
		      $scope.main.textValue = JSON.parse(localStorage.getItem("user")).emailId; 
		    }
	     geoLocationService.stop();
  //console.log('HomeTabCtrl');
  //$scope.main.pushNotification = { checked: false };
  var sD =  localStorage.getItem("startDate"); 
  var eD =  localStorage.getItem("endDate"); 
  var td =  new Date();
  var newStartdate = new Date(sD);
  var newEndDate = new Date(eD);
  
  var comparetd = new Date(td).getTime();
  var compareSd = new Date(newStartdate).getTime();
  var compareEd = new Date(newEndDate).getTime();
  console.log(comparetd);
  console.log(compareSd);
  console.log(compareEd);
  
  $scope.putAsafeApply = function(fn) {
		var status = this.$root.$$phase;
		if(status == '$apply' || status == '$digest') {
		   if(fn && (typeof(fn) === 'function')) {
		    fn();
		 }
		 } else {
		this.$apply(fn);
		}
 };

if (compareSd && compareEd){
			if((comparetd >= compareSd && comparetd <= compareEd)) {
                              console.log("open" + new Date());	  
							  $scope.main.pushNotification = { checked: true };
							  $cordovaGeolocation.getCurrentPosition().then(function(position) {
								         console.log("Your Locations ");
						                 console.log("Your latitude is " + position.coords.latitude);
										// Position here: position.coords.latitude, position.coords.longitude
										//$cordovaDialogs.prompt(position.coords.latitude);
								
								
								}, function(err) {
								  console.log(err);
								});  
           } 
 } else if (compareSd ){
 
    if ( comparetd >= compareSd ){
 
							  console.log("only Start Date " + new Date());	  
							  $scope.main.pushNotification = { checked: true };
							  $cordovaGeolocation.getCurrentPosition().then(function(position) {
						                 console.log("Your latitude is " + position.coords.latitude);
										// Position here: position.coords.latitude, position.coords.longitude
										//$cordovaDialogs.prompt(position.coords.latitude);
								
								
								}, function(err) {
								  console.log(err);
								});  
   }
 } else if(compareEd){
	 
	 if ( comparetd <= compareEd ){
 
							  console.log("only end Date" + new Date());	  
							  $scope.main.pushNotification = { checked: true };
							  $cordovaGeolocation.getCurrentPosition().then(function(position) {
						                 console.log("Your latitude is " + position.coords.latitude);
										// Position here: position.coords.latitude, position.coords.longitude
										//$cordovaDialogs.prompt(position.coords.latitude);
								
								
								}, function(err) {
								  console.log(err);
								});  
   }
	 
	
	
	
}


  
  
  $scope.pushNotificationChange = function() {
	  // localStorage.removeItem("startDate");
	  // localStorage.removeItem("endDate");
	   
  };

  
    $scope.login = function() {
		
	var flag = 0;
   	var sel = document.getElementById("apiselect");
    var emailId = document.getElementById("validateEmail").value;
	var textapiKeyValue = sel.options[sel.selectedIndex].text;	
	//alert(emailId);
   	 if(textapiKeyValue == ""){
   	 cordovaDialogs.alert("Please enter Api Key");
   	 	flag = 1;
   	 }
   	 else{
   	 	flag = 0;
   	 }
   	 if(emailId == ""){
   	 cordovaDialogs.alert("Please Enter Email Id");
   	 flag = 1;	
      }else{
        
        flag =0 ;
       }
      
   	 if(flag == 0){
	   var loginUrl = _baseUrl + "userService/" + textapiKeyValue +"/login" ;
	   var logindata =  {};
	       logindata['emailId'] = emailId;
	      // logindata['deviceId'] = "WhamiWhamai";
	       
	   	   console.log(JSON.stringify(logindata));
	      var  responsePromise = $http.post(loginUrl ,logindata,{ cache: false });


         responsePromise.success(function(data, status, headers, config) {
          console.log(JSON.stringify(data));
          
          var logindata = (JSON.stringify(data.user));
          //alert(logindata);
          if(data.status=='OK'){
			localStorage.setItem("user",logindata); 
			localStorage.setItem("gpsAuto",$scope.main.pushNotification.checked);
            $state.transitionTo('tabs.facts2');
            if($scope.main.pushNotification.checked){
				//alert("called");
				//var TimeInterval = localStorage.getItem("timeInterVal");
				//alert(TimeInterval);
            	//geoLocationService.start( TimeInterval );
            }
            //$cordovaDialogs.alert("Received JSON Data" + ":" + logindata);
	      }else{
	      $cordovaDialogs.alert("Invalid Credentials");
		     }
	   })
	   
	   responsePromise.error(function(data, status, headers, config) {
	   	console.log(JSON.stringify(data));
	   	$cordovaDialogs.alert("Server Error");
	        
	   })
	  } 
   }
	
	
  
 });

function validateEmail(email){
                var patt1 = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
                var res = patt1.test(email);
                return res;
        }

 

