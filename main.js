const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade', //this can be set to 'arcade' 'impact or 'matter' 
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: function () { //constructor equivilent//loads assets'
            this.load.image('default', 'data/default.png');
            this.load.image('bullet', 'data/bullet.png');
            
            this.load.image('delicousTeeth','data/FrogBoss.png');
            
            this.load.image('blood', 'data/Blood.png');


            


        },
        create: function () {
            this.player = new Player(this);
            this.player.init(this.physics.add.image(400, 300, 'default'));
            
            

            var player = this.player;
            
            
            
            this.input.keyboard.on('keydown-' + 'W', (e)=>{player.setDirFlags(1,true);});
            this.input.keyboard.on('keyup-' + 'W', (e) => {player.setDirFlags(1,false);});
            this.input.keyboard.on('keydown-' + 'UP', (e)=>{player.setDirFlags(1,true);});
            this.input.keyboard.on('keyup-' + 'UP', (e) => {player.setDirFlags(1,false);});
            
            this.input.keyboard.on('keydown-' + 'S', (e)=>{player.setDirFlags(2,true);});
            this.input.keyboard.on('keyup-' + 'S', (e) => {player.setDirFlags(2,false);});
            this.input.keyboard.on('keydown-' + 'DOWN', (e)=>{player.setDirFlags(2,true);});
            this.input.keyboard.on('keyup-' + 'DOWN', (e) => {player.setDirFlags(2,false);});
            
            this.input.keyboard.on('keydown-' + 'A', (e)=>{player.setDirFlags(3,true);});
            this.input.keyboard.on('keyup-' + 'A', (e) => {player.setDirFlags(3,false);});
            this.input.keyboard.on('keydown-' + 'LEFT', (e)=>{player.setDirFlags(3,true);});
            this.input.keyboard.on('keyup-' + 'LEFT', (e) => {player.setDirFlags(3,false);});
            
            this.input.keyboard.on('keydown-' + 'D', (e)=>{player.setDirFlags(4,true);});
            this.input.keyboard.on('keyup-' + 'D', (e) => {player.setDirFlags(4,false);});
            this.input.keyboard.on('keydown-' + 'RIGHT', (e)=>{player.setDirFlags(4,true);});
            this.input.keyboard.on('keyup-' + 'RIGHT', (e) => {player.setDirFlags(4,false);});
            
            this.input.keyboard.on('keydown-' + 'SPACE', (e)=>{player.fire(true);});
            this.input.keyboard.on('keyup-' + 'SPACE', (e) => {player.fire(false);});
            
            this.input.on('pointerdown', (e)=>{player.fire(true);});
            this.input.on('pointerup', (e)=>{player.fire(false);});
            

            

            //switch guns
            this.input.keyboard.on('keydown-' + 'R', (e) => {
                player.switchGun(1);
            });
            this.input.keyboard.on('keydown-' + 'E', (e) => {
                player.switchGun(-1);
            });

            this.input.keyboard.on('keydown-' + 'T', (e) => {
                this.spawnPowerup('bullet');
            });
            this.input.keyboard.on('keydown-' + 'G', (e) => {
                player.spawnGravityGrenade(true);
            });
            this.input.keyboard.on('keyup-' + 'G', (e) => {
                player.spawnGravityGrenade(false);
            });

            //this.input.keyboard.cursorKeys.on('keydown',function (event) { console.log("down");});
            
            
            this.bullets = this.physics.add.group();
            
            //this.bullets.defaults.allowGravity = false;
            //console.log(this.bullets.defaults);
            


            //this.physics.

            this.cursors = this.input.keyboard.createCursorKeys();
            
            this.angleToMouseRad = function(entity){
               
                let angle = Phaser.Math.Angle.Between(entity.x,entity.y,this.input.mousePointer.x,this.input.mousePointer.y);
                
               // angle += Math.PI*.5;
                
                
                return angle;
            }
            
            this.angleToMouseDeg = function(entity){
                let angle = this.angleToMouseRad(entity);
                
                return angle *= Phaser.Math.RAD_TO_DEG;
            }

            //console.log(this.angleToMouse(player.entity));
            
            this.enemyManager = new EnemyManager(player,this);
            this.enemyManager.init();
            this.enemyManager.addEnemy();
            this.enemyManager.addEnemy();
            this.enemyManager.addEnemy();
            this.enemyManager.addEnemy();
            this.enemyManager.addEnemy();
            
            //enemyManager.addEnemy();
            
            
            var bloodEmitter = this.add.particles('blood').createEmitter({
                x:400,
                y:400,
                speed: {min: -800, max: 800 }, 
                angle: {min: 0, max: 90 },
                scale: {start:0.5 , end: 0 }, 
                blendMode: 'SCREEN',
                //active: false,
                lifespan:200,
                gravityY:0
            });
            
            
            bloodEmitter.explode();
            bloodEmitter.explode();

        },
        update: function (time, delta) {

            this.player.update(delta / 1000);
            //this.player
            

        },


    }
};




const game = new Phaser.Game(config);
