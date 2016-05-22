function Trie(key) {
  this.key = key;
  this.value;
  this.isLeaf = false;
  //children are merged with this object since collision is minimal
}

Trie.prototype.put = function (word, value) {

  var temp = this;
  var currLetter;
  temp.isLeaf = false;

  for (i = 0; i < word.length; i++) {
    currLetter = word[i];
    temp = temp[currLetter] || (temp[currLetter] = new Trie(currLetter));

    if(i == word.length - 1) temp.isLeaf = true;
  }

};

Trie.prototype.get = function (word) {
  var temp = this;
  var currLetter;
  var i;

  for (i = 0; i < word.length; i++) {
    currLetter = word[i];
    if(temp[currLetter]) temp = temp[currLetter]; //if letter exist, traverse
    else return false; //if dne, create new trie

    if(i == word.length - 1 && temp.isLeaf) return true;
  }

  return false;
};

var t = new Trie();
t.put("HEAD");


console.log(t.get("HEADER"));
console.log(t.get("HEAD"));
