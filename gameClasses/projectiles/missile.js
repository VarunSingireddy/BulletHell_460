class Missile extends Projectile {
    constructor(owner, scene, flags) {
        super(owner, scene, flags);
        this.speed = 200;
        this.scene = scene;
        this.owner = owner;
        //this.enemiesCopy = this.scene.enemyManager.enemies;
        this.closestEnemy = null;
        this.explosion = null;
        this.damage = 10;
    }

    init(entity) {
        /*
        for (let i = 0; i < this.scene.enemyManager.enemies.length; i++) {
            this.enemiesCopy.push(this.scene.enemyManager.enemies[i]);
        }
        */
        this.enemiesCopy = this.scene.enemyManager.getEnemyArray();        
        super.init(entity);
    }
    update(dt) {
        super.update();        

        if (this.closestEnemy != null) {
            this.findNearestEnemy();
            this.setVelocityTowardTarget(this.closestEnemy);
        } else {
            this.findNearestEnemy();
        }
    }
    onFire() {
        this.findNearestEnemy();
    }
    findNearestEnemy() {
        let distanceToClosestEnemy = 10000;
        for (let i = 0; i < this.enemiesCopy.length; i++) {
            let distanceToEnemy = this.getDistance(this.enemiesCopy[i]);
            console.log(this.getDistance(this.enemiesCopy[i]));
            if (distanceToEnemy < distanceToClosestEnemy) {
                distanceToClosestEnemy = distanceToEnemy;
                this.closestEnemy = this.enemiesCopy[i];
                console.log(this.closestEnemy);
            }
        }
    }
    getDistance(target) {
        let dx = target.entity.x - this.entity.x;
        let dy = target.entity.y - this.entity.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    onHit() {
        super.onHit();
        this.explosion = new Explosion(this.x, this.y, this.scene);
        this.explosion.init(this.scene.explosions.create(this.entity.x, this.entity.y, this.explosion.sprite));
        this.scene.explosionArray.push(this.explosion);
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
