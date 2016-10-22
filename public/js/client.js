var app = angular.module('myApp', ['btford.socket-io']).
    factory('mySocket', function (socketFactory) {
        return socketFactory();
    }).
	controller('ArduController', function ($scope,mySocket) {
		$scope.ledPins = [
			{number:0, status:false},
			{number:1, status:false},
			{number:2, status:false},
			{number:3, status:false},
			{number:4, status:false},
			{number:5, status:false},
			{number:6, status:false},
			{number:7, status:false}
			];

			angular.forEach($scope.ledPins, function(pin){
				console.log(pin);
			})

		$scope.ledOn = function (p) {
 			var emit = 'led'+p.number+':on';
 			p.status=true;
	        mySocket.emit(emit);
	        console.log('Led '+ p.number + ' is on');
	    };
    
	    
	    $scope.ledOff = function (p) {
	    	p.status=false;
	 		var emit = 'led'+p.number+':off';
	        mySocket.emit(emit); 
	        console.log('Led '+ p.number + ' is off');  
	    };    
});
