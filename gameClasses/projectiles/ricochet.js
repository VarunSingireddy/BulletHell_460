class Ricochet extends Projectile {
    constructor(owner, scene, powerupFlags) {
        super();
        this.speed = 1200;
        this.bounceTimes = 0;
    } //constructor()

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;

        this.setVelocityTwoardMouse();
    } //init()

    update() { //this is called in the gun update
        if (this.entity.x < 0 && this.bounceTimes < 4) {

        } else if (this.entity.x > this.scene.width && this.bounceTimes < 4) {

        } else if (this.entity.y < 0 && this.bounceTimes < 4) {

        } else if (this.entity.y > this.scene.height && this.bounceTimes < 4) {

        } else if ((this.entity.x < 0 || this.entity.x > this.scene.width || this.entity.y < 0 || this.entity.y > this.scene.height) && this.bounceTimes >= 4) {
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

    setVelocityTwoardMouse() {
        this.angle = this.scene.angleToMouseRad(this.entity);

        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);

        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);
    } //setVelocityTwoardMouse()
}
