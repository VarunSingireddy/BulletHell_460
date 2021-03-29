class Player {
    constructor(scene) {
        this.scene = scene;
        this.speed = new Phaser.Math.Vector2(450.0, 450.0); //300;
        this.velocity = new Phaser.Math.Vector2(0, 0);
        this.dir = new Phaser.Math.Vector2(0, 0);
<<<<<<< Updated upstream
        this.gun = new Gun(this,scene);
        
=======
        this.gun = new Gun(this, scene, 'default');
        this.hook = new Gun(this, scene, 'bullet');
        this.ricochet = new Gun(this, scene, 'bullet');
        this.gunArray = [this.gun, this.hook, this.ricochet];
        this.gunIndex = 0;

>>>>>>> Stashed changes
        this.powerupFlags = {
            portal: false,
            multiShot: false,
            slowPocket: false
        }

        this.dirFlags = {
            up: false,
            down: false,
            left: false,
            right: false
        };
<<<<<<< Updated upstream
    }
    
    
=======
    } //constructor()


>>>>>>> Stashed changes

    init(entity) {
        this.entity = entity;
        this.entity.setCollideWorldBounds(true);
        this.entity.body.allowGravity = false;
        this.entity.setDrag(2000);
        //console.log(this.entity.body.useDampening);
        //this.entity.useDampening = true;
<<<<<<< Updated upstream
        
        this.gun.init(this.scene.add.image(this.entity.x,this.entity.y,'bullet'));
        
        
        console.log(this.entity);

    }
=======

        this.gun.init(this.scene.add.image(this.entity.x, this.entity.y, 'bullet'));
        this.hook.init(this.scene.add.image(this.entity.x, this.entity.y, 'bullet'));
        this.ricochet.init(this.scene.add.image(this.entity.x, this.entity.y, 'bullet'));

        //console.log(this.entity);

    } //init()
>>>>>>> Stashed changes

    update(dt) {
        this.handleDirection();
        //console.log(dt);

        if (this.dir.x != 0 || this.dir.y != 0) {

            this.dir.multiply(this.speed);

            //dir.divide(new Phaser.Math.Vector2(1000,1000));
            //console.log(dir);

            this.entity.body.setVelocity(this.dir.x, this.dir.y);
        }

        this.gun.update();
<<<<<<< Updated upstream

        this.dir.set(0, 0);
    }
=======
        this.hook.update();
        this.ricochet.update();
        
        console.log(this.entity.x, this.entity.y);

        this.dir.set(0, 0);
    } //update()
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        
    }

    fire(bool){
        this.gun.fire(bool);
    }
    
    
    
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
        }
        
=======

    } //setDirFlags()

    fire(bool) {
        //this.gun.fire(bool);
        this.gunArray[this.gunIndex].fire(bool);
    } //fire()

    switchGun(i) {
        this.gunIndex += i;
        if (this.gunIndex < 0) this.gunIndex = this.gunArray.length - 1;
        else if (this.gunIndex == this.gunArray.length) this.gunIndex = 0;
        console.log("Using gun " + this.gunIndex);
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

>>>>>>> Stashed changes

}
