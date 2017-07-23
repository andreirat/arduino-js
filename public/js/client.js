var app = angular.module('myApp', ['btford.socket-io'])
	.factory('mySocket', function (socketFactory) {
	return socketFactory();
})

.controller('loginController', function ($scope) {
	console.log('login');
})
.controller('registerController', function ($scope) {
	console.log('login');
})

.controller('ArduController', function ($scope,mySocket) {

    $scope.servo1 = '';
    $scope.servo2 = '';

    $scope.servo1Change = function () {
        console.log($scope.servo1);
        mySocket.emit('servo:1', $scope.servo1);
    };
    $scope.servo2Change = function () {
        console.log($scope.servo2);
        mySocket.emit('servo:2', $scope.servo2);
    };

    $scope.sendData = function () {
        console.log($scope.servo1);
        console.log($scope.servo2);
        mySocket.emit('servo:data', $scope.servo1);

    };

    mySocket.on('hey', function (data) {
        console.log(data);
    });

});
