export default class Player {
    constructor(game){
        this.game = game;
        this.width = 48;
        this.height = 48;
        this.x = 0;
        this.y = 0;
    }
    update(){

    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}