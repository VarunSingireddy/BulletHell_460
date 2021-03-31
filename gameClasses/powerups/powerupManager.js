class PowerupManager {

    static _powerupIdCount = -1;

    get nextPowerupIndex() {
        if (PowerupManager._powerupIdCount >= 300) { //if we hit 300 wrap the value
            //console.log("reseting PacketID");
            PowerupManager._powerupIdCount = 0;
        }
        //console.log("ID :" + AppHelper._idCount);
        return ++PowerupManager._powerupIdCount;
    }



    constructor(player, scene) {
        this.player = player;
        this.scene = scene;

        //this.enemyNum = 0;
        this.powerups = [];
        //this.enemiesEntitys = [];

    }

    init() {
        this.scene.powerups = this.scene.physics.add.group();

        this.scene.physics.add.overlap(this.player.entity, this.scene.powerups, (player, powerup) => {
            this.hitPlayer(player, powerup);
        }, null, this.scene);
    }

    hitPlayer(playerEntity, powerupEntity) {      

        let powerup = this.powerups[powerupEntity.name];
        //powerup.player = this.scene.player;

        powerup.setPlayerPowerup();
        //console.log(powerup.delete);
        //console.log("hit");
    }

    /*hitBullet(bullet, enemy) {

        //console.log("index: " + enemy.name);

        let en = this.enemies[enemy.name];
        let bl; // = this.player.gun.projectiles[bullet.name];

        //search through the guns array and their respective projectiles array to find THIS bullet
        let found = false;
        for (let i = 0; i < this.player.gunArray.length; ++i) {
            for (let j = 0; j < this.player.gunArray[i].projectiles.length; ++j) //O(n^2) time. Gross
            {
                if (bullet == this.player.gunArray[i].projectiles[j].entity) {
                    bl = this.player.gunArray[i].projectiles[j];
                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        if (en && bl) {
            en.reciveDamage(10);
            //bl.delete = true;     SHOULD SET DELETE FROM PROJECTILE'S ONHIT() INSTEAD OF HERE
            bl.onHit();
        }
        //asconsole.log("suck");

    } //hitBullet()*/

    addPowerup() { //TODO: pass in the type of enemy to spawn and it's position
        let pu = new Powerup(this.player, this.scene);
        //pu.init(this.scene.powerups.create(Math.random() * this.scene.width, Math.random() * this.scene.height, 'default'));
        pu.init(this.scene.powerups.create(500,500, 'default'));


        let id = this.nextPowerupIndex;

        pu.entity.name = id;
        this.powerups[id] = pu;        
    }

    update() {        
        for (let i = 0; i < this.powerups.length; ++i) {            
            if (this.powerups[i]) {                
                this.powerups[i].update();
                if (this.powerups[i].delete) {
                    this.powerups[i].onDie();
                    this.powerups[i] = null;
                }
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
