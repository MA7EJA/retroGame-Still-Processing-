export class ui{
    constructor(game, player){
        this.game = game;
        this.player = player;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.font = this.fontSize + "px" + this.fontFamily;
        context.textAlight = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Lives: ' + this.player.lives, 20, 50);
    }
}