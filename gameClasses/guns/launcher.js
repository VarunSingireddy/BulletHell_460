class Launcher extends Gun {
    constructor(owner, scene, img) {
        super(owner, scene, img);
        this.cooldown = 2;
    }
    update(dt) {
        super.update();
        if (this.cooldown > 0) this.cooldown -= dt;
        else this.cooldown = 0;
    }
    fire(bool) {
        if (bool && this.cooldown <= 0) {
            let missile = new Missile(this, this.scene, this.owner.powerupFlags);
            //console.log(this.owner);
            missile.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img)); //'default'));
            missile.onFire();
            this.projectiles.push(missile);

            if (this.owner.powerupFlags.multiShot) {
                let missileL = new Missile(this, this.scene, this.owner.powerupFlags);
                missileL.isLeftSplit = true;
                missileL.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img));
                missileL.onFire();
                this.projectiles.push(missileL);

                let missileR = new Missile(this, this.scene, this.owner.powerupFlags);
                missileR.isRightSplit = true;
                missileR.init(this.scene.bullets.create(this.entity.x, this.entity.y, this.img));
                missileR.onFire();
                this.projectiles.push(missileR);
            }
        }
    }
}
