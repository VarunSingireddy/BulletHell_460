class Projectile {

    constructor(owner, scene, powerupFlags) {
        this.owner = owner;
        this.scene = scene;
        this.speed = 600;
<<<<<<< Updated upstream
        this.velocity = new Phaser.Math.Vector2(0,0);
       // console.log(scene);d
        
        //this.
        
        
    }
    
    init(entity){
        this.entity = entity;
        this.entity.body.allowGravity = false;
        
        this.setVelocityTwoardMouse();  
    }
    
    update(){//this is called in the gun update
        
    }
    
    onFire(){
        
    }
    
    onHit(){
        
    }
    
    onDie(){
=======
        this.velocity = new Phaser.Math.Vector2(0, 0);
        this.delete = false;
    } // constructor()

    init(entity) {
        this.entity = entity;
        this.entity.body.allowGravity = false;

        this.setVelocityTwoardMouse();
    } //init()

    update() { //this is called in the gun update
        if (this.entity.x < 0 || this.entity.x > this.scene.width || this.entity.y < 0 || this.entity.y > this.scene.height) {
            this.delete = true;
        }
    } //update()

    onFire() {

    } //onFire()

    onHit() {

    } //onHit()

    onDie() {
>>>>>>> Stashed changes
        //this.entity = null;
        this.owner = null;
        this.scene = null;
        this.entity.destroy();
<<<<<<< Updated upstream
    }
    
    setVelocityTwoardMouse(){
=======
    } //onDie()

    setVelocityTwoardMouse() {
>>>>>>> Stashed changes
        this.angle = this.scene.angleToMouseRad(this.entity);

        this.velocity.x = this.speed * Math.cos(this.angle);
        this.velocity.y = this.speed * Math.sin(this.angle);
<<<<<<< Updated upstream
        
        
        this.entity.body.setVelocity(this.velocity.x,this.velocity.y);
        
    }
    
    
    
}
=======

        this.entity.body.setVelocity(this.velocity.x, this.velocity.y);

    } //setVelocityTwoardMouse()
}
>>>>>>> Stashed changes
