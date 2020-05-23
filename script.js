import {Node} from "./js/Node.js";
import {Canvas} from "./js/Canvas.js";
import {Shortcut} from "./js/Shortcut.js";
import {Finder} from "./js/Finder.js";


let s = new Shortcut();
let c = new Canvas("main");
c.update();

let f = new Finder('finder', node => {
    let n = new Node();
    Object.assign(n, node);
    c.addNodeWithDrag(n.init(c.context));
    f.hide();
});

document.onkeyup = function(e) {
    s.keyUp(e)
};

s.ctrlAlt['a'] = function(){
    f.toggle()
};

window.onresize = function (e) {
    c.resizeUpdate(e);
    c.update()
};

c.canvas.onmousedown = function(e){
    if (e.button === 0){
        c.selectNode(e)
    }else if (e.button === 1){
        c.entireMove(e);
    }
};

c.canvas.onmousemove = function(e){
    c.moveSelectedNode(e)
};

c.canvas.onmouseup = function(e){
    c.deselectNode();
};

window.addEventListener("wheel", function (e) {
    c.wheelListener(e)
});

document.getElementById('open_add_menu').addEventListener('click', e => {
    f.show();
});
document.getElementById('close_add_menu').addEventListener('click', e => {
    f.hide();
});
