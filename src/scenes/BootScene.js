class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene',
            pack: {
                files: [
                     { type: 'image', key: 'psLoadScreen', url: 'assets/images/psLoadScreen.png' } 
                    ]
            }
        });
    }

    resize() {
        var canvas = document.querySelector("canvas");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowRatio = windowWidth / windowHeight;
        var gameRatio = this.game.config.width / this.game.config.height;
        if(windowRatio < gameRatio){
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
        }
        else{
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    }
    preload() {
        this.resize();
        window.addEventListener("resize", this.resize, false);

        var title = this.add.image(360,60, 'psLoadScreen').setOrigin(0,0);

        const progressBox = this.add.graphics();
        const progressBar = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(20, this.sys.game.config.height * 0.75 - 10, this.sys.game.config.width - 20, 50);

        var loadingText = this.make.text({
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height * 0.75 - 30,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height * 0.75 + 15,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        

       
        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffa500, 1);
            progressBar.fillRect(30, this.sys.game.config.height * 0.75, this.sys.game.config.width * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.image('psBackground', 'assets/images/psBackground.png'); // 16-bit later
        this.load.image('psTitleScreen', 'assets/images/psTitleScreen.png');
        this.load.image('psTorchbase', 'assets/images/torchbase.png'); 
        this.load.image('netTorch', 'assets/images/netTorch.png');
        this.load.image('psStartbutton', 'assets/images/startButton.png');
        this.load.image('gameBackground', 'assets/images/gameBackground.png');
        this.load.image('pumpkinBall', 'assets/images/pumpkin_clear.png');
        // Load body shapes from JSON file generated using PhysicsEditor
        this.load.json('shapes', 'assets/images/physicsObjects.json');

        this.load.image('face1', 'assets/images/Face1.png');
        this.load.image('face2', 'assets/images/Face2.png');
        this.load.image('face3', 'assets/images/Face3.png');
        this.load.image('face4', 'assets/images/Face4.png');
        this.load.image('face5', 'assets/images/Face5.png');
        this.load.image('face6', 'assets/images/Face6.png');

        this.load.image('start3', 'assets/images/3.png');
        this.load.image('start2', 'assets/images/2.png');
        this.load.image('start1', 'assets/images/1.png');

        this.load.image('audioOn', 'assets/images/AudioOn.png');
        this.load.image('audioOff', 'assets/images/AudioOff.png');

        this.load.atlas('ps-sprites', 'assets/images/Sprites.png', 'assets/images/Sprites.json');
        this.load.atlas('animPumpkin', 'assets/images/anim_pumpkin.png', 'assets/images/anim_pumpkin.json');
        this.load.atlas('animFire', 'assets/images/anim_fire_clear.png', 'assets/images/anim_fire.json');        
        this.load.atlas('animLegs', 'assets/images/anim_legs.png', 'assets/images/anim_legs.json'); 
               
        this.load.audio('creepy', [
            'assets/music/creepy.ogg',
            'assets/music/creepy.mp3'
        ]);

        this.load.audio('startlevel', [
            'assets/audio/startlevel.ogg',
            'assets/audio/startlevel.mp3'
        ]);


        // Sound effects in a audioSprite.
        this.load.audioSprite('psSounds', 'assets/audio/psSounds.json', [
            'assets/audio/psSounds.ogg',
            'assets/audio/psSounds.mp3'
        ], {
            instances: 4
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            title.destroy();
            progressBox.destroy();
            progressBar.destroy();
            loadingText.destroy();
            percentText.destroy();

            this.scene.start('TitleScene');
        });

    }
    create() {

    }
}

export default BootScene;
