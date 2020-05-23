export class Canvas {
    canvas;
    context;
    height;
    width;
    scale = 15;
    selectedNodeInfo = {
        id: -1,
        dy: 0,
        dx: 0
    };
    entireMoveInfo= {
        isEnabled: false,
        ly: 0,
        lx: 0
    };
    nodes = [];

    constructor(containerId) {
        this.canvas = document.getElementById(containerId);
        this.context = this.canvas.getContext('2d');
        this.resizeUpdate();


    }

    resizeUpdate() {
        this.width = window.innerWidth * (this.scale / 15);
        this.height = (window.innerHeight * (this.scale / 15));
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    addNode(node) {
        this.nodes.push(node);
        this.update();
    }

    addNodeWithDrag(node){
        this.nodes.push(node);
        this.update();

        let n = this.nodes;
        let id = n.length-1;
        this.selectedNodeInfo = {
            id : id,
            dy: n[id].height / 2,
            dx: n[id].width / 2
        };


    }

    update() {
        this.canvas.width = this.width;
        let n = this.nodes.length;
        let node;
        for (let i = 0; i < n; i++) {
            node = this.nodes[i];
            if (node.x + node.width > 0 || node.y + node.height > 0 || node.x < this.width || node.y < this.height){
                node.draw(this.context)
            }
        }

    }

    selectNode(event) {
        let pos = this.getMousePos(this.canvas, event);
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].isSelected(pos.x , pos.y)) {
                this.selectedNodeInfo.id = i;
                this.selectedNodeInfo.dx = pos.x - this.nodes[i].x;
                this.selectedNodeInfo.dy = pos.y - this.nodes[i].y;
                return
            }
        }
    }

    getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.floor(evt.clientX - rect.left),
            y: evt.clientY - rect.top
        };
    }

    moveSelectedNode(e) {
        let pos = this.getMousePos(this.canvas, e);

        if (this.entireMoveInfo.isEnabled){

            let dx = this.entireMoveInfo.lx - e.screenX;
            let dy = this.entireMoveInfo.ly - e.screenY;

            this.entireMoveInfo.lx = e.screenX;
            this.entireMoveInfo.ly = e.screenY;
            this.nodes.forEach(i => {
                i.moveX(dx);
                i.moveY(dy);
            });
            this.update();
            return
        }

        if (this.selectedNodeInfo.id !== -1) {
            this.nodes[this.selectedNodeInfo.id].moveTo(
                pos.x - this.selectedNodeInfo.dx,
                pos.y - this.selectedNodeInfo.dy);
            this.update();
        }
    }

    entireMove(e){
        this.entireMoveInfo.isEnabled = true;
        this.entireMoveInfo.lx = e.screenX;
        this.entireMoveInfo.ly = e.screenY;
    }

    deselectNode() {
        this.entireMoveInfo.isEnabled = false;
        this.selectedNodeInfo.id = -1
    }

    wheelListener(e) {
        // if (e.deltaY > 0 && this.scale < 30) {this.scale += 1} else if (this.scale > 5) {this.scale -= 1}

        this.resizeUpdate();
        this.update();
    }
}
