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
            Materialize.toast(word + ' is not valid.', 2000, 'red darken-4');
        }
        else {


          if(timeremaining!==0){
            if($scope.data.correct.indexOf(word) !== -1){

                Materialize.toast( 'Word already exists' , 2000);
            }else{

              console.log("Word found!");
              $scope.data.correct.push(word);
              Materialize.toast( word + ' is valid!' , 2000, 'teal');

              $("#enum").append(word+"<br>");
              score++;
              $("#scor").html("<br>"+ "Current Score: " + score);
            }
          }else{

            Materialize.toast( 'Please start a new game' , 2000);
          }

        }
    }

    $scope.buildPuzzle = function () {

      var a = $("#myContainer").val();
      console.log(a);
      var boards = puzzleCollection[a];
      var dimension = boards.n;
      var board = boards.puzzle;

      $scope.data.board = board;
      console.log(JSON.stringify(board));
      console.log("Puzzle dimension: " + dimension);
      var sol = null;
      sol = solvePuzzle(a);
      $scope.data.solutions = sol;

        $scope.data.correct.length = 0;
        //Insert algo here
        //Populate solution then push each word
        //      e.g. $scope.data.solutions.push(valid_word);
    }


}]);
