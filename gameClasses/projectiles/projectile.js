class Projectile {

    constructor(owner, scene, powerupFlags) {
        this.owner = owner;
        this.scene = scene;
        this.speed = 600;
        this.velocity = new Phaser.Math.Vector2(0,0);
        this.delete = false;
        this.isLeftSplit = false;
        this.isRightSplit = false;
        this.splitAngleChange = 30.7;
        this.damage = 2.5;

    }//constructor()

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;

        this.setVelocityTowardMouse();
    } //init()

        update() { //this is called in the gun update
        if (this.entity.x < 0 || this.entity.x > 1280 || this.entity.y < 0 || this.entity.y > 720) {
            if (this.scene.player.powerupFlags.portal) {
                if (this.entity.x <= 0) {
                    this.entity.x = 1270;
                }
                else if (this.entity.x >= 1280) {
                    this.entity.x = 10;

                }
                else if (this.entity.y >= 720) {
                    this.entity.y = 10;
                  
                }
                else if (this.entity.y <= 0) {
                    this.entity.y = 710;
                }
                else this.delete = true;
                
            }
        }
        
    }  //update()

    onFire() {

    } //onFire()

    onHit() {
        if(!this.scene.player.powerupFlags.pierceShot) this.delete = true;
    } //onHit()

    onDie() {
        //this.entity = null;
        this.velocity = new Phaser.Math.Vector2(0, 0);
        this.owner = null;
        this.scene = null;
        this.entity.destroy();
    }//onDie()


    setVelocityTowardMouse() {

        this.angle = this.scene.angleToMouseRad(this.entity);
        if(this.isLeftSplit) this.angle += this.splitAngleChange;
        if(this.isRightSplit) this.angle += -this.splitAngleChange;
        
        
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);   
        
        this.entity.body.setVelocity(this.velocity.x,this.velocity.y);
        this.entity.angle = this.owner.entity.angle;
        
    }//setVelocityTowardMouse()
    
    setVelocityTowardTarget(target) {
        let dx = target.x - this.entity.x;
        let dy = target.y - this.entity.y;
        this.angle = Math.atan2(dy, dx);
        
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);
        
        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);
        this.entity.angle = this.angle;
    }
    
}