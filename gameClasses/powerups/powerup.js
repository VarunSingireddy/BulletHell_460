class Powerup {

    constructor(player, scene) {
        this.scene = scene;
        this.player = player;
        this.entity;
        this.delete = false;
        this.powerupType = 1;
        /*
        1 = multishot
        2 = portal
        3 = slowpockets
        */

    }

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.powerupType = Phaser.Math.Between(1, 4);

    } //init()

    update() {
        
        //this.setPlayerPowerup();
        //console.log(this.powerupType);
    }

    //run this when the player collides with the power up object
    setPlayerPowerup() {
        if (this.scene != null) {
            if (this.powerupType == 1) {
                this.scene.player.powerupFlags.multiShot = true;
                this.scene.player.multiShotTimer = 5;
            }
            if (this.powerupType == 2) {
                this.scene.player.powerupFlags.portal = true;
                this.scene.player.portalTimer = 10;
            }
            if (this.powerupType == 3) {
                this.scene.player.powerupFlags.slowPocket = true;
                this.scene.player.slowPocketsTimer = 5;
            }      
            if (this.powerupType == 4) {
                this.scene.player.powerupFlags.pierceShot = true;
                this.scene.player.pierceShotTimer = 5;
            }   
        }       
        
        this.delete = true;
    }

    onDie() {
        //this.entity = null;        
        this.scene = null;
        this.entity.destroy();
    } //onDie()


}
