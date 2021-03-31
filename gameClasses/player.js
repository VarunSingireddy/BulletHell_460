class Player {
    constructor(scene) {
        this.scene = scene;
        this.speed = new Phaser.Math.Vector2(450.0, 450.0); //300;
        this.velocity = new Phaser.Math.Vector2(0, 0);
        this.dir = new Phaser.Math.Vector2(0, 0);
        this.gun = new Gun(this, scene, 'default', 'normal');
        this.hook = new Gun(this, scene, 'hook', 'hook');
        this.gravGrenade = new Gun(this, scene, 'default', 'gravGrenade');
        this.ricochet = new Gun(this, scene, 'bullet', 'ricochet');
        this.launcher = new Gun(this, scene, 'missile', 'missile');
        this.flameThrower = new Gun(this, scene, 'flame', 'flame');
        this.gunArray = [this.gun, this.hook, this.ricochet, this.launcher, this.flameThrower];
        this.gunIndex = 0;
        this.health = 100;

        this.multiShotTimer = 5;
        this.portalTimer = 10;
        this.slowPocketsTimer = 5;
        this.pierceShotTimer = 5;

        this.powerupFlags = {
            portal: false,
            multiShot: false,
            slowPocket: false,
            pierceShot: false,
        }

        this.dirFlags = {
            up: false,
            down: false,
            left: false,
            right: false,
        };
    } //constructor()



    init(entity) {
        this.entity = entity;
        this.entity.setCollideWorldBounds(true);
        this.entity.body.allowGravity = false;
        this.entity.setDrag(2000);
        //console.log(this.entity.body.useDampening);
        //this.entity.useDampening = true;

        this.gun.init(this.scene.add.image(this.entity.x, this.entity.y, 'bullet'));
        this.hook.init(this.scene.add.image(this.entity.x, this.entity.y, 'bullet'));
        this.gravGrenade.init(this.scene.add.image(this.entity.x, this.entity.y, null));
        this.ricochet.init(this.scene.add.image(this.entity.x, this.entity.y, 'bullet'));
        this.launcher.init(this.scene.add.image(this.entity.x, this.entity.y, 'missile'));
        this.flameThrower.init(this.scene.add.image(this.entity.x, this.entity.y, 'flame'));


        //console.log(this.entity);

    } //init()



    update(dt) {
        this.handleDirection();
        //console.log(dt);

        if (this.dir.x != 0 || this.dir.y != 0) {

            this.dir.multiply(this.speed);

            //dir.divide(new Phaser.Math.Vector2(1000,1000));
            //console.log(dir);

            this.entity.body.setVelocity(this.dir.x, this.dir.y);
        }

        this.gun.update(dt);
        this.hook.update(dt);
        this.ricochet.update(dt);
        this.gravGrenade.update(dt);
        this.launcher.update(dt);
        this.flameThrower.update(dt);
        this.updatePowerupFlags(dt);

        //console.log(this.gun.projectiles.length);
        //console.log(this.powerupFlags);
        //console.log(this.health);


        this.dir.set(0, 0);
    } //update()



    setDirFlags(int, bool) {

        switch (int) {
            case 1:
                this.dirFlags.up = bool;
                break;
            case 2:
                this.dirFlags.down = bool;
                break;
            case 3:
                this.dirFlags.left = bool;
                break;
            case 4:
                this.dirFlags.right = bool;
                break;
            default:
                console.log("no dir flag present");
                break;
        }

    } //setDirFlags()

    fire(bool) {
        //this.gun.fire(bool);
        this.gunArray[this.gunIndex].fire(bool);
    } //fire()

    switchGun(i) {
        this.gunIndex += i;
        if (this.gunIndex < 0) this.gunIndex = this.gunArray.length - 1;
        else if (this.gunIndex == this.gunArray.length) this.gunIndex = 0;
        console.log("Using gun " + this.gunArray[this.gunIndex].gunType);
    } //switchGun()



    handleDirection(input) {
        // let dir = new Phaser.Math.Vector2(0, 0);

        if (this.dirFlags.up) {
            this.dir.add(Phaser.Math.Vector2.UP);
        }
        if (this.dirFlags.down) {
            this.dir.add(Phaser.Math.Vector2.DOWN);
        }
        if (this.dirFlags.left) {
            this.dir.add(Phaser.Math.Vector2.LEFT);
        }
        if (this.dirFlags.right) {
            this.dir.add(Phaser.Math.Vector2.RIGHT);
        }

        this.dir.normalize();
    } //handleDirection()

    updatePowerupFlags(dt) {
        if (this.powerupFlags.multiShot) {
            //console.log(this.multiShotTimer);
            this.multiShotTimer -= dt;
            if (this.multiShotTimer <= 0) this.powerupFlags.multiShot = false;
        }
        if (this.powerupFlags.portal) {
            //console.log(this.multiShotTimer);
            this.portalTimer -= dt;
            if (this.portalTimer <= 0) this.powerupFlags.portal = false;
        }

        if (this.powerupFlags.slowPocket) {
            //console.log(this.multiShotTimer);
            this.slowPocketsTimer -= dt;
            if (this.slowPocketsTimer <= 0) this.powerupFlags.slowPocket = false;
        }

        if (this.powerupFlags.pierceShot) {
            //console.log(this.multiShotTimer);
            this.pierceShotTimer -= dt;
            if (this.pierceShotTimer <= 0) this.powerupFlags.pierceShot = false;
        }
    }

    spawnGravityGrenade(bool) {
        this.gravGrenade.fire(bool)
    }


}
