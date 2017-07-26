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

    $scope.servo1 = 90;
    $scope.servo2 = 90;

    $scope.servo1Change = function () {
        mySocket.emit('servo:1', $scope.servo1);
    };
    $scope.servo2Change = function () {
        mySocket.emit('servo:2', $scope.servo2);
    };

    $scope.centerServo = function (servo) {
        servo===0?$scope.servo1=90:$scope.servo2=90;
        mySocket.emit('servo:center', servo);
    };
    $scope.minServo = function (servo) {
        servo===0?$scope.servo1=0:$scope.servo2=0;
        mySocket.emit('servo:min', servo);
    };
    $scope.maxServo = function (servo) {
        servo===0?$scope.servo1=180:$scope.servo2=180;
        mySocket.emit('servo:max', servo);
    }
});
