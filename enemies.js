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

}

class SnakeEnemy extends Enemy{

}

class OctopusEnemy extends Enemy{
    
}