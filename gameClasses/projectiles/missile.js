class Missile extends Projectile {
    constructor(owner, scene, flags) {
        super(owner, scene, flags);
        this.speed = 200;
        this.scene = scene;
        this.owner = owner;
        //this.enemiesCopy = this.scene.enemyManager.enemies;
        this.closestEnemy = null;
        this.storedEnemy = null;
        this.explosion = null;
        this.damage = 10;
        this.endAngle = 0;
        this.currAngle = 0;
    }

    init(entity) {
        
        this.enemiesCopy = this.scene.enemyManager.getEnemyArray();
        super.init(entity);
    }
    update(dt) {
        super.update();
        console.log("End: " + this.endAngle + ", curr: " + this.currAngle);
        if(this.currAngle != this.endAngle) {
            this.currAngle += (this.currAngle > this.endAngle) ? -this.scene.dt * 3 : this.scene.dt * 3;
            //if(this.currAngle > Math.PI) this.currAngle = Math.PI; 
            //if(this.currAngle < -Math.PI) this.currAngle = -Math.PI;
        }
        else this.currAngle = this.endAngle;
        if (this.closestEnemy != null) {
            this.findNearestEnemy();
            this.endAngle = this.getAngle(this.storedEnemy);
            this.setVelocityTowardTarget(this.storedEnemy);
        } else {
            this.findNearestEnemy();
        }
    }
    onFire() {
        this.findNearestEnemy();
        this.storedEnemy = this.closestEnemy;
        this.endAngle = this.getAngle(this.storedEnemy);
        this.setVelocityTowardMouse();
    }
    findNearestEnemy() {
        let distanceToClosestEnemy = 10000;
        for (let i = 0; i < this.enemiesCopy.length; i++) {
            if (this.enemiesCopy[i]) {
                let distanceToEnemy = this.getDistance(this.enemiesCopy[i]);
                //console.log(this.getDistance(this.enemiesCopy[i]));
                if (distanceToEnemy < distanceToClosestEnemy) {
                    distanceToClosestEnemy = distanceToEnemy;
                    this.closestEnemy = this.enemiesCopy[i];
                    if(this.storedEnemy == null) this.storedEnemy = this.closestEnemy;
                }
            }

        }
    }
    getDistance(target) {
        let dx = target.entity.x - this.entity.x;
        let dy = target.entity.y - this.entity.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    getAngle(target) {
        let dx = target.entity.x - this.entity.x;
        let dy = target.entity.y - this.entity.y;
        return Math.atan2(dy, dx);
    }
    onHit() {
        super.onHit();
        this.explosion = new Explosion(this.x, this.y, this.scene);
        this.explosion.init(this.scene.explosions.create(this.entity.x, this.entity.y, this.explosion.sprite));
        this.scene.explosionArray.push(this.explosion);
    }
    setVelocityTowardMouse() {

        this.currAngle = this.scene.angleToMouseRad(this.entity);
        if(this.isLeftSplit) this.currAngle += this.splitAngleChange;
        if(this.isRightSplit) this.currAngle += -this.splitAngleChange;
        
        
        this.velocity.x = this.speed * Math.cos(this.currAngle);
        this.velocity.y = this.speed * Math.sin(this.currAngle);   
        
        this.entity.body.setVelocity(this.velocity.x,this.velocity.y);
        
    }
    setVelocityTowardTarget(target) {
        let dx = target.entity.x - this.entity.x;
        let dy = target.entity.y - this.entity.y;
        this.endAngle = Math.atan2(dy, dx);
        this.velocity.x = this.speed * Math.cos(this.currAngle);
        this.velocity.y = this.speed * Math.sin(this.currAngle);

        this.entity.angle = this.currAngle * Phaser.Math.RAD_TO_DEG + 90;
        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);
    }
}

class Explosion {
    constructor(x, y, scene) {
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.maxRadius = 2.5;
        this.sprite = 'explosion';
        this.delete = false;
    }
    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.entity.scaleX = .5;
        this.entity.scaleY = .5;
        this.scene.tweens.add({
            targets: this.entity,
            scaleX: this.maxRadius,
            scaleY: this.maxRadius,
            alpha: 0.01,
            duration: 400
        });
    }
    update() {
        if (this.entity.alpha <= 0.01) this.delete = true;
    }
}
