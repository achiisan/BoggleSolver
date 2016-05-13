import  java.io.*;
import java.nio.*;


class Puzzle {
  static int nPuzzles = 0;
  static Puzzle[] puzzleCollection;
  int n;
  char[][] puzzle;

    public Puzzle(){

    }
    public static void initializePuzzle(String filename){
      try{
        BufferedReader br = new BufferedReader(new FileReader(filename));
        try {
        StringBuilder sb = new StringBuilder();
        String line = br.readLine();
        //get total number of puzzles
        nPuzzles = Integer.parseInt(line);
        puzzleCollection = new Puzzle[nPuzzles];

        for (int i=0; i<nPuzzles; i++){
            Puzzle temp = new Puzzle();
             line = br.readLine();
            temp.n = Integer.parseInt(line);
            temp.puzzle = new char[temp.n][temp.n];
            System.out.println(temp.n);
            int ntemp = temp.n * temp.n;
            String letters = "";
            for (int j=0; j<temp.n; j++){
                line = br.readLine();
                letters = letters+line;
            }
            System.out.println(letters);
            char[] letbuf = letters.toCharArray();
            int counter = 0;
            for(int j=0; j<ntemp; j++){
                int xcoor = j/temp.n;
                temp.puzzle[xcoor][counter] = letbuf[j];
                System.out.println(xcoor+" "+counter+"->"+temp.puzzle[xcoor][counter]);
                if(counter >=(temp.n)-1){
                  counter = 0;
                }else{
                  counter++;
                }
            }
            puzzleCollection[i] = temp;
        }

        } finally {
        br.close();
        }
      }catch(Exception e){}

    }
}
