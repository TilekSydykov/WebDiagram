class NodeTitle {
    width = 0;
    x = 0;
    y = 0;
    txt;
    constructor(x, y, width, text) {
        this.width = width;
        this.x = x;
        this.y = y;
        this.txt = text;
    }
}

class NodePoint {
    x = 0;
    y = 0;
    r = 3.7;
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

    namePadding = 10 + 10;
    titleFont = '12px Arial';
    titleColor = '#fff';
    titleMargin = 10;

    init(ctx) {
        this.height += this.headerHeight;
        let outputLength = this.output.length;
        let item;
        let outputsMaxWidth = 10;
        let inputMaxWidth = 10;
        ctx.font = this.titleFont;
        let textMetrics;
        for (let i = 0; i < outputLength; i++) {
            item = this.output[i];

            textMetrics = ctx.measureText(item);
            if (outputsMaxWidth < textMetrics.width + 20){
                outputsMaxWidth = textMetrics.width + 20
            }
        }

        let inputLength = this.input.length;
        let title = '';
        for (let i = 0; i < inputLength; i++) {
            item = this.input[i];
            for (let prop in item){
                title = prop + ": " + item[prop];
            }
            textMetrics = ctx.measureText(title);
            this.titles.push(new NodeTitle(
                 this.titleMargin ,
                this.headerHeight + this.itemHeight * (i + 1) - (this.itemHeight / 2) + 3,
                textMetrics.width,
                title
            ));

            this.points.push(new NodePoint(
                0,
                this.headerHeight + this.itemHeight * (i + 1) - (this.itemHeight / 2)));

            if (inputMaxWidth < textMetrics.width + 20){
                inputMaxWidth = textMetrics.width + 20
            }
        }

        this.width = inputMaxWidth + outputsMaxWidth + 20;

        for (let i = 0; i < outputLength; i++) {
            item = this.output[i];

            textMetrics = ctx.measureText(item);
            this.titles.push(new NodeTitle(
                this.width - this.titleMargin - textMetrics.width,
                this.headerHeight + this.itemHeight * (i + 1) - (this.itemHeight / 2) + 3,
                textMetrics.width,
                item
            ));

            this.points.push(new NodePoint(
                this.width,
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
        context.fillText(this.name, this.x + 10 , this.y + this.namePadding);
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
        let length = this.points.length;
        for (let i = 0; i < length; i++) {
            item = this.points[i];
            context.beginPath();
            context.fillStyle = '#ffffff';
            context.arc(this.x + item.x, this.y + item.y, item.r, 0, 2 * Math.PI);
            context.fill();
        }
        length = this.titles.length;
        context.font = this.titleFont;
        context.fillStyle = this.titleColor;
        for (let i = 0; i < length; i++) {
            item = this.titles[i];
            context.fillText(item.txt, this.x + item.x , this.y + item.y);
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


