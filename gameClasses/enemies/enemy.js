class Enemy {

    constructor(player, scene) {
        this.scene = scene;
        this.player = player;

        this.health = 10;
        this.delete = false;

        this.isBurning = false;
        this.isSlow = false;
        this.radius = 50;
        this.isHooked = false;
        this.isInGravPull = false;
        //unit vectors for movement direction
        this.xDir = 0;
        this.yDir = 0;
        this.speed = 50;

        //allow enemies to shoot. Put in constructor
        this.gun = new Gun(this, this.scene, 'default', 'normal');
        this.timer = (Math.random() * 3) + 1; //shoots every 1-4 seconds

    }


    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.entity.body.allowDrag = true;
        this.entity.body.drag = new Phaser.Math.Vector2(500, 500);
    }


    update(dt) {
        //console.log('asd');
        if (this.health <= 0) {
            this.delete = true;

        }

        //have enemies slowly move towards player
        if (!this.isHooked && !this.isInGravPull) {
            this.calcVelocity();

            //we can put shooting or whatever else here
        } else {
            this.hooked(); //since this is the only action, they are essentially stunned
        }
        //we can put shooting or whatever else here. Put in enemy.js > update(t) ? if(!this.isHooked) after setting velocity
        this.timer -= dt;
        if (this.timer < 0) {
            //shoot
            this.gun.enemyFire(this.player);
            this.timer = (Math.random() * 3) + 1;
        }

    }

    calcVelocity() {
        //calculate unit vectors and move enemy
        this.xDir = this.entity.x - this.player.entity.body.x;
        this.yDir = this.entity.y - this.player.entity.body.y;
        let hyp = Math.sqrt(Math.pow(this.xDir, 2) + Math.pow(this.yDir, 2));
        this.xDir /= -hyp;
        this.yDir /= -hyp;
        this.entity.body.setVelocity(this.xDir * this.speed, this.yDir * this.speed);
        this.entity.body.setVelocity(this.xDir * this.speed, this.yDir * this.speed);
    }

    reciveDamage(damage) {
        this.health -= damage;
    }

    onDie() {
        this.entity.destroy();
        //this.entity.active = false;
    }
    toPlayer() {
        let p = this.player;
        console.log(this.entity.body);
        let xTarget = this.entity.x - p.entity.body.x;
        let yTarget = this.entity.y - p.entity.body.y;
        let hyp = Math.sqrt(Math.pow(xTarget, 2) + Math.pow(yTarget, 2));
        xTarget /= -hyp;
        yTarget /= -hyp;
    }

    hooked() //enemy has been hooked
    {
        let p = this.player;
        let xTarget = this.entity.x - p.entity.body.x;
        let yTarget = this.entity.y - p.entity.body.y;
        let hyp = Math.sqrt(Math.pow(xTarget, 2) + Math.pow(yTarget, 2));
        xTarget /= -hyp;
        yTarget /= -hyp;

        //if distance is close enough, can stop dragging enemy
        if (hyp < 100) {
            this.isHooked = false;
            this.receiveDamage(1);
        }

        let speed = 1000;
        this.entity.body.setVelocity(xTarget * speed, yTarget * speed);
    }


}
