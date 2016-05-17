function Trie(key) {
  this.key = key;
  this.value;
  //children are merged with this object since collision is minimal
}

Trie.prototype.put = function (word, value) {

  var temp = this;
  var currLetter;
  var isLeaf = false;

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
t.put("hello");
t.put("helan");

console.log(t);


console.log(t.get("hela"));
console.log(t.get("helo"));
console.log(t.get("hella"));
console.log(t.get("helan"));
console.log(t.get("hollo"));
console.log(t.get("hello"));
console.log(t.get("hellox"));
console.log(t.get("helan"));