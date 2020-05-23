import {Lexer} from "./Lexer.js";

export class Finder {
    isHidden = true;
    updateNodesButton;
    updateNodesInput;
    nodeClickListener;

    constructor(id, nodeClickListener) {
        this.nodeClickListener = nodeClickListener;
        this.container = document.getElementById(id);
        this.container.style.display = 'none';
        this.updateNodesButton = document.getElementById('getNodes');
        this.updateNodesInput = document.getElementById('nodesSdk');
        let f = this.fetchNodes;
        this.updateNodesButton.addEventListener('click', function () {
            f();
        });
        this.fetchNodes();
    }

    fetchNodes(){
        let lexer = new Lexer();
        let container = document.getElementById('nodes_container');
        let url = this.updateNodesInput.value;
        let self = this;
        fetch(url).then(data => {
            data.text().then(e => {
                let nodes = lexer.fileToNode(e);
                nodes.forEach(i => {
                    let con = document.createElement('div');
                    con.setAttribute('class',  'finder_node');
                    con.innerHTML = i.name;
                    con.addEventListener('click',evn => {
                        this.nodeClickListener(i);
                        self.hide();
                    });
                    container.appendChild(con);
                })
            })
        })
    }

    hide() {
        let con = this.container;
        con.animate([
            {opacity: '1'},
            {opacity: '0'}
        ], {
            duration: 100
        });
        setTimeout(function () {
            con.style.display = 'none';
        }, 100)
    }

    show() {
        let con = this.container;
        con.style.display = 'block';
        con.animate([
            {opacity: '0'},
            {opacity: '1'}
        ], {
            duration: 100
        });
    }

    toggle() {
        if (this.isHidden) {
            this.show();
            this.isHidden = false;
        } else {
            this.hide();
            this.isHidden = true;
        }
    }

}
