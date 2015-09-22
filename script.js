var app = angular.module('app', []);

app.controller('MainCtrl', function ($scope) {

    $scope.numsRow1 = [7, 8, 9];
    $scope.numsRow2 = [4, 5, 6];
    $scope.numsRow3 = [1, 2, 3];

    $scope.outputVal = 0;
    $scope.calcList = '';
    $scope.justPressedOperator = false;
    $scope.justPressedNumber = false;
    $scope.justPressedEquals = false;
    $scope.usedDot = false;
    $scope.equalsAlreadyPressed = false;
    $scope.clearAbbr = 'AC';

    function outputBlink() {
        $("#output-container").fadeOut(1).fadeIn(1);
    };

    function outputResize() {
        if ($scope.outputVal.toString().length > 40) {
            $('#output-container').css('font-size', '5px');
        } else if ($scope.outputVal.toString().length > 25) {
            $('#output-container').css('font-size', '0.4em');
        } else if ($scope.outputVal.toString().length > 18) {
            $('#output-container').css('font-size', '0.8em');
        } else if ($scope.outputVal.toString().length > 14) {
            $('#output-container').css('font-size', '1.0em');
        } else if ($scope.outputVal.toString().length > 10) {
            $('#output-container').css('font-size', '1.4em');
        } else if ($scope.outputVal.toString().length > 6) {
            $('#output-container').css('font-size', '2.0em');
        } else {
            $('#output-container').css('font-size', '2.9em');
        }
    };

    $scope.operator = function (op) {
        outputBlink();
        if (!$scope.justPressedOperator) {
            $scope.equalsAlreadyPressed = false;
            $scope.justPressedEquals = false;
            $scope.justPressedOperator = true;

            if ($scope.justPressedNumber) {
                $scope.calcList += op;
                console.log($scope.calcList);
            }
            $scope.usedDot = false;
        }
    };

    $scope.appendDot = function () {
        $scope.clearAbbr = 'C';
        if ($scope.usedDot === false) {
            $scope.outputVal += '.';
            $scope.calcList += '.';
        }
        $scope.usedDot = true;
    };

    $scope.append = function (val) {

        if ($scope.justPressedEquals) {
            $scope.clear();
            $scope.justPressedEquals = false;
        }
        if ($scope.outputVal.length <= 10 || $scope.outputVal.length === undefined || $scope.justPressedOperator) {
            outputResize();
            $scope.clearAbbr = 'C';
            $scope.justPressedNumber = true;
            $scope.equalsAlreadyPressed = false;

            // Append to calculation for math.js
            $scope.calcList += val;

            console.log($scope.calcList);
            // Show user on screen
            if ($scope.outputVal === 0) {
                $scope.outputVal = val;
                outputResize();
            } else if ($scope.justPressedOperator === false) {
                $scope.outputVal += val.toString();
                outputResize();
            } else if ($scope.justPressedOperator === true) {
                $scope.outputVal = val.toString();
                $scope.justPressedOperator = false;
                outputResize();
            }
        }
    };

    $scope.clear = function () {
        outputBlink();
        $scope.clearAbbr = 'AC';
        $scope.outputVal = 0;
        $scope.calcList = '';
        $scope.usedDot = false;
        $scope.justPressedNumber = false;
        $scope.justPressedOperator = false;
        console.log($scope.calcList);
        outputResize();
    };

    function isValid(equation) {
        var lastChar = equation[equation.length - 1];
        return (/[0-9]/.test(lastChar));
    };

    $scope.equals = function () {
        outputBlink();
        if (!$scope.equalsAlreadyPressed && isValid($scope.calcList)) {
            $scope.justPressedEquals = true;
            $scope.usedDot = true;
            //console.log(typeof $scope.calcList[$scope.calcList.length-1]);
            var lastChar = $scope.calcList[$scope.calcList.length - 1];
            if (!(/[0-9]/.test(lastChar))) {
                $scope.calcList = $scope.calcList.substr(0, $scope.calcList.length - 1);
            }
            $scope.outputVal = Math.round(math.eval($scope.calcList) * 1000) / 1000;
            outputResize();

            console.log($scope.outputVal);
            $scope.calcList = '(' + $scope.calcList + ')';
            $scope.equalsAlreadyPressed = true;
        }
    };
});