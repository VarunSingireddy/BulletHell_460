class Ricochet extends Projectile {
    constructor(owner, scene, powerupFlags) {
        super(owner, scene, powerupFlags);
        this.speed = 1200;
        this.bounceTimes = 0;
    } //constructor()

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.setVelocityTowardMouse();
        this.entity.body.setBounce(1, 1);
        this.entity.body.setCollideWorldBounds(true);
    } //init()

    update() {
        if (this.bounceTimes >= 4) {
            this.delete = true;
        }

        if (this.entity.body.onWall() || this.entity.body.onFloor() || this.entity.body.onCeiling()) {
            this.bounceTimes++;
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