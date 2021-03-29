class Gun {

    static _bulletIdCount = 0;

    get nextBulletIndex() {
        if (Gun._bulletIdCount >= 1000) { //if we hit 1000 wrap the value
            Gun._bulletIdCount = 0;
        }

        return ++Gun._bulletIdCount;
    }
    

    constructor(owner, scene) {
        this.scene = scene;
        this.owner = owner;
        this.entity; //set in the player
        //this.projectile = new Projectile();
        this.shootDown = false;
        this.shootDownPrev = false; //not used in the
        this.projectiles = [];
    }

    init(entity) {
        this.entity = entity;

    }

    update() {
        //I don't know why this causes easing but it does and I dig it
        this.entity.x = this.owner.entity.x;
        this.entity.y = this.owner.entity.y;

        //console.log(this.scene.angleToMouse(this.entity));
        this.entity.angle = this.scene.angleToMouseDeg(this.entity) + 90;

        this.updateProjectiles();


        this.shootDownPrev = this.shootDown;
    }

    fire(bool) {
        //console.log("BANG");
        if (bool) {
            let bullet = new Projectile(this, this.scene, this.owner.powerupFlags);
            //console.log(this.owner);

            bullet.init(this.scene.bullets.create(this.entity.x, this.entity.y, 'default'));

            bullet.onFire();

            let bulletIndex = this.nextBulletIndex;
            //console.log(bulletIndex);
            this.projectiles[bulletIndex] = bullet;
            bullet.entity.name = bulletIndex;
        }

        this.shootDown = bool;

    }

    updateProjectiles() {
        for (let i = 0; i < this.projectiles.length; ++i) {
            if (this.projectiles[i]) {
                this.projectiles[i].update();
                if (this.projectiles[i].delete) {
                    this.projectiles[i].onDie();
                    this.projectiles.splice(i, 1);
                    --i;
                }
            }
        }
        //console.log(this.projectiles);
    } //updateProjectiles()
}
