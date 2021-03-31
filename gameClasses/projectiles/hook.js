class Hook extends Projectile
{    
    constructor(owner,scene,powerupFlags)
    {
        /*this.owner = owner;
        this.scene = scene;
        this.speed = 600;
        this.velocity = new Phaser.Math.Vector2(0,0);
        this.delete = false;*/
        super(owner, scene, powerupFlags);
        this.landed = false;
        this.atDest = false;
        this.enem;//will hold the enemy if it is needed later
    }//constructor()
    
    init(entity)
    {
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.setVelocityTowardMouse();  
    }//init()
    
    update(dt)//this is called in the gun.update, which is called by player.update after setting velocity
    {
        if(this.landed)
        {
            this.entity.body.setVelocity(0, 0);
            //hit wall
            if(this.enem == null)
            {
                console.log("hit wall");
                if(!this.atDest) this.movePlayer();
                else this.delete = true;
            }
            else//hit enemy
            {
                console.log("Hit enemy");
                if(!this.atDest)
                {
                    this.retractHook();
                    this.enem.hooked();
                }
                else this.delete = true;
            }
        }
        
        if(this.entity.x < 0 || this.entity.x > 1280 || this.entity.y < 0 || this.entity.y > 720)
        {
            this.landed = true;
            this.movePlayer();
        }
    }//update()
    
    onFire()
    {
        //doesn't 'need anything because no particle effects spawn with it
    }//onFire()
    
    onHit()//probably won't need this
    {
        this.landed = true;
        console.log("Hook onHit() called");
    }//onHit()
    
    onHit(e)
    {
        this.landed = true;
        this.enem = e;
    }
    
    onDie()//called in gun.updateProjectiles()
    {
        //this.movePlayer();//delete later
        this.owner = null;
        this.scene = null;
        this.entity.destroy();
    }//onDie()
    
    setVelocityTowardMouse()
    {
        this.angle = this.scene.angleToMouseRad(this.entity);
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);
        
        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);
        this.entity.angle = this.owner.entity.angle;
    }//setVelocityTowardMouse()
    
    
    movePlayer()
    {
        let p = this.owner.owner;
        let xTarget = this.entity.body.x - p.entity.body.x;
        let yTarget = this.entity.body.y - p.entity.body.y;
        let hyp = Math.sqrt(Math.pow(xTarget, 2) + Math.pow(yTarget, 2));
        xTarget /= hyp;
        yTarget /= hyp;
        
        //if distance is close enough, can stop dragging player
        if(hyp < 100) this.atDest = true;
        
        let speed = 1000;
        this.owner.owner.entity.body.setVelocity(xTarget * speed, yTarget * speed);
        //this.owner.owner.entity.body.setVelocity(0, 0);
    }
    
    retractHook()
    {
        let p = this.owner.owner;
        let xTarget = this.entity.body.x - p.entity.body.x;
        let yTarget = this.entity.body.y - p.entity.body.y;
        let hyp = Math.sqrt(Math.pow(xTarget, 2) + Math.pow(yTarget, 2));
        xTarget /= -hyp;
        yTarget /= -hyp;
        
        //if distance is close enough, can stop retracting hook
        if(hyp < 100) this.atDest = true;
        
        let speed = 1000;
        this.entity.body.setVelocity(xTarget * speed, yTarget * speed);
        //this.owner.owner.entity.body.setVelocity(0, 0);
    }
}