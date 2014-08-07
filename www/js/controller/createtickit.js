ionicApp.controller('createTickitCtrl', function($scope,$interval,$http,$state, $cordovaGeolocation,$cordovaDialogs,$cordovaCamera) {
$scope.setup1 = function(){
	//alert("clicked");
 $state.transitionTo('tabs.home');
}
$scope.profileData = JSON.parse(localStorage.getItem("user"));
$scope.imageAvailable = false;
$scope.takePicture = function() {
//	alert("take it");
    var options = { 
        quality : 15, 
        destinationType : Camera.DestinationType.FILE_URI, 
        sourceType : Camera.PictureSourceType.CAMERA, 
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
    };
   var imagep;
    $cordovaCamera.getPicture(options).then(function(imageData) {
       var image = document.getElementById('imagetaken');
       image.src = imageData;
       $scope.imageAvailable = true;
       imagep = imageData;
       
       $scope.sendImage = function(){

        $cordovaGeolocation.getCurrentPosition().then(function(position) {
                         console.log("Your Locations ");
                             console.log("Your latitude is " + position.coords.latitude);
                             var locationCord = position.coords.latitude + ";" + position.coords.longitude;
                             var options = new FileUploadOptions();
                                  options.fileKey="tickitFile";
                                  options.fileName=imageData.substr(imageData.lastIndexOf('/')+1);
                                 // options.fileName="Ashish";
                                  //options.mimeType = "multipart/form-data";
                                  options.contentType = "multipart/form-data";
                                  options.chunkedMode = false;
                                  options.mimeType="image/jpeg";
                                  options.httpMethod="POST";
                                  
                                  options.headers = {
                                            Connection: "close"
                                       };

                                  var userId = JSON.parse(localStorage.getItem("user")).userId;            
								  var msgBody = document.getElementById("msgbody").value;
                                  var textapiKeyValue = JSON.parse(localStorage.getItem("user")).apiKey;
                                 
                                  var manualTickitUrl = _baseUrl + "tickitService/" + textapiKeyValue +"/createTickit" ;
               // alert("yes");
                                  console.log(manualTickitUrl);

                                   var params = new Object();
                                                  params.ownerId = userId;
                                                  params.tickitStatus = 7;
                                                  params.tickitType = 11;
                                                  params.recipient = "chris@abc.com";
                                                  params.subject = "Create ticket";
                                                  params.ip = "192.168.1.217";
                                                  //params.tickitCustomId = "55555";
                                                  //params.parentId = "null";
                                                  params.msgBody = msgBody;
                                                  params.gps =  locationCord;
                                                  
                                                  //params.startDate = null;
                                                  //params.endDate = null;
                                                  
                              
                                   options.params =  params;


                                    console.log(JSON.stringify(options));

                                    var ft = new FileTransfer();
                                    ft.upload(imageData, manualTickitUrl, win, fail, options);
                                   
                                        
                                        }, function(err) {
                                          console.log(err);
                                        });  
                        	
	   
	                   }
            }, function(err) {
            // An error occured. Show a message to the user
          });
  }
  
  $scope.deleteImage = function(){
	      $scope.imageAvailable = false;  
	}
	
  function win(r) {
				
	          alert("success");
	           $state.transitionTo('tabs.facts2');    
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            console.log(r.response);
          //  getUploadedImage();
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log(JSON.stringify(error));
        }

});
 
