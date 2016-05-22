function Puzzle() {
    var n = length;
    var puzzle = [];
    var words = [];
}

function readSingleFile(evt) {
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      contents =  e.target.result;
      var buf = contents.split("\n");
      console.log(buf);
      nPuzzles = parseInt(buf[0],10);
      var index = 1;
      for(i=0; i<nPuzzles; i++){
          var tempPuzzle = new Puzzle();
          tempPuzzle.n = parseInt(buf[index],10);
          tempPuzzle.puzzle = [];
          index++;
          for(j=0; j<tempPuzzle.n; j++){

              var buf_letters = buf[index].split(" ");
              tempPuzzle.puzzle[j] = buf_letters;
              index++;
          }
          puzzleCollection.push(tempPuzzle);
      }
      selectboard();


    }
    r.readAsText(f);
  } else {
    alert("Failed to load file");
  }
}

var nPuzzles = 0;
var puzzleCollection = [];
