class Enemy{
    
    constructor(player,scene){ 
        this.scene = scene;
        this.player = player;
        
        this.health = 1;
        this.delete = false;
        
        this.isBurning = false;
        this.isSlow = false;
        this.radius = 50;
        
    }
    
    
    init(entity){
        this.entity = entity;
        this.entity.body.allowGravity = false;
        this.entity.body.allowDrag = true;
        this.entity.body.drag = new Phaser.Math.Vector2(500,500);
    }
    
    
    update(){
        //console.log('asd');
        if(this.health<=0){
            this.delete = true;
            
        }
        
    }
    
    reciveDamage(damage){
        this.health -= damage;
    }
    
    onDie(){
        this.entity.destroy();
       //this.entity.active = false;
    }
    
    
}