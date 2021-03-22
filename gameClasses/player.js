class Player {
    constructor() {
        this.speed = new Phaser.Math.Vector2(450.0, 450.0); //300;
        this.velocity = new Phaser.Math.Vector2(0, 0);

        this.gun = new Gun();

    }

    init(entity) {
        this.entity = entity;
        this.entity.setCollideWorldBounds(true);
        this.entity.body.allowGravity = false;
        this.entity.setDrag(2000);
        //console.log(this.entity.body.useDampening);
        //this.entity.useDampening = true;
        console.log(this.entity);
   
    }

    update(input, dt) {
        let dir = this.handleDirection(input);
        //console.log(dt);

        if (dir.x != 0 || dir.y != 0) {

            dir.multiply(this.speed);

            //dir.divide(new Phaser.Math.Vector2(1000,1000));
            //console.log(dir);

            this.entity.body.setVelocity(dir.x, dir.y);
        }
        
        this.gun.update(input);
        
        
        
        
        
    }


    handleDirection(input) {
        let dir = new Phaser.Math.Vector2(0, 0);

        if (input.left.isDown) {
            dir.add(Phaser.Math.Vector2.LEFT);
        }
        if (input.right.isDown) {
            dir.add(Phaser.Math.Vector2.RIGHT);
        }
        if (input.up.isDown) {
            dir.add(Phaser.Math.Vector2.UP);
        }
        if (input.down.isDown) {
            dir.add(Phaser.Math.Vector2.DOWN);
        }

        return dir.normalize();
    }

    
    
    
}
