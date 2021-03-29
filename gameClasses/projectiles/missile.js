class Missile extends Projectile {
    constructor(scene, owner, flags) {
        super(scene, owner, flags);
        this.speed = 200;
        this.currRadius = 0;
        this.blastRadius = 150;
        this.enemiesCopy = scene.enemies.children;
        this.closestEnemy;
        this.explosion;
        super.init(owner);
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

    findNearestEnemy() {
        let distanceToClosestEnemy = 10000;
        for (let i = 0; i < this.enemiesCopy.length; i++) {
            let distanceToEnemy = this.getDistance(this.enemiesCopy[i]);
            if (distanceToEnemy < distanceToClosestEnemy) {
                distanceToClosestEnemy = distanceToEnemy;
                this.closestEnemy = this.enemiesCopy[i];
            }
        }
    }
    getDistance(target) {
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    onHit() {
        super.onHit();
        this.explosion = new Explosion(this.x, this.y);
        while (this.currRadius < this.blastRadius) {
            this.currRadius++;
            this.explosion.update(this.currRadius);
        }
        if (this.currRadius >= this.blastRadius) {
            this.explosion.isDead = true;
            this.explosion = null;
        }
    }
}

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.sprite;
        this.isDead = false;
    }
    update(rad) {
        this.radius = rad;
        if (this.isDead) {
            this.radius = 0;
        }
    }
}
