class EnemyManager {

    static _enemyIdCount = -1;

    get nextEnemyIndex() {
        if (EnemyManager._enemyIdCount >= 300) { //if we hit 300 wrap the value
            //console.log("reseting PacketID");
            EnemyManager._enemyIdCount = 0;
        }
        //console.log("ID :" + AppHelper._idCount);
        return ++EnemyManager._enemyIdCount;
    }



    constructor(player, scene) {
        this.player = player;
        this.scene = scene;

        //this.enemyNum = 0;
        this.enemies = [];
        //this.enemiesEntitys = [];

    }

    init() {
        this.scene.enemies = this.scene.physics.add.group();

        this.scene.physics.add.overlap(this.player.entity, this.scene.enemies, (player, enemy) => {
            this.hitPlayer(player, enemy);
        }, null, this.scene);

        this.scene.physics.add.overlap(this.scene.bullets, this.scene.enemies, (bullet, enemy) => {
            this.hitBullet(bullet, enemy);
        }, null, this.scene);

    }

    hitPlayer(playerEntity, enemyEntity) {
        //console.log(enemyEntity.name);

        //let enemy = this.enemies[enemyEntity.name];

        //console.log(".children: " + enemyEntity.children);
        // enemy.onDie();
        //console.log(enemy.entity);

    }

    hitBullet(bullet, enemy) {

        //console.log("index: " + enemy.name);

        let en = this.enemies[enemy.name];
        //console.log(en);
        let bl = this.player.gun.projectiles[bullet.name];

        if (en && bl) {
            en.reciveDamage(10);
            bl.delete = true;
        }
        //asconsole.log("suck");

    }

    addEnemy() { //TODO: pass in the type of enemy to spawn and it's position
        let en = new Enemy(this.player, this.scene);
        //console.log("Enemy"); 
        en.init(this.scene.enemies.create(Math.random() * 400, Math.random() * 300, 'delicousTeeth'));

        let id = this.nextEnemyIndex;

        en.entity.name = id;
        this.enemies[id] = en;

        //this.enemyNum++;


    }

    update() {

        /*
        this.enemies.forEach((e)=>{
            e.update();
            if(e.delete){
                e.onDie();
                let pos = e.entity.name;
                this.enemies.splice(pos,1);
                //e.remove();
            }
            
        });*/

        for (let i = 0; i < this.enemies.length; ++i) {

            if (this.enemies[i]) {
                this.checkDistanceToGrav(this.enemies[i]);
                this.enemies[i].update();
                if (this.enemies[i].delete) {
                    this.enemies[i].onDie();
                    this.enemies[i] = null;

                }
            }
        }
    }


    checkDistanceToGrav(enemy) {
        if (this.player.gravGrenade.projectiles.length <= 0) return;

        for (i = 0; i < this.player.gravGrenade.projectiles.length; i++) {

            this.dist = this.calcDistance(enemy.entity.x, enemy.entity.y, this.player.gravGrenade.projectiles[i].entity.x, this.player.gravGrenade.projectiles[i].entity.y);
            
            if (this.dist < enemy.radius + this.player.gravGrenade.projectiles[i].radius && this.player.gravGrenade.projectiles[i].enableGravPull) {                
                //this.scene.accelerateToObject(enemy.entity, this.player.gravGrenade.projectiles[i].entity, 100,500,500);
                let angle = this.calcAngle(enemy.entity.x, enemy.entity.y, this.player.gravGrenade.projectiles[i].entity.x, this.player.gravGrenade.projectiles[i].entity.y)
                enemy.xVelocity = Math.cos(angle) * 100;
                enemy.yVelocity = Math.sin(angle) * 100;

                enemy.entity.body.setVelocity(enemy.xVelocity, enemy.yVelocity);                
            } 
        }
    }

    calcDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
    }

    calcAngle(x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let angle = Math.atan2(dy, dx);
        return angle;
    }
}
