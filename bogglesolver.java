import java.io.*;

class BoggleSolver {
      static String[] dict = new String[200000];
      static Trie wordsFound = new Trie();
      static Trie dictionary = new Trie();
      static int nWords = 0;
      static int N = 0;
      public static void main(String[] args){

          Puzzle.initializePuzzle("input.txt");
          initializeDictionary();

        solve();
      }

      public static void initializeDictionary(){
        try{
            BufferedReader br = new BufferedReader(new FileReader("TWL06.txt"));

            try {
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();

                while (line != null) {

                    dict[nWords] = line;
                    dictionary.addWord(line);


                    nWords++;
                    line = br.readLine();
                }
            } finally {
                br.close();
            }
        }catch(Exception e){}
      }

      public static void solve(){
        for(int a=0; a<Puzzle.nPuzzles; a++){

            Puzzle temp = Puzzle.puzzleCollection[a];
            N = temp.n;
            N = N*N;

            int start, move;
            int []nopts =new  int [N+2];
            char [][] option = new char [N+2][N+2];
            int i,j,k;
            char candidate;

            move = start = 0;
            nopts[start] =1;


            while(nopts[start] > 0){
//System.out.println("Pasok1");
                if(nopts[move] > 0){

                    move++;
      //              System.out.println("Pasok2 "+move);
                    nopts[move]  = 0 ; //initialize move

                    //check for solution
                    char[] sol = new char[200];
                    for( i=1; i<move; i++){
                        sol[i-1] = option[i][nopts[i]];

                        String test = new String(sol);
                        //System.out.println(test);
                        if(dictionary.searchWord(test.trim()) == true){
                          if(wordsFound.searchWord(test.trim()) == false){
                            System.out.println(test.trim());
                            wordsFound.addWord(test.trim());
                          }

                        }
                    }

                    if(move == 1){
              //                System.out.println("Pasok3");
                              for(int c = 0; c<temp.n; c++){
                                for(int d = 0; d<temp.n; d++){
                                         candidate = temp.puzzle[c][d];

                                         k=0;
                                        int duplicate = 0;
                                        for(k=1; k<move; k++){
                                            if(option[k][nopts[k]] == candidate){
                                              duplicate = 1;
                                            }
                                        }
                                        if(duplicate == 0){
                                            nopts[move]++;
                                            option[move][nopts[move]] = candidate;
                                        }
                                }
                              }
                    }else{
//                      System.out.println("Pasok4");
                        int ref = nopts[move-1]-1;
                        int c = ref/temp.n;
                        int d = ref - (temp.n * a);

                        for (int e = 0; e<temp.n; e++){
                          for (int f = 0; f<temp.n; f++){
                              if(temp.puzzle[e][f] == option[move-1][nopts[move-1]]){
                                  c = e;
                                  d = f;
                              }
                          }
                        }

                        for (int e = c-1; e<(c+2); e++){
                          for (int f = d-1; f<(d+2); f++){
                            if(e >= temp.n || f >= temp.n || e<0 || f < 0){

                            }else{
                               candidate = temp.puzzle[e][f];
                               k=0;
                              int duplicate = 0;
                              for(k=1; k<move; k++){
                                  if(option[k][nopts[k]] == candidate){
                                    duplicate = 1;
                                  }
                              }
                              if(duplicate == 0){
                                  nopts[move]++;
                                  option[move][nopts[move]] = candidate;
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
    }
  }
}
