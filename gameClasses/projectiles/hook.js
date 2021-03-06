class Hook extends Projectile
{    
    constructor(owner,scene,powerupFlags){
        /*this.owner = owner;
        this.scene = scene;
        this.speed = 600;
        this.velocity = new Phaser.Math.Vector2(0,0);
        this.delete = false;*/
        
        super(owner, scene, powerupFlags);
    }//constructor()
    
    init(entity){
        this.entity = entity;
        this.entity.body.allowGravity = false;
        
        this.setVelocityTwoardMouse();  
    }//init()
    
    update(dt){//this is called in the gun update
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
    
    setVelocityTwoardMouse(){
        this.angle = this.scene.angleToMouseRad(this.entity);
        
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);
        
        
        this.entity.body.setVelocity(this.velocity.x,this.velocity.y);
        
    }//setVelocityTwoardMouse()
}