var contents;
var nWords = 0;
var nWordsFound = 0;
var N = 0;
var noWords = true;

var wordsFound = new Trie();
var dictionary = new Trie();
function solvePuzzle(a) {
  //  for(a=0; a<nPuzzles; a++){
        wordsFound = new Trie();
        var temp = puzzleCollection[a];
        temp.words = [];
        var words = temp.words;
        N = temp.n * temp.n;

        var start,move;
        var nopts = getArray(N+2);
        var option = get2DArray(N+2);
        var candidate;

        move = start = 0;
        nopts[start] = 1;

        while(nopts[start]>0){
            if(nopts[move] > 0){
                move++;
                nopts[move] = 0;
                sol = "";
                var continues = true;
                var tempie = dictionary;
                for(i=1; i<move; i++){
                    //console.log("pasok");
                      sol = sol.concat(option[i][nopts[i]].letter.trim());
                      //console.log(sol);
///*

                    if(tempie[option[i][nopts[i]].letter.trim()]){
                        tempie = tempie[option[i][nopts[i]].letter.trim()];
                    }else{
                        continues = false;
                        i = move;
                    }


                    if(continues == true && tempie.isLeaf && (wordsFound.get(sol.trim()) == false)){
                        words.push(sol.trim());
                        wordsFound.put(sol.trim());
                    }

//*/
                    /*
                    if(dictionary.get(sol.trim()) && (wordsFound.get(sol.trim()) == false)){
                        words.push(sol.trim());
                        wordsFound.put(sol.trim());
                    }
                    */

                }
                if(continues == true){
                    //populate
                    //console.log("pasok2");
                    if (move == 1){
                        for(i=0; i<temp.n; i++){
                            for(j=0; j<temp.n; j++){
                                nopts[move]++;
                                option[move][nopts[move]] = new Element();
                                option[move][nopts[move]].letter = temp.puzzle[i][j];
                                option[move][nopts[move]].xcoor = i;
                                option[move][nopts[move]].ycoor = j;

                            }
                        }
                    }else{
                        //console.log("pasok3");

                        var ref = option[move-1][nopts[move-1]];
                        var c = ref.xcoor;
                        var d = ref.ycoor;

                        for(i=c-1; i<(c+2); i++){
                            for(j=d-1; j<(d+2); j++){
                                var duplicate = false;
                                if(i >= temp.n || j >= temp.n || i<0 || j<0){
                                }else{
                                    for(k=1; k<move; k++){
                                        if(option[k][nopts[k]].xcoor == i && option[k][nopts[k]].ycoor == j){
                                            duplicate = true;
                                        }
                                    }
                                    if(duplicate == false){
                                        nopts[move]++;
                                        option[move][nopts[move]] = new Element();
                                        option[move][nopts[move]].letter = temp.puzzle[i][j];
                                        option[move][nopts[move]].xcoor = i;
                                        option[move][nopts[move]].ycoor = j;
                                    }
                                }
                            }
                        }
                    }
                }
            }else{
                move --;
                nopts[move] --;
            }
        }
        console.log(words);
      return words;
  //  }
}



function readSingleFile2(evt) {
//Retrieve the first (and only!) File from the FileList object
var f = evt.target.files[0];

if (f) {
  var r = new FileReader();
  r.onload = function(e) {
    var dict_buf =  e.target.result;
    var words = dict_buf.split("\n");
    //console.log(words);
    words.forEach(storeDict);
    alert("Loaded Dictionary");
  }
  r.readAsText(f);
} else {
  alert("Failed to load file");
}
}

function storeDict(item, index) {
  dictionary.put(item.trim());
}

function get2DArray(size) {
    size1 = size > 0 ? size : 0;
    var arr = [];

    while(size1--) {
        arr2= []
        size2 = size > 0 ? size : 0;
        while(size2--){
            arr2.push('0');
        }
        arr.push(arr2);
    }

    return arr;
}


function getArray(size) {
    size1 = size > 0 ? size : 0;
    var arr = [];

    while(size1--) {
        arr.push(0);
    }

    return arr;
}
