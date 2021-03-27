class Missile extends Projectile {
    constructor(scene, owner) {
        super(scene, owner);
        this.speed = 200;
        this.currRadius = 0;
        this.blastRadius = 150;
        this.enemiesCopy = [];
        this.closestEnemy;

    }

    update() {
        super.update();

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

        while (this.currRadius < this.blastRadius) {
            this.currRadius++;


        }
    }
}

class Explosion {
    constructor() {
        this.radius = 0;
        this.sprite;
    }
    update(rad) {
        this.radius = rad;
    }
    draw() {

    }
}
