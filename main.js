


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
            this.load.image('default','data/default.png');
            this.load.image('bullet','data/bullet.png');
            
           
        },
        create: function () { 
            this.player = new Player();
            this.player.init(this.physics.add.image(400,300,'default'));
            //this.physics.
            
            this.cursors = this.input.keyboard.createCursorKeys();
            
            

        },
        update: function (time, delta) {
            
            this.player.update(this.cursors,delta/1000);
            

            
        },


    }
};




const game = new Phaser.Game(config);