'use strict';

var project = angular.module('project', []);
var score = 0;

project.controller('projectController', ['$scope', function ($scope) {
    $scope.data = {};
    $scope.data.dimension = "3";
    $scope.data.word = "";
    $scope.data.board = null;
    $scope.data.solutions = ["PUT" , "WORDS" , "HERE"];
    $scope.data.correct = [];

    var generateBoard = function (dimension) {
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var board = [];

        for (var i = 0; i < dimension; i++) {
            var row = [];
            for (var j = 0; j < dimension; j++) {
                row.push(letters.charAt(Math.floor(Math.random()*letters.length)))
            }
            board.push(row);
        }
        return board;
    }

    $scope.checkWord = function () {
        var word = $scope.data.word.toUpperCase();
        var index = $.inArray(word, $scope.data.solutions);

        if (index < 0) {
            console.log("Word not found!");
            Materialize.toast(word +'  is not valid.', 2000, 'red darken-4');
        }
        else {
            
            console.log("Word found!");
            Materialize.toast( word +' " is valid!', 2000, 'teal');
            $scope.data.correct.push(word);
            $("#enum").append(word+"<br>");
            score++;

            $("#scor").html("<br>"+ "Current Score: " + score);
        }
    }

    $scope.buildPuzzle = function () {
        var dimension = $scope.data.dimension;
        var board = generateBoard(dimension);

        $scope.data.board = board;
        console.log(JSON.stringify(board));
        console.log("Puzzle dimension: " + dimension);

        //Insert algo here
        //Populate solution then push each word
        //      e.g. $scope.data.solutions.push(valid_word);
    }

}]);
