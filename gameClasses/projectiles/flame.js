class Flame extends Projectile{
    
   constructor(owner, scene, powerupFlags) {
        super(owner, scene, powerupFlags);
        //this.owner = owner;
        //this.scene = scene;
        this.speed = 300;
        //this.velocity = new Phaser.Math.Vector2(0,0);
        //this.delete = false;
        //this.isLeftSplit = false;
        //this.isRightSplit = false;
        //this.splitAngleChange = 30.7;
        
    }//constructor()

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;

        this.setVelocityTowardMouse();
    } //init()

    update(dt) { //this is called in the gun update
        //this.entity.refreshBody();
        if (this.entity.x < 0 || this.entity.x > this.scene.width || this.entity.y < 0 || this.entity.y > this.scene.height) {
            this.delete = true;
        }
        if (this.entity.alpha == 0.01) this.delete = true;
    } //update()

    onFire() {
        this.scene.tweens.add({
            targets: this.entity,
            scaleX: 2,
            scaleY: 2,
            alpha: 0.01,
            duration: 1500,

        });

    } //onFire()

    onHit() {

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
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        this.angle = Math.atan2(dy, dx);
        
        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);
        
        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);
    }
      
    
    
    
    
    
    
    
    
    
    
    
}