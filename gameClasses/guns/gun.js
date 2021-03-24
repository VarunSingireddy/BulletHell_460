class Gun {

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
            this.projectiles.push(bullet);


            //if multishot is active, spawn additional bullets
            //console.log(this.owner.powerupFlags.multiShot);            
            if (this.owner.powerupFlags.multiShot) {
                //spawn Left Split
                let bulletL = new Projectile(this, this.scene, this.owner.powerupFlags);
                bulletL.isLeftSplit = true;
                bulletL.init(this.scene.bullets.create(this.entity.x, this.entity.y, 'default'));
                bulletL.onFire();
                this.projectiles.push(bulletL);

                //spawn Right Split
                let bulletR = new Projectile(this, this.scene, this.owner.powerupFlags);
                bulletR.isRightSplit = true;
                bulletR.init(this.scene.bullets.create(this.entity.x, this.entity.y, 'default'));
                bulletR.onFire();
                this.projectiles.push(bulletR);
            }
        }

        this.shootDown = bool;

    }

    updateProjectiles() {
        for (let i = 0; i < this.projectiles.length; ++i) {
            this.projectiles[i].update();
            if (this.projectiles[i].delete) {
                this.projectiles.splice(i, 1);
                --i;
            }
        }
        //console.log(this.projectiles);
    } //updateProjectiles()
}
