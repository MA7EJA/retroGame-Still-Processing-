class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 15;
        this.frameINterval = 1000 / this.fps;
        this.frameTimer = 0;
    }
    update(){

    }
    draw(){

    }
}

class SpiderEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 48;
        this.height = 48;
        this.x = 200;
        this.y = 200;
        this.speedX = 2;
        this.maxFrame;
    }
}

class SnakeEnemy extends Enemy{

}

class OctopusEnemy extends Enemy{

}