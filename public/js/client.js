var app = angular.module('myApp', ['btford.socket-io']).
    factory('mySocket', function (socketFactory) {
        return socketFactory();
    }).
	controller('ArduController', function ($scope,mySocket) {
		$scope.ledPins = [
			{number:0, status:false, color: 'red'},
			{number:1, status:false, color: 'red' },
			{number:2, status:false, color: 'red'},
			{number:3, status:false, color: 'yellowgreen'},
			{number:4, status:false, color: 'yellowgreen'},
			{number:5, status:false, color: 'green'},
			{number:6, status:false, color: 'green'},
			{number:7, status:false, color: 'green'}
			];

			angular.forEach($scope.ledPins, function(pin){
				console.log(pin);
			});

		$scope.ledOn = function (p) {
 			p.status=true;
	        mySocket.emit('led:on',p);
	        console.log('Led '+ p.number + ' is on');
	    };
    
	    
	    $scope.ledOff = function (p) {
	    	p.status=false;
	        mySocket.emit('led:off',p);
	        console.log('Led '+ p.number + ' is off');  
	    };    
});
