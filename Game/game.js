// Author: www.mahdi7s.com

var CMenu = cc.Sprite.extend({
    defaultScale: 0.6,
    hovered: false,
    boundingBox: null,
    onClickCallback: null,
    ctor: function (tex) {
        this._super();
        this.initWithTexture(tex);
        this.setScale(this.defaultScale);
    },
    onClick: function (callback) {
        this.onClickCallback = callback;
    },
    handleTouches: function (touch, evt) {
        (this.hovered && this.onClickCallback) && this.onClickCallback();
    },
    handleTouchesMoved: function (touch, evt) {
        var point = touch[0].getLocation();

        this.boundingBox || (this.boundingBox = this.getBoundingBox());

        if (cc.rectContainsPoint(this.boundingBox, point)) {
            if (!this.hovered) {
                this.hovered = true;
                this.runAction(cc.ScaleTo.create(0.01, 1));
            }
        } else if (this.hovered) {
            this.hovered = false;
            this.runAction(cc.ScaleTo.create(0.01, this.defaultScale));
        }
    },
    handleTouchesEnded: function (touch, evt) {}
});

var GameLayer = cc.Layer.extend({
    birdSprite: null,
    isDraggingSling: false,
    birdStartPos: cc.p(382, 395),
    slingRadius: {
        min: 20,
        max: 220
    },
    slingAngle: {
        min: cc.DEGREES_TO_RADIANS(250),
        max: cc.DEGREES_TO_RADIANS(295)
    },
    smokeDistance: 16,
    menus: [],
    lastSmoke: null,
    slingRubber1: null,
    slingRubber2: null,
    slingRubber3: null,
    getTexture: function (name) {
        return cc.TextureCache.getInstance()
            .addImage('sprites/' + name + '.png');
    },
    addObject: function (desc) {
        var sprite = cc.Sprite.createWithTexture(this.getTexture(desc.name));

        sprite.setAnchorPoint(desc.anchor || cc.p(0.5, 0.5));
        sprite.setScaleX(desc.scaleX || desc.scale || 1);
        sprite.setScaleY(desc.scaleY || desc.scale || 1);
        sprite.setRotation(desc.rotation || 0);
        sprite.setPosition(cc.p(desc.x || 0, desc.y || 0));

        desc.shape && b2.enablePhysicsFor({
            type: desc.type,
            shape: desc.shape,
            sprite: sprite,
            radius: desc.radius,
            density: desc.density,
            userData: desc.userData
        });

        this.addChild(sprite, desc.z || 0);
        return sprite;
    },
    init: function () {
        this._super();
        this.removeAllChildrenWithCleanup(true);
        this.setTouchEnabled(true);

        var director = cc.Director.getInstance(),
            self = this,
            winSize = director.getWinSize();

        b2.initWorld();

        var bgSprite = this.addObject({
            name: "bg",
            scale: 1.8,
            anchor: cc.p(0, 0),
            z: -1
        });

        var groundY0Sprite = this.addObject({
            name: "ground",
            scaleX: 3.5,
            scaleY: 0.7,
            anchor: cc.p(0, 0),
            type: "static",
            shape: "box",
            density: 0
        });
        var groundY0Sprite = this.addObject({
            name: "ground",
            scaleX: 3.5,
            scaleY: 0.001,
            y:980,
            anchor: cc.p(0, 0),
            type: "static",
            shape: "box",
            density: 0
        });

        var stageX0Sprite = this.addObject({
            name: "ground",
            scaleX: 0.0001,
            scaleY: 300,
            x: 0,
            anchor: cc.p(0, 0),
            type: "static",
            shape: "box",
            density: 0
        });
        var stageX1Sprite = this.addObject({
            name: "ground",
            scaleX: 0.0001,
            scaleY: 300,
            x: 1820,
            anchor: cc.p(0, 0),
            type: "static",
            shape: "box",
            density: 0
        });

        this.birdSprite = this.addObject({
            name: "bird",
            x: 382, 
            y: 395,
            z: 1,
            scale:0.15
        });
        this.addObject({
            name: "poll",
            x: 424.5,
            y: 358,
            scale: 0.1,
        });
        this.addObject({
            name: "poll",
            x: 350.5,
            y: 338,
            z: 3,
            scale: 0.1,
        });
        this.slingRubber1 = this.addObject({
            name: "sling3",
            x: 425,
            y: 410,
            scaleY: 0.7,
            scaleX: 0,
            anchor: cc.p(1, 0.5),
            z: 0
        });
        this.slingRubber2 = this.addObject({
            name: "sling3",
            x: 350,
            y: 380,
            scaleY: 0.7,
            scaleX: 0,
            anchor: cc.p(1, 0.5),
            z: 2
        });
        this.slingRubber3 = null;
        
        var enemyHealth = 1000,
            yPositionMargin = 1,
            tempEnemyObj = {
                name: "goal01",
                type: "dynamic",
                shape: "circle",
                density: 15,
                scale:1.5,
            },
            tempBoxObj = {
                name: "platform",
                scaleX: 0.00001,
                scaleY: 0.00001,
                anchor: cc.p(0, 0),
                type: "static",
                shape: "box",
                density: 0
            };
    
        var goal_position_arr = [
            {x:1000, y:550},
            {x:1250, y:750},
            {x:1500, y:550},
            {x:1100, y:300},
            {x:1400, y:300},
        ];
        goal_position_arr.sort((a, b) => 0.5 - Math.random());
        // goal1
        tempEnemyObj.name = "goal01",
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,1),
        tempEnemyObj.x = tempBoxObj.x = goal_position_arr[0].x, tempEnemyObj.y = goal_position_arr[0].y, tempBoxObj.y = tempEnemyObj.y - yPositionMargin;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // goal2
        tempEnemyObj.name = "goal02",
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,2),
        tempEnemyObj.x = tempBoxObj.x = goal_position_arr[1].x, tempEnemyObj.y = goal_position_arr[1].y, tempBoxObj.y = tempEnemyObj.y - yPositionMargin;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // goal3
        tempEnemyObj.name = "goal03",
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,3),
        tempEnemyObj.x = tempBoxObj.x = goal_position_arr[2].x, tempEnemyObj.y = goal_position_arr[2].y, tempBoxObj.y = tempEnemyObj.y - yPositionMargin;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // goal4
        tempEnemyObj.name = "goal04",
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,4),
        tempEnemyObj.x = tempBoxObj.x = goal_position_arr[3].x, tempEnemyObj.y = goal_position_arr[3].y, tempBoxObj.y = tempEnemyObj.y - yPositionMargin;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // goal5
        tempEnemyObj.name = "goal05",
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,5),
        tempEnemyObj.x = tempBoxObj.x = goal_position_arr[4].x, tempEnemyObj.y = goal_position_arr[4].y, tempBoxObj.y = tempEnemyObj.y - yPositionMargin;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);

        var refreshItem = cc.MenuItemImage.create("sprites/menu_refresh.png","sprites/menu_refresh.png", this.onRefreshCallback, this);
        var imageMenu = cc.Menu.create(refreshItem);
        refreshItem.setPosition(0,0);
        refreshItem.setScale(2);
        imageMenu.setPosition(80, winSize.height - 80);
        this.addChild(imageMenu, 999);

        this.scheduleUpdate();
    },
	onRefreshCallback: function () {
        var director = cc.Director.getInstance();
        var scene = cc.Scene.create();
        var layer = new GameScene();
        scene.addChild(layer);
        result_arr = [];

		var ag = cc.AudioEngine.getInstance();
		//ag.playMusic(bgm_sound, true);
		ag.setMusicVolume(0.2);

        var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
	},
    update: function (dt) {
        b2.simulate();

        if (this.birdSprite.body) {
            var bData = this.birdSprite.body.GetUserData();
            if (!bData || bData.isContacted) return;

            var birdPos = this.birdSprite.getPosition(),
                vector = cc.pSub(birdPos, (this.lastSmoke && this.lastSmoke.getPosition()) || cc.p(0, 0)),
                length = cc.pLength(vector);

            if (length >= this.smokeDistance) {
                this.lastSmoke = this.addObject({
                    name: "smoke",
                    x: birdPos.x,
                    y: birdPos.y,
                    scale: Math.random() >= 0.5 ? 0.8 : 0.6
                });
            }
        }
    },
    onTouchesBegan: function (touch, evt) {
        this.menus.forEach(function (menu) {
            menu.handleTouches(touch, evt);
        });

        var currPoint = touch[0].getLocation(),
            vector = cc.pSub(this.birdStartPos, currPoint);

        if ((this.isDraggingSling = (cc.pLength(vector) < this.slingRadius.max)) && !this.birdSprite.body && !this.slingRubber3) {
            this.slingRubber3 = this.addObject({
                name: "sling3",
                x: currPoint.x,
                y: currPoint.y,
                scaleY: 1.5,
                scaleX: 2,
                anchor: cc.p(0, 0.5),
                z: 1
            });
        }
    },
    onTouchesMoved: function (touch, evt) {
        this.menus.forEach(function (menu) {
            menu.handleTouchesMoved(touch, evt);
        });

        if (!this.isDraggingSling || this.birdSprite.body) return;

        var currPoint = touch[0].getLocation(),
            vector = cc.pSub(currPoint, this.birdStartPos),
            radius = cc.pLength(vector),
            angle = cc.pToAngle(vector);

        angle = angle < 0 ? (Math.PI * 2) + angle : angle;
        radius = MathH.clamp(radius, this.slingRadius.min, this.slingRadius.max);
        if (angle <= this.slingAngle.max && angle >= this.slingAngle.min) {
            radius = this.slingRadius.min;
        }

        this.birdSprite.setPosition(cc.pAdd(this.birdStartPos, cc.p(radius * Math.cos(angle), radius * Math.sin(angle))));

        var updateRubber = function (rubber, to, lengthAddon, topRubber) {
            var from = rubber.getPosition(),
                rubberVec = cc.pSub(to, from),
                rubberAng = cc.pToAngle(rubberVec),
                rubberDeg = cc.RADIANS_TO_DEGREES(rubberAng),
                length = cc.pLength(rubberVec) + (lengthAddon || 8);

            rubber.setRotation(-rubberDeg);
            rubber.setScaleX(-(length / rubber.getContentSize()
                .width));

            if (topRubber) {
                rubber.setScaleY(1.1 - ((0.7 / this.slingRadius.max) * length));
                this.slingRubber3.setRotation(-rubberDeg);
                this.slingRubber3.setPosition(cc.pAdd(from, cc.p((length) * Math.cos(rubberAng), (length) * Math.sin(rubberAng))));
            }
        }.bind(this);

        var rubberToPos = this.birdSprite.getPosition();
        updateRubber(this.slingRubber2, rubberToPos, 13, true);
        updateRubber(this.slingRubber1, rubberToPos, 0);
        this.slingRubber1.setScaleY(this.slingRubber2.getScaleY());
    },
    onTouchesEnded: function (touch, evt) {
        this.menus.forEach(function (menu) {
            menu.handleTouchesEnded(touch, evt);
        });

        if (!this.birdSprite.body && this.isDraggingSling) {
            this.slingRubber1.setVisible(false);
            this.slingRubber2.setVisible(false);
            this.slingRubber3.setVisible(false);

            b2.enablePhysicsFor({
                type: "dynamic",
                shape: "circle",
                sprite: this.birdSprite,
                density: 22,
                restitution: 0.8,
                userData: new BodyUserData(GameObjectRoll.Bird, 10000)
            });

            var vector = cc.pSub(this.birdStartPos, this.birdSprite.getPosition()),
                impulse = cc.pMult(vector, 12),
                bPos = this.birdSprite.body.GetWorldCenter();

            this.birdSprite.body.ApplyImpulse(impulse, bPos);

            this.isDraggingSling = false;
        }
    },
    onKeyUp: function (e) {},
    onKeyDown: function (e) {}
});

//--------------------- Scene ---------------------
var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new GameLayer();
        layer.init();

        this.addChild(layer);
    }
});