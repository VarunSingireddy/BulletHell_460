class Player {
    constructor(scene) {
        this.scene = scene;
        this.speed = new Phaser.Math.Vector2(450.0, 450.0); //300;
        this.velocity = new Phaser.Math.Vector2(0, 0);
        this.dir = new Phaser.Math.Vector2(0, 0);
        this.gun = new Gun(this,scene);
        
        this.dirFlags = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }
    
    

    init(entity) {
        this.entity = entity;
        this.entity.setCollideWorldBounds(true);
        this.entity.body.allowGravity = false;
        this.entity.setDrag(2000);
        //console.log(this.entity.body.useDampening);
        //this.entity.useDampening = true;
        
        this.gun.init(this.scene.add.image(this.entity.x,this.entity.y,'bullet'));
        
        
        console.log(this.entity);

    }

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

        this.dir.set(0, 0);
    }

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
        

}
