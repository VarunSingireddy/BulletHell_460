class Hook extends Projectile {
    constructor(owner, scene, powerupFlags) {
        /*this.owner = owner;
        this.scene = scene;
        this.speed = 600;
        this.velocity = new Phaser.Math.Vector2(0,0);
        this.delete = false;*/
        super(owner, scene, powerupFlags);
        this.landed = false;
        this.atDest = false;
        this.enem; //will hold the enemy if it is needed later
        this.chains = [];
    } //constructor()

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.setVelocityTowardMouse();
    } //init()

    update(dt) //this is called in the gun.update, which is called by player.update after setting velocity
    {
        if (this.landed) {
            this.entity.body.setVelocity(0, 0);
            //hit wall
            if (this.enem == null) {
                console.log("hit wall");
                if (!this.atDest) this.movePlayer();
                else this.delete = true;
            } else //hit enemy
            {
                console.log("Hit enemy");
                if (!this.atDest) {
                    this.retractHook();
                    this.enem.hooked();
                } else this.delete = true;
            }
        }
        
        this.setChain();
        
        if (this.entity.x < 0 || this.entity.x > 1280 || this.entity.y < 0 || this.entity.y > 720) {
            this.landed = true;
            this.movePlayer();
        }
    } //update()

    onFire() {
        //doesn't 'need anything because no particle effects spawn with it
    } //onFire()

    onHit() //probably won't need this
    {
        this.landed = true;
        console.log("Hook onHit() called");
    } //onHit()

    onHit(e) {
        this.landed = true;
        this.enem = e;
    }

    onDie() //called in gun.updateProjectiles()
    {
        //this.movePlayer();//delete later
        this.owner = null;
        this.scene = null;
        //destroy the images of the non-null chains, then splice them
        for(let i = this.chains.length - 1; i > 0; --i)
        {
            this.chains[i].destroy();
        }
        this.chains.splice(0, this.chains.length);
        this.entity.destroy();
    } //onDie()
    
    
    setChain()//set the chain
    {
        let p = this.owner.owner;
        //10 = half of rope, 48 = half of hook
        let xTarget = 10 + 48 + this.entity.body.x - p.entity.body.x;
        let yTarget = 10 + 48 + this.entity.body.y - p.entity.body.y;
        let hyp = Math.sqrt(Math.pow(xTarget, 2) + Math.pow(yTarget, 2));
        
        let numChains = (hyp/20);
        if(!this.landed)
        {
            //add chains
            while(this.chains.length < numChains)
            {
                if(this.chains.length > 0)
                {
                    let c = this.scene.add.image(this.entity.x, this.entity.y, 'rope');
                    this.chains.push(c);
                }
                else//first chain is null
                {
                    this.chains.push(null);
                }
            }
        }
        else
        {
            //remove chains
            while(this.chains.length > numChains)
            {
                //destroy images first
                this.chains[1].destroy();
                this.chains.splice(1, 1);
            }
            //catch the null chain
            if(this.chains.length <= 1) this.chains.splice(0, this.chains.length);
        }
        
        //set chain positions
        let xHelp, yHelp;
        if (xTarget > 0) xHelp = 1;
        else xHelp = -1;
        if (yTarget > 0) yHelp = 1;
        else yHelp = -1;
        for(let i = 1; i < this.chains.length; ++i)
        {
            this.chains[i].x = p.entity.body.x + ((xTarget / this.chains.length) * i);
            this.chains[i].y = p.entity.body.y + ((yTarget / this.chains.length) * i);
        }
    }

    setVelocityTowardMouse() {
        this.angle = this.scene.angleToMouseRad(this.entity);
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);

        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);
        this.entity.angle = this.owner.entity.angle;
    } //setVelocityTowardMouse()


    movePlayer() {
        let p = this.owner.owner;
        let xTarget = this.entity.body.x - p.entity.body.x;
        let yTarget = this.entity.body.y - p.entity.body.y;
        let hyp = Math.sqrt(Math.pow(xTarget, 2) + Math.pow(yTarget, 2));
        //rotation
        if(yTarget > 0) this.entity.angle = 90 + (Math.acos(xTarget/hyp) * (180/Math.PI));
        else this.entity.angle = 90 - (Math.acos(xTarget/hyp) * (180/Math.PI));
        
        xTarget /= hyp;
        yTarget /= hyp;

        //if distance is close enough, can stop dragging player
        if (hyp < 100) this.atDest = true;

        let speed = 1000;
        this.owner.owner.entity.body.setVelocity(xTarget * speed, yTarget * speed);
        //this.owner.owner.entity.body.setVelocity(0, 0);
    }

    retractHook() {
        let p = this.owner.owner;
        let xTarget = this.entity.body.x - p.entity.body.x;
        let yTarget = this.entity.body.y - p.entity.body.y;
        let hyp = Math.sqrt(Math.pow(xTarget, 2) + Math.pow(yTarget, 2));
        //rotation
        if(yTarget > 0) this.entity.angle = 90 + (Math.acos(xTarget/hyp) * (180/Math.PI));
        else this.entity.angle = 90 - (Math.acos(xTarget/hyp) * (180/Math.PI));
        
        xTarget /= -hyp;
        yTarget /= -hyp;

        //if distance is close enough, can stop retracting hook
        if (hyp < 100) this.atDest = true;

        let speed = 1000;
        this.entity.body.setVelocity(xTarget * speed, yTarget * speed);
        //this.owner.owner.entity.body.setVelocity(0, 0);
    }
}
