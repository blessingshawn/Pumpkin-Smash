

class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TitleScene'
        });
        this.audioMute = false;
    }
    preload() {
        
    }
    create() {
        this.scene.bringToTop();

        var title = this.add.image(0,0, 'psTitleScreen').setOrigin(0,0);
        var lTorch = this.add.image(67,240, 'psTorchbase').setOrigin(0.5,0.5);
        var rTorch = this.add.image(1217,240, 'psTorchbase').setOrigin(0.5,0.5);
        var startButton = this.add.image(620,632, 'psStartbutton').setOrigin(0.5,0.5);
        startButton.setInteractive({ useHandCursor: true});
        
        this.tweens.add({
            targets: startButton,
            scaleX: 1.1,
            scaleY: 1.1,
            ease: 'Sine.easeInOut',
            duration: 300,
            delay: 50,
            repeat: -1,
            yoyo: true,
            repeatDelay: 50
        });
                
        startButton.on('pointerdown', () => {
            music.stop();
            lpumpkin.destroy();
            rpumpkin.destroy();
            lfire.destroy();
            rfire.destroy();
            music.destroy();

            this.scene.start('GameScene');
        });

        this.anims.create({ key: 'allpumpkinframes', frames: this.anims.generateFrameNames('animPumpkin'), repeat: -1 });
        this.anims.create({ key: 'allfireframes', frames: this.anims.generateFrameNames('animFire'), repeat: -1 });
        var lpumpkin = this.add.sprite(65, 630, 'animPumpkin').setScale(1).play('allpumpkinframes');
        var rpumpkin = this.add.sprite(1215, 630, 'animPumpkin').setScale(1).play('allpumpkinframes');
        var lfire = this.add.sprite(65, 50, 'animFire').setScale(2).play('allfireframes');
        var rfire = this.add.sprite(1215, 50, 'animFire').setScale(2).play('allfireframes');        

        var music = this.sound.add('creepy', { loop: true});
        music.play();

        if (music.isPlaying) {
            
            var audioButton = this.add.image(1255,55, 'audioOn').setOrigin(0.5,0.5).setScale(0.5,0.5);
            audioButton.setInteractive({ useHandCursor: true});
            this.audioMute = false;
        }
        else {
            var audioButton = this.add.image(1255,55, 'audioOff').setOrigin(0.5,0.5).setScale(0.5,0.5);
            audioButton.setInteractive({ useHandCursor: true});
            this.audioMute = true;
        }

        audioButton.on('pointerdown', () => {
            if (this.audioMute) {
                music.setMute(false);
                music.play();
                if (music.isPlaying) {
                    audioButton.setTexture('audioOn').setOrigin(0.5,0.5);;
                    this.audioMute = false;
                }
            }
            else {
                music.setMute(true);
                audioButton.setTexture('audioOff').setOrigin(0.5,0.5);;
                this.audioMute = true;
            }
        });

    }

    update(time, delta) {
        // if (this.startKey.isDown) {
        //     this.startGame();
        // }
    }

    startGame() {
        // this.scene.stop('GameScene');
        // this.registry.set('attractMode', false);
        // this.scene.start('GameScene');
    }

    restartScene() {
        //        this.attractMode.stop();
        // this.scene.stop('GameScene');
        // this.scene.launch('GameScene');
        // this.scene.bringToTop();

        // this.registry.set('restartScene', false);

    }
}

export default TitleScene;
