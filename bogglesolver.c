#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct puzzlestruct_str {
	int n;
	char ** puzzle;
}puzzlestruct;

FILE * fp;
int N = 3;
int nPuzzles = 0;
puzzlestruct ** puzzleCollection;

char * dict[200000];
char * words[20000];



void initializePuzzle(char * filename){
	fp = fopen(filename, "r");
	int i,j,k;

	fscanf(fp, "%d", &nPuzzles);

	puzzleCollection = (puzzlestruct **) malloc(sizeof(puzzlestruct *) * nPuzzles);


	for(i=0; i<nPuzzles; i++){
		puzzlestruct * s = malloc(sizeof(puzzlestruct));
		fscanf(fp, "%d\n", &(s->n));
		s->puzzle = (char **) malloc(sizeof(char) * s->n);
		printf("yey %d\n",s->n);
		int ntemp = s->n;
		ntemp = ntemp * ntemp;
		int counter = 0;
		for (j=0; j<ntemp; j++){
			s->puzzle[j] = (char *) malloc(sizeof(char) * s->n);
			char str[200];
			fscanf(fp,"%s",str);
			s->puzzle[j/s->n][counter] = str[0];
			printf("%d %d -> %c\n",j/s->n, counter, s->puzzle[j/s->n][counter]);
			if(counter >= (s->n)-1){
				counter = 0;
			}else{
				counter++;
			}
		}
		puzzleCollection[i] = s;
	}}


	for(i=0; i<nPuzzles; i++){
		puzzlestruct * temp = puzzleCollection[i];
		printf("PRINT PUZZLE\nPuzzle Size: %d \n",temp->n);
		for (j=0; j<temp->n; j++){

			for(k=0; k<temp->n; k++){
				printf("%c",temp->puzzle[j][k]);
			}
				printf("\n");
		}


	}
}

void initializeDictionary(){

	fp = fopen("TWL06.txt", "r");
	int index = 0;

	while(!feof(fp)){
		char * str = malloc(sizeof(char)* 200);

		fscanf(fp,"%s\n",str);
		printf("%s\n", str);
		dict[index] = str;
		index++;
	}
}

int main(){
	initializePuzzle("input.txt");
	initializeDictionary();
	int a = 0;
	for (a=0; a<nPuzzles; a++){
		fp = fopen("solution.txt", "w");
		puzzlestruct * temp = puzzleCollection[a];
		N = temp->n;
		N = N * N;

		int start, move;
		int nopts[N+2]; //array top of stacks
		char option[N+2][N+2]; //array stacks of options
		int i, candidate, j, k;

		move = start = 0;
		nopts[start]= 1;

		while (nopts[start] >0)
		{

			if(nopts[move]>0)
			{
				move++;
				nopts[move]=0; //initialize new move

				//print - solution found!

				char sol[200];
				char found[100][200];
				int foundcount = 0;
				int k=0;
				for(i=1;i<move;i++){
					sol[i-1] = option[i][nopts[i]];
					sol[i] = '\0';
					for(j=0; j<20000; j++){

						if(strcmp(sol, dict[j]) == 0){

								fprintf(fp, "%s\n", sol);

						}
					}
				}

				//populate

				if (move == 1){
					int a,b;
					for(a = 0; a<temp->n; a++){
						for(b = 0; b<temp->n; b++){
							char candidate = temp->puzzle[a][b];
							int k = 0;
							int duplicate = 0;
							for (k=1; k<move; k++){
								if(option[k][nopts[k]] == candidate){
									duplicate = 1;
								}
							}
							if (duplicate == 0){
								nopts[move]++;
								option[move][nopts[move]] = candidate;
							}
						}
					}
				}else{
					//printf("Reference letter %c\n", option[move-1][nopts[move-1]]);
					int ref = nopts[move-1] - 1;
					int a = ref / temp->n;
					int b = ref - (temp->n * a);
					int c,d;
					for(c=0; c<temp->n; c++){
						for(d=0; d<temp->n; d++){
							if(temp->puzzle[c][d] == option[move-1][nopts[move-1]]){
								a = c;
								b = d;
							}
						}
					}


					//printf("Start coordinates: %d %d\n", a,b);

					for (c = a-1;c<(a+2);c++){
						for(d = b-1;d<(b+2); d++){
							if(c >= temp->n || d >= temp->n || c<0 || d < 0){

							}else{
								//printf("Candidate: %c\n", temp->puzzle[c][d]);
								char candidate = temp->puzzle[c][d];
								int k = 0;
								int duplicate = 0;
								for (k=1; k<move; k++){
									if(option[k][nopts[k]] == candidate){
										duplicate = 1;
									}
								}
								if (duplicate == 0){
									nopts[move]++;
									option[move][nopts[move]] = candidate;
								}

							}
						}
					}
				}

			}
			else
			{
				//backtrack
				move--;
				nopts[move]--;
			}
		}
	}
	fclose(fp);

}
