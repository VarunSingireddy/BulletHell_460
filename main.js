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





        },
        create: function () {
            this.player = new Player();
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
            
            console.log(this.input);
            
           // this.input.mouse.onMouseDown();
            
            this.input.keyboard.on('keydown-' + 'SPACE', (e)=>{player.fire(true);});
            this.input.keyboard.on('keyup-' + 'SPACE', (e) => {player.fire(false);});
            
            this.input.on('pointerdown', (e)=>{player.fire(true);});
            this.input.on('pointerup', (e)=>{player.fire(false);});
            

            //this.input.keyboard.cursorKeys.on('keydown',function (event) { console.log("down");});
            
            



            //this.physics.

            this.cursors = this.input.keyboard.createCursorKeys();



        },
        update: function (time, delta) {

            this.player.update(delta / 1000);



        },


    }
};




const game = new Phaser.Game(config);
