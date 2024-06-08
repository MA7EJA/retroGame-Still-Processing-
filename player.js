export class Player {
    constructor(game){
        this.game = game;
        this.width = 48;
        this.height = 48;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player')
    }
    update(){

    }
    draw(context){
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}