class Powerup {
    
    constructor(scene) {
        this.scene = scene;
        this.entity;
        
               
    }
    
    init(entity) {
        this.entity = entity;
        
    }//init()
    
    update() {
        this.setPlayerPowerup();        
    }
    
    setPlayerPowerup() {
        if(this.scene != null) {this.scene.player.powerupFlags.multiShot = true; this.scene.player.multiShotTimer = 5;}
        //console.log("works");
        this.onDie();
    }
    
    onDie(){
        //this.entity = null;        
        this.scene = null;
        this.entity.destroy();
    }//onDie()
    
    
}