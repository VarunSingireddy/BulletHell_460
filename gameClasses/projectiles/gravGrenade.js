class GravGrenade extends Projectile {
    constructor(owner, scene, powerupFlags) {
        super(owner, scene, powerupFlags);
        
        
        this.lifeTimer = 3;
        this.radius = 50;

        
    } //constructor()

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.entity.body.allowDrag = true;
        this.entity.body.drag = new Phaser.Math.Vector2(500,500);

        this.setVelocityTwoardMouse();
    } //init()

    update(dt) { //this is called in the gun update
        super.update(dt);   
        this.lifeTimer -= dt;        
        if(this.lifeTimer <= 2) this.doGravity();
        if(this.lifeTimer < 0) this.delete = true;
        /*if (this.entity.x < 0 || this.entity.x > 800 || this.entity.y < 0 || this.entity.y > 600) {
            this.delete = true;
        }*/
    } //update()

    onFire() {

    } //onFire()

    onHit() {

    } //onHit()

    onDie() {
        //this.entity = null;
        this.owner = null;
        this.scene = null;
        this.entity.destroy();
    } //onDie()
    
    doGravity() {
        //do gravity stuff here
        //go through array of enemies
        //if they are within the radius of gravity, suck them to grav hole
    }

    setVelocityTwoardMouse() {
        this.angle = this.scene.angleToMouseRad(this.entity);

        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);


        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);

    } //setVelocityTwoardMouse()
}
