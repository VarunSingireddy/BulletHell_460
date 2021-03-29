class Gun {

    static _bulletIdCount = 0;

    get nextBulletIndex() {
        if (Gun._bulletIdCount >= 1000) { //if we hit 1000 wrap the value
            Gun._bulletIdCount = 0;
        }

        return ++Gun._bulletIdCount;
    }


    constructor(owner, scene, img, gunType) {
        this.scene = scene;
        this.owner = owner;
        this.entity; //set in the player
        //this.projectile = new Projectile();
        this.shootDown = false;
        this.shootDownPrev = false; //not used in the
        this.projectiles = [];
        this.img = img;
        this.gunType = gunType;
        this.bounceTimes = 0;
        this.changedVelocity = new Phaser.Math.Vector2(0, 0);
    }

    init(entity) {
        this.entity = entity;

    } //init()

    update(dt) {
        //I don't know why this causes easing but it does and I dig it
        this.entity.x = this.owner.entity.x;
        this.entity.y = this.owner.entity.y;

        //console.log(this.scene.angleToMouse(this.entity));
        this.entity.angle = this.scene.angleToMouseDeg(this.entity) + 90;

        this.updateProjectiles(dt);


        this.shootDownPrev = this.shootDown;
    } //update()

    fire(bool) {
        //console.log("BANG");
        if (bool) {
            let bulletIndex = this.nextBulletIndex;
            let bullet;

            if (this.gunType == 'normal') {
                bullet = new Projectile(this, this.scene, this.owner.powerupFlags);
            } else if (this.gunType == 'hook') {
                bullet = new Hook(this, this.scene, this.owner.powerupFlags);
            } else if (this.gunType == 'gravGrenade') {
                bullet = new GravGrenade(this, this.scene, this.owner.powerupFlags);
            } else if (this.gunType == 'ricochet') {
                bullet = new Ricochet(this, this.scene, this.owner.powerupFlags, this.bounceTimes, this.changedVelocity);
            }
            //console.log(this.owner);
            bullet.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img)); //'default'));
            bullet.onFire();
            this.bounceTimes = 0;
            this.changedVelocity = new Phaser.Math.Vector2(0, 0);

            //console.log(bulletIndex);
            this.projectiles[bulletIndex] = bullet;
            bullet.entity.name = bulletIndex;
            //this.projectiles.push(bullet);


            //if multishot is active, spawn additional bullets
            //console.log(this.owner.powerupFlags.multiShot);            
            if (this.owner.powerupFlags.multiShot) {
                let bulletIndexL = this.nextBulletIndex;
                let bulletIndexR = this.nextBulletIndex;
                //spawn Left Split
                let bulletL = new Projectile(this, this.scene, this.owner.powerupFlags);
                bulletL.isLeftSplit = true;
                bulletL.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img));
                bulletL.onFire();
                this.projectiles[bulletIndexL] = bulletL;
                bulletL.entity.name = bulletIndexL;
                //this.projectiles.push(bulletL);

                //spawn Right Split
                let bulletR = new Projectile(this, this.scene, this.owner.powerupFlags);
                bulletR.isRightSplit = true;
                bulletR.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img));
                bulletR.onFire();
                this.projectiles[bulletIndexR] = bulletR;
                bulletR.entity.name = bulletIndexR;
                //this.projectiles.push(bulletR);
            }
        }

        this.shootDown = bool;

    }

    updateProjectiles(dt) {
        for (let i = 0; i < this.projectiles.length; ++i) {
            if (this.projectiles[i]) {
                this.projectiles[i].update(dt);
                if (this.projectiles[i].delete) {
                    this.projectiles[i].onDie();
                    this.projectiles.splice(i, 1);
                    --i;
                }
            }
        }
    } //updateProjectiles()
}
