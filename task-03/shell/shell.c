#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#define MAX_LENGTH 1024

void parse_input(char *input, char **args);
void execute_command(char **args);

int main() {
    char line[MAX_LENGTH];
    char *args[100];

    while (1) {
        printf("mysh> ");
        fflush(stdout);
        
        if (!fgets(line, MAX_LENGTH, stdin)) {
            break;
        }

        line[strcspn(line, "\n")] = 0; 
        
        if (strlen(line) == 0) {
            continue;
        }

        parse_input(line, args);

        if (strcmp(args[0], "exit") == 0) {
            break;
        } else if (strcmp(args[0], "cd") == 0) {
            if (args[1]) {
                if (chdir(args[1]) != 0) {
                    perror("cd failed");
                }
            } else {
                fprintf(stderr, "cd: missing argument\n");
            }
        } else if (strcmp(args[0], "pwd") == 0) {
            char cwd[MAX_LENGTH];
            if (getcwd(cwd, sizeof(cwd)) != NULL) {
                printf("%s\n", cwd);
            } else {
                perror("pwd failed");
            }
        } else {
            execute_command(args);
        }
    }
    return 0;
}

void parse_input(char *input, char **args) {
    char *token = strtok(input, " ");
    int i = 0;
    while (token != NULL) {
        args[i++] = token;
        token = strtok(NULL, " ");
    }
    args[i] = NULL;
}

void execute_command(char **args) {
    pid_t pid = fork();
    if (pid < 0) {
        perror("Fork failed");
    } else if (pid == 0) {
        if (execvp(args[0], args) < 0) {
            perror("Execution failed");
        }
        exit(EXIT_FAILURE);
    } else {
        wait(NULL);
    }
}

