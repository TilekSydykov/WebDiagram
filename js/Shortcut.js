export class Shortcut {
    ctrlAlt = {};
    ctrlShift = {};

    constructor() {
        document.onfocus
    }

    keyUp(e){
        let code = e.key.toLowerCase();
        if (e.ctrlKey && e.altKey){
            if (this.ctrlAlt[code]){
                this.ctrlAlt[code]()
            }
        }else if (e.ctrlKey && e.shiftKey){
            if (this.ctrlShift[code]){
                this.ctrlShift[code]()
            }
        }
    }
}
