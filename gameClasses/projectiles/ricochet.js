class Ricochet extends Projectile {
    constructor(owner, scene, powerupFlags, bounceTimes, changedVelocity) {
        super(owner, scene, powerupFlags);
        this.speed = 1200;
        this.bounceTimes = bounceTimes;
        this.doOnce = true;
        this.owner = owner;
        this.changedVelocity = changedVelocity;
    } //constructor()

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;
        if (this.bounceTimes > 0) {
            this.velocity = this.changedVelocity;
            this.entity.body.setVelocity(this.changedVelocity.x, this.changedVelocity.y);
        } else {
            this.setVelocityTowardMouse();
        }
    } //init()

    update() { //this is called in the gun update
        if (this.entity.x <= 0 && this.bounceTimes < 4) {
            this.bounceTimes++;
            this.owner.fire(true);
            this.owner.changedVelocity = new Phaser.Math.Vector2(-this.velocity.x, this.velocity.y);
            this.owner.bounceTimes = this.bounceTimes;
        } else if (this.entity.x >= this.scene.width && this.bounceTimes < 4) {
            this.bounceTimes++;
            this.owner.fire(true);
            this.owner.changedVelocity = new Phaser.Math.Vector2(this.velocity.x, this.velocity.y);
            this.owner.bounceTimes = this.bounceTimes;
        } else if (this.entity.y <= 0 && this.bounceTimes < 4) {
            this.bounceTimes++;
            this.owner.fire(true);
            this.owner.changedVelocity = new Phaser.Math.Vector2(this.velocity.x, -this.velocity.y);
            this.owner.bounceTimes = this.bounceTimes;
        } else if (this.entity.y >= this.scene.height && this.bounceTimes < 4) {
            this.bounceTimes++;
            this.owner.fire(true);
            this.owner.changedVelocity = new Phaser.Math.Vector2(this.velocity.x, this.velocity.y);
            this.owner.bounceTimes = this.bounceTimes;
        } else if ((this.entity.x <= 0 || this.entity.x >= this.scene.width || this.entity.y <= 0 || this.entity.y >= this.scene.height) && this.bounceTimes >= 4) {
            this.delete = true;
        }
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
}
