import {NodeTitle, NodePoint} from './Util.js';

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
    titleFont = 'lighter 12px Arial';
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
                this.headerHeight + this.itemHeight * (i + 1) - (this.itemHeight / 2), 'i'));

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
                this.headerHeight + this.itemHeight * (i + 1) - (this.itemHeight / 2),
                'o'));
        }

        this.heightMultiplier = Math.max(this.output.length, this.input.length);
        this.height = this.itemHeight * this.heightMultiplier;
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
            this.height
        );
        context.fill();
        let item;
        for (let i = 0; i < this.points.length; i++) {
            item = this.points[i];
            context.beginPath();
            context.fillStyle = '#ffffff';
            context.arc(this.x + item.x, this.y + item.y, item.r, 0, 2 * Math.PI);
            context.fill();
        }
        context.font = this.titleFont;
        context.fillStyle = this.titleColor;
        for (let i = 0; i < this.titles.length; i++) {
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

    isInBounds(x, y) {
        let r = 4;
        return x > this.x - r &&
            x < this.x + this.width + r &&
            y > this.y + this.headerHeight &&
            y < this.y + this.height + this.headerHeight
    }

    isPointSelected(x, y){
        let item = null;
        for (let i = 0; i < this.points.length; i++) {
            item = this.points[i];
            if (x > item.x + this.x - item.r  &&
                x < item.x + this.x - item.r + item.r * 2 &&
                y > item.y + this.y - item.r &&
                y < item.y + this.y - item.r + item.r * 2){
                return {item, i};
            }
        }
        return null;
    }
}
