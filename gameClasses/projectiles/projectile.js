


class Projectile{
    
    constructor(owner,scene,){
        this.owner = owner;
        this.scene = scene;
        this.speed = 600;
        this.velocity = new Phaser.Math.Vector2(0,0);
       // console.log(scene);d
        
        //this.
        
        
    }
    
    init(entity){
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.angle = this.scene.angleToMouseRad(this.entity);
        
       // console.log("angle: " + this.angle);
        //console.log("cos: " + Math.cos(this.angle));
        //console.log("cos scaled: " +  (this.speed * Math.cos(this.angle)));
        
        
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);
        
        
        this.entity.body.setVelocity(this.velocity.x,this.velocity.y);
        
    }
    
    update(){
        
    }
    
    onFire(){
        
    }
    
    onHit(){
        
    }
    
    onDie(){
        //this.entity = null;
        this.owner = null;
        this.scene = null;
        this.entity.destroy();
    }
    
    
    
    
}