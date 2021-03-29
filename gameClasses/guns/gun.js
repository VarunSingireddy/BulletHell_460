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
        if (bool && !this.shootDown) {
            let bulletIndex = this.nextBulletIndex;
            let bullet;

            if (this.gunType == 'normal') {
                bullet = new Projectile(this, this.scene, this.owner.powerupFlags);
            } else if (this.gunType == 'hook') {
                if(this.projectiles.length > 0) return;
                bullet = new Hook(this, this.scene, this.owner.powerupFlags);
            } else if (this.gunType == 'gravGrenade') {
                bullet = new GravGrenade(this, this.scene, this.owner.powerupFlags);
            } else if (this.gunType == 'ricochet') {
                bullet = new Ricochet(this, this.scene, this.owner.powerupFlags, this.bounceTimes, this.changedVelocity);
            } else if (this.gunType == 'missile') {
                bullet = new Missile(this, this.scene, this.owner.powerupFlags);
            } else if (this.gunType == 'flame') {
                bullet = new Flame(this, this.scene, this.owner.powerupFlags);
            } 
            //console.log(this.owner);
            bullet.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img)); //'default'));
            bullet.onFire();            

            //console.log(bulletIndex);
            //this.projectiles[bulletIndex] = bullet;
            this.projectiles.push(bullet);
            bullet.entity.name = bulletIndex;
            this.projectiles.push(bullet);


            //if multishot is active, spawn additional bullets
            //console.log(this.owner.powerupFlags.multiShot);            
            if (this.owner.powerupFlags.multiShot) {
                let bulletL;
                let bulletR;

                if (this.gunType == 'normal') {
                    bulletL = new Projectile(this, this.scene, this.owner.powerupFlags);
                    bulletR = new Projectile(this, this.scene, this.owner.powerupFlags);
                } else if (this.gunType == 'hook') {
                    //bulletL = new Hook(this, this.scene, this.owner.powerupFlags);
                    //bulletR = new Hook(this, this.scene, this.owner.powerupFlags);
                } else if (this.gunType == 'gravGrenade') {
                    bulletL = new GravGrenade(this, this.scene, this.owner.powerupFlags);
                    bulletR = new GravGrenade(this, this.scene, this.owner.powerupFlags);
                } else if (this.gunType == 'ricochet') {
                    bulletL = new Ricochet(this, this.scene, this.owner.powerupFlags, this.bounceTimes, this.changedVelocity);
                    bulletR = new Ricochet(this, this.scene, this.owner.powerupFlags, this.bounceTimes, this.changedVelocity);
                }

                let bulletIndexL = this.nextBulletIndex;
                let bulletIndexR = this.nextBulletIndex;

                //spawn Left Split
                bulletL.isLeftSplit = true;
                bulletL.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img));
                bulletL.onFire();
                //this.projectiles[bulletIndexL] = bulletL;
                bulletL.entity.name = bulletIndexL;
                this.projectiles.push(bulletL);

                //spawn Right Split                
                bulletR.isRightSplit = true;
                bulletR.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img));
                bulletR.onFire();
                //this.projectiles[bulletIndexR] = bulletR;
                bulletR.entity.name = bulletIndexR;
                this.projectiles.push(bulletR);
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
