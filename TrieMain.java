public class TrieMain {
	public static void main(String args[]){
		Trie parent = new Trie();
		parent.addWord("hello");
		parent.addWord("helan");
		System.out.println(parent.searchWord("hello"));
		System.out.println(parent.searchWord("helo"));
		System.out.println(parent.searchWord("hella"));
		System.out.println(parent.searchWord("helan"));
		System.out.println(parent.searchWord("hollo"));
	}
}
