ionicApp.service('geoLocationService', ['$interval', '$cordovaDialogs', '$cordovaGeolocation', '$http', function ($interval,$cordovaDialogs,$cordovaGeolocation,$http) {
	    'use strict';
	    var watchId;
	
	    return {
	      start: function ( TimeInterval ) {
	      	console.log("started");
	        watchId = $interval(function () {
	          //alert(TimeInterval);
	          $cordovaGeolocation.getCurrentPosition().then(function(position) {
									 console.log("Your latitude is " + position.coords.latitude);
									 console.log("Your latitude is " + position.coords.longitude);
									// Position here: position.coords.latitude, position.coords.longitude
									var latitude =  position.coords.latitude;
									var longitude = position.coords.longitude;
									var userId = JSON.parse(localStorage.getItem("user")).userId;						
									var textapiKeyValue = JSON.parse(localStorage.getItem("user")).apiKey;
									var manualTickitUrl = _baseUrl + "tickitService/" + textapiKeyValue +"/createTickit" ;
									
									var form = new FormData();
									
							           form.append('ownerId' , userId);
							           form.append('tickitStatus' , "7");
							           form.append('tickitType' , "11");
							           form.append('recipient' , "chris@abc.com");
							           form.append('subject' , "Create ticket");
							           form.append('ip' , "192.168.1.217");
							           form.append('gps' , latitude + ";" + longitude);
							             $.ajax({
													url: manualTickitUrl,
													data: form,
													dataType: 'text',
													processData: false,
													contentType: false,
													type: 'POST',
													success: function(data){
													console.log(JSON.stringify(data));
													},
													error:function(data){
														console.log(JSON.stringify(data));
														}
												  });
								
								}, function(err) {
								  console.log(err);
								});  

	        }, TimeInterval);
	      },
	      stop: function () {
	      	console.log("stoped");
	        if (watchId) {
	          $interval.cancel(watchId);
	        }
	      }
	    };
	  }]);

 
