

class Gun {
    
    constructor(owner){
        this.owner = owner;
        this.projectile = new Projectile();
        this.canFire = false;
        this.fireKeyPrev = false;
    }
    
    init(){
        
    }
    
    update(){
        
        this.fireKeyPrev = this.canFire;
    }
    
    fire(bool){
        
        this.canFire = bool;
    }
    
    
    
}