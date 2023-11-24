import {Scoreboard} from "./componentes/Scoreboard.js";

export class Game extends Phaser.Scene{
    constructor(){
        super({key: 'game'})
    }
    init(){
        this.scoreboard = new Scoreboard(this);
    }
    platformImpact(){
        this.scoreboard.incrementPoints(1);

        let relativeImpact = this.ball.x - this.platform.x;
        if(relativeImpact < 0.1 && relativeImpact > -0.1){
            this.ball.setVelocityX(Phaser.Math.Between(-10,10))
        }else{
            this.ball.setVelocityX(10*relativeImpact);
        }
    }
    preload(){
        this.load.image('background','images/background.png');
        this.load.image('gameover','images/gameover.png');
        this.load.image('platform','images/platform.png');
        this.load.image('ball','images/ball.png');
    }
    create(){
        this.physics.world.setBoundsCollision(true,true,true,false);
        
        this.add.image(500,250,'background'),
        this.gameoverImg = this.add.image(500,250,'gameover')
        this.gameoverImg.visible = false;
        this.contador = null;
        this.platform = this.physics.add.image(400,460,'platform').setImmovable();
        this.platform.body.allowGravity=false;
        this.scoreboard.create();

        this.ball = this.physics.add.image(385,430,'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setData('glue',true);
        this.platform.body.setCollideWorldBounds(true,true,true,false);
        this.physics.add.collider(this.ball,this.platform,this.platformImpact, null,this);
        
        /*let velocity = 100 * Phaser.Math.Between(1.3,2);
        if(Phaser.Math.Between(0,10)>5){
            velocity = 0 -velocity;
        }
        this.ball.setVelocity(velocity,10);*/

        this.physics.add.collider(this.ball,this.platform);

        this.ball.setBounce(1);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        


       // this.platform.setVelocity(100,10);
    }
    update(){
        if(this.ball.y > 500){
            this.gameoverImg.visible=true;
            this.scene.pause();
        }
        if(this.cursors.up.isDown){
            this.ball.setVelocity(-75,-300);
            this.ball.setData('glue',false);
        }
        if(this.cursors.left.isDown){
            this.platform.setVelocityX(-500);
            if(this.ball.getData('glue')){
                this.ball.setVelocityX(-500);
            }
        }else if(this.cursors.right.isDown){
            this.platform.setVelocityX(500);
            if(this.ball.getData('glue')){
                this.ball.setVelocityX(500);
            }
        }else{
            this.platform.setVelocityX(0);
            if(this.ball.getData('glue')){
                this.ball.setVelocityX(0);
            }
            
        } ;
        if(this.ball.y > 500){
            /*console.log("fin de la partida...")
            this.gameoverImg.visible=true;
            this.scene.pause();*/
            this.platform.setVelocityX(0);
            this.ball.setVelocityX(0);
        }      
    }
    ejercutar(){
        console.log("ha chocado");
        this.ball.setVelocity(10,-800);
    }
   
}