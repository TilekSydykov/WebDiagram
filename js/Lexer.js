import {Node} from "./Node.js";

export class Lexer {
    functionKeyWord = 'function';
    functionInputsStart = '(';
    functionInoutEnd = ')';
    inputTypeChar = ':';
    inputDivider = ',';
    functionBodyStart = '{';
    functionBodyEnd = '}';

    fileToNode(file){
        let arrayNodes = [];
        let tokens = this.tokenize(file);

        let isBegining = false;
        let openedCurlyBrakets = 0;

        let node = new Node();
        let isInputMode = false;

        for (let i = 0; i < tokens.length; i++){
            let func = tokens[i];

            if (func === this.functionKeyWord && openedCurlyBrakets === 0){
                isBegining = true;
                i++;
                node = new Node();
                node.name = tokens[i];
                openedCurlyBrakets = 0;
                continue;
            }
            if (isBegining){
                if (func === '('){
                    isInputMode = true;
                }
                if (func === ')') {
                    isInputMode = false;
                    if (tokens[i+1] === this.inputTypeChar){
                        node.output.push(tokens[i+2]);
                    }
                }
                if (isInputMode){
                    if (func === ':'){
                        let j = {};
                        j[tokens[i-1]] = tokens[i+1];
                        node.input.push(j);
                    }
                }

            }
            if (openedCurlyBrakets >= 1){
                node.body += func + ' ';
            }
            if (func === this.functionBodyStart){
                openedCurlyBrakets++;
                isBegining = false;
            }

            if (func === this.functionBodyEnd){
                openedCurlyBrakets--;
                arrayNodes.push(node);
            }
        }

        return arrayNodes
    }

    tokenize(text){
        let res = [];
        let token = '';
        for (let i = 0; i < text.length; i++){
            let char = text.charAt(i);

            let letters = /^[A-Za-z0-9]+$/;
            if (char.match(letters)){
                token += char;
            }else{
                if (char !== ' ' && char !== `
`){
                    if (token !== ''){
                        res.push(token);
                        token = '';
                    }
                    res.push(char);
                }else{
                    if (token !== ''){
                        res.push(token);
                        token = '';
                    }
                }
            }
        }
        return res
    }
}
