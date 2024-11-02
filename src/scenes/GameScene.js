
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
        var cursors;
        var pWalk;
        var neckBall;
        this.jumping = false;
        this.falling = false;
        this.right   = false;
        this.left    = false;
    }

    preload() {
        this.load.image('neckBall', 'assets/images/neckBall.png');
    }

    create() {
        this.scene.bringToTop();
        var gameBackground = this.add.image(0,0, 'gameBackground').setOrigin(0,0);
        var netTorch = this.add.image(624 ,550, 'netTorch').setOrigin(0.5,0.5).setScale(1);
        var torchFire = this.add.sprite(622, 305, 'animFire').setScale(2).play('allfireframes');
        
        this.anims.create({ key: 'legsstand', frames: this.anims.generateFrameNames('animLegs', { prefix: 'stand_', end: 0, zeroPad: 4 }), framerate: 1, yoyo: false,  repeat: -1 });
        this.anims.create({ key: 'legswalk', frames: this.anims.generateFrameNames('animLegs', { prefix: 'walk_', end: 3, zeroPad: 4 }), framerate: 1, yoyo: false,  repeat: -1 });
        this.anims.create({ key: 'legsjump', frames: this.anims.generateFrameNames('animLegs', { prefix: 'jump_', end: 2, zeroPad:4 }), framerate: 1, yoyo: false, repeat: 0 });
    
        this.pWalk = this.add.sprite(400, 635, 'animLegs').setScale(2);//.play('legswalk');
        var pJump = this.add.sprite(600, 200, 'animLegs');//.play('legsjump');
        
        var start1 = this.add.sprite(624 ,125, 'start1').setOrigin(0.5,0.5).setScale(0);
        var start2 = this.add.sprite(624 ,125, 'start2').setOrigin(0.5,0.5).setScale(0);
        var start3 = this.add.sprite(624 ,125, 'start3').setOrigin(0.5,0.5).setScale(0);

        //matter physics stuff
        var physicsObjects = this.cache.json.get('shapes');
        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
    
        var ball = this.matter.add.sprite(60, 30, 'pumpkinBall', null, { shape: physicsObjects.pumpkinball });
        var net = this.matter.add.sprite(624, 550, 'netTorch', null, { shape: physicsObjects.nettorch }); 
        var lface = this.matter.add.sprite(50, 680, 'face1', null, {shape: { type: 'circle', radius: 50 }}).setBounce(0.9);
        var rface = this.matter.add.sprite(1230, 680, 'face2', null, {shape: { type: 'circle', radius: 50 }}).setBounce(0.9);

        this.neckBall = this.matter.add.image(400, 548, 'neckBall', null, { shape: 'circle', friction: 0.005, restitution: 0.6, isStatic: true });

        var neckCont = this.add.container(400, 548);
        //var matterEnabledContainer = this.matter.add.gameObject(neckCont);
    
        //  You can create a constraint between the two bodies using a Factory function.
        //  The value 100 is the resting length and 0.2 is the stiffness of the constraint.
    
        this.matter.add.constraint(this.neckBall, lface, 70, 2.0);

        //matterEnabledContainer.setExistingBody(neckBall);
    
        //  To help those of you more used to the Box2D syntax you can use
        //  add.joint or add.spring instead (with the exact same parameters)
    
        // this.matter.add.spring(ballA, ballB, 100, 0.2);
        // this.matter.add.joint(ballA, ballB, 100, 0.2);
    
        //  Or you can create a native Matter constraint:
    
        // var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
        //     bodyA: ballA.body,
        //     bodyB: ballB.body,
        //     length: 100,
        //     stiffness: 0.2
        // });
    
        this.matter.add.mouseSpring({ length: 1, stiffness: 0.6}); 

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        var timeline = this.tweens.createTimeline();

        timeline.add({
            targets: start3,
            scaleX: (0,0.75),
            scaleY: (0,0.75),
            ease: 'Linear',
            yoyo: true,
            duration: 400
        });

        timeline.add({
            targets: start2,
            scaleX: (0,0.75),
            scaleY: (0,0.75),
            yoyo: true,
            ease: 'Linear',
            duration: 400
        });

        timeline.add({
            targets: start1,
            scaleX: (0,0.75),
            scaleY: (0,0.75),
            yoyo: true,
            ease: 'Linear',
            duration: 400
        });

        var music = this.sound.add('startlevel', { loop: false});
        music.play();
        timeline.play();

    }

    update(time, delta) {
        // if (this.startKey.isDown) {
        //     this.startGame();
        // }

        //capture player input
        if (this.cursors.left.isDown)
        {
            this.left = true;
            this.right = false;
        }
        if (this.cursors.left.isUp)
        {
            this.left = false;
        }
        if (this.cursors.right.isDown)
        {
            this.right = true;
            this.left = false;
        }
        if (this.cursors.right.isUp)
        {
            this.right = false;
        }
        if (this.cursors.up.isDown && !this.jumping && !this.falling)
        {
            this.jumping = true;
        }
        if (this.cursors.down.isDown && !this.falling && this.jumping)
        {
            this.falling = true;
            this.jumping = false;
        }

        //handle player movement
        if (this.left) { this.pWalk.x -= 2; this.neckBall.body.x -= 2; this.pWalk.anims.playReverse('legswalk', true); this.right = false; }
        if (this.right) { this.pWalk.x += 2;  this.neckBall.body.x += 2; this.pWalk.anims.play('legswalk', true); this.left = false; }

        if (this.jumping)
        {
            this.pWalk.anims.play('legsjump', true);
            if (this.pWalk.y > 360)
            {
                this.pWalk.y -= 2;
            }
            if (this.pWalk.y <= 360)
            {
                this.jumping = false;
                this.falling = true;
            }
        }

        if (this.falling)
        {
            this.pWalk.anims.play('legsstand', true);            
            if (this.pWalk.y <= 635)
            {
                this.pWalk.y += 2;
            }
            else
            {
                this.pWalk.y = 635;
                this.falling = false;
            }
        }
        if (!this.left && !this.right && !this.jumping && !this.falling)
        {
            this.pWalk.anims.play('legsstand', true);
        }

    }
}

export default GameScene;
