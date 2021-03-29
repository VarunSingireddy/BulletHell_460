class Projectile{
    
    constructor(owner,scene,powerupFlags){
        this.owner = owner;
        this.scene = scene;
        this.speed = 600;
        this.velocity = new Phaser.Math.Vector2(0,0);
        this.delete = false;
        this.isLeftSplit = false;
        this.isRightSplit = false;
        this.splitAngleChange = 30.7;
       // console.log(scene);d
        
        //this.
        
        
    }//constructor()
    
    init(entity){
        this.entity = entity;
        this.entity.body.allowGravity = false;
        
        this.setVelocityTowardMouse();  
    }//init()
    
    update(){//this is called in the gun update
        if(this.entity.x < 0 || this.entity.x > 800 || this.entity.y < 0 || this.entity.y > 600)
        {
            this.delete = true;
        }
    }//update()
    
    onFire(){
        
    }//onFire()
    
    onHit(){
        
    }//onHit()
    
    onDie(){
        //this.entity = null;
        this.owner = null;
        this.scene = null;
        this.entity.destroy();
    }//onDie()
    
    setVelocityTowardMouse(){
        this.angle = this.scene.angleToMouseRad(this.entity);
        if(this.isLeftSplit) this.angle += this.splitAngleChange;
        if(this.isRightSplit) this.angle += -this.splitAngleChange;
        
        
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);
        
        
        this.entity.body.setVelocity(this.velocity.x,this.velocity.y);
        
    }//setVelocityTowardMouse()
    
    setVelocityTowardTarget(target) {
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        this.angle = Math.atan2(dy, dx);
        
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);
        
        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);
    }
    
}