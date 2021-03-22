

class Gun {
    
    constructor(owner){
        this.owner = owner;
        
        this.projectile = new Projectile();
        this.fireKeyPrev = false;
    }
    
    init(){
        
    }
    
    update(input){
        if(input.space.isDown && !this.fireKeyPrev){
            console.log("SHOOT");
        }
        this.fireKeyPrev = input.space.isDown;
    }
    
    fire(){
        //spawn projectile  
    }
    
    
    
}