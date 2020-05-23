class NodeTitle {
    width = 0;
    x = 0;
    y = 0;
    constructor(x, y, width) {
        this.width = width;
        this.x = x;
        this.y = y;
    }
}
class NodePoint {
    x = 0;
    y = 0;
    r = 4.1;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export class Node {
    x = 100;
    y = 100;
    height = 0;
    width = 100;
    headerHeight = 30;
    itemHeight = 30;

    name = '';
    body =  '';
    output = [];
    input = [];

    points = [];
    titles = [];

    color = '#929093';

    titlePadding = 10 + 10;

    init() {
        this.height += this.headerHeight;
        let outputLength = this.output.length;
        let item;
        for (let i = 0; i < outputLength; i++) {

            item = this.output[i];
            this.points.push(new NodePoint(
                 this.width,
                 this.headerHeight + this.itemHeight * (i + 1) - (this.itemHeight / 2)));
        }
        let inputLength = this.input.length;
        for (let i = 0; i < inputLength; i++) {
           this.points.push(new NodePoint(
                0,
                this.headerHeight + this.itemHeight * (i + 1) - (this.itemHeight / 2)));
        }
        this.heightMultiplier = Math.max(this.output.length, this.input.length);
        return this;
    }

    draw(context) {

        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.width, this.height);
        context.fill();
        context.fillStyle = '#000';
        context.font = "15px Arial";
        context.fillText(this.name, this.x + 10 , this.y + this.titlePadding);
        context.beginPath();
        context.fillStyle = '#000';
        context.rect(
            this.x,
            this.y + this.headerHeight,
            this.width,
            this.itemHeight * this.heightMultiplier
        );
        context.fill();
        let item;
        let pointLength = this.points.length;
        for (let i = 0; i < pointLength; i++) {
            item = this.points[i];
            context.beginPath();
            context.fillStyle = '#ffffff';
            context.arc(this.x + item.x, this.y + item.y, item.r, 0, 2 * Math.PI);
            context.fill();
        }
    }

    moveX(x){
        this.x -= x
    }

    moveY(y){
        this.y -= y
    }

    moveTo(x, y){
        this.x = x;
        this.y = y;
    }

    isSelected(x, y) {
        return x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.headerHeight
    }
}


