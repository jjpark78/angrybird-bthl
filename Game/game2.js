// Author: www.mahdi7s.com

var CMenu = cc.Sprite.extend({
    defaultScale: 0.8,
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

        if (cc.Rect.CCRectContainsPoint(this.boundingBox, point)) {
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
    birdStartPos: cc.p(360, 240.5),
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
            scale: 1.6,
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

        var sling1Sprite = this.addObject({
            name: "sling1",
            x: 404.5,
            y: 19.5,
            scale: 1.2,
            anchor: cc.p(1, 0)
        });
        var sling2Sprite = this.addObject({
            name: "sling2",
            x: 375.5,
            y: 120,
            scale: 1.2,
            anchor: cc.p(1, 0),
            z: 3
        });
        this.slingRubber1 = this.addObject({
            name: "sling3",
            x: 385,
            y: 230,
            scaleY: 0.7,
            scaleX: 0,
            anchor: cc.p(1, 0.5),
            z: 0
        });
        this.slingRubber2 = this.addObject({
            name: "sling3",
            x: 350,
            y: 240,
            scaleY: 0.7,
            scaleX: 0,
            anchor: cc.p(1, 0.5),
            z: 2
        });
        this.slingRubber3 = null;
        
        var enemyHealth = 500,
            tempEnemyObj = {
                name: "enemy",
                type: "dynamic",
                shape: "circle",
                density: 15,
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
        this.birdSprite = this.addObject({
            name: "bird",
            x: 360, 
            y: 240.5,
            z: 1
        });
    
        // enemy1
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,100),
        tempEnemyObj.x = tempBoxObj.x = 981.5, tempEnemyObj.y = 771, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // enemy2
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,200),
        tempEnemyObj.x = tempBoxObj.x = 1231.5, tempEnemyObj.y = 851, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // enemy3
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,300),
        tempEnemyObj.x = tempBoxObj.x = 1531.5, tempEnemyObj.y = 771, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // enemy4
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,400),
        tempEnemyObj.x = tempBoxObj.x = 1031.5, tempEnemyObj.y = 571, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // enemy5
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,500),
        tempEnemyObj.x = tempBoxObj.x = 1231.5, tempEnemyObj.y = 671, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // enemy6
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,600),
        tempEnemyObj.x = tempBoxObj.x = 1431.5, tempEnemyObj.y = 571, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // enemy7
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,700),
        tempEnemyObj.x = tempBoxObj.x = 1081.5, tempEnemyObj.y = 371, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // enemy8
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,800),
        tempEnemyObj.x = tempBoxObj.x = 1231.5, tempEnemyObj.y = 471, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);
        // enemy9
        tempEnemyObj.userData = new BodyUserData(GameObjectRoll.Enemy, enemyHealth,900),
        tempEnemyObj.x = tempBoxObj.x = 1381.5, tempEnemyObj.y = 371, tempBoxObj.y = tempEnemyObj.y - 20;
        this.addObject(tempEnemyObj), this.addObject(tempBoxObj);

        // --------- Top Menu ! ---------
        var margin = 25,
            backMenu = new CMenu(this.getTexture("menu_back"));

        var refreshMenu = new CMenu(this.getTexture("menu_refresh"));
        refreshMenu.setPosition(cc.p(25, winSize.height - margin));
        refreshMenu.onClick(function () {
            var transition = cc.TransitionFade.create(0.5,new GameScene());
            director.replaceScene(transition);
        });
        this.addChild(refreshMenu);
        this.menus.push(refreshMenu);
        

        // --------- My Score ! ---------

        var scoreLabel = cc.LabelTTF.create("0", "fantasy", 50, cc.size(0, 0), cc.TEXT_ALIGNMENT_LEFT);
        scoreLabel.setPosition(cc.p(winSize.width - 80, winSize.height));
        scoreLabel.schedule(function () {
            var showingScore = parseInt(scoreLabel.getString());
            if (showingScore < b2.getUserScore()) {
                scoreLabel.setString((showingScore + 5)
                    .toString());
            }
        });
        this.addChild(scoreLabel, 5);

        this.scheduleUpdate();
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
                density: 50,
                restitution: 0.8,
                userData: new BodyUserData(GameObjectRoll.Bird, 4000)
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


var GameLayer2 = cc.Layer.extend({
    menus: [],
    getTexture: function (name) {
        return cc.TextureCache.getInstance()
            .addImage('sprites/' + name + '.png');
    },
    init: function () {
        this._super();
        this.removeAllChildrenWithCleanup(true);
        this.setTouchEnabled(true);

        var director = cc.Director.getInstance(),
            self = this,
            winSize = director.getWinSize();

        b2.initWorld();

        var scoreLabel = cc.LabelTTF.create("Retry", "fantasy", 50, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER);
        scoreLabel.setPosition(cc.p(winSize.width/2+ 60, winSize.height/2 + 100));
        scoreLabel.setColor(cc.c3b(0, 0, 0));
        this.addChild(scoreLabel, 5);

        var refreshMenu = new CMenu(this.getTexture("menu_refresh"));
        refreshMenu.setPosition(cc.p(winSize.width/2, winSize.height/2));
        refreshMenu.onClick(function () {
            var transition = cc.TransitionFade.create(0.5,new GameScene());
            director.replaceScene(transition);
        });
        this.addChild(refreshMenu);
        this.menus.push(refreshMenu);

        this.scheduleUpdate();
    },
    update: function (dt) {
    },
    onTouchesBegan: function (touch, evt) {
        this.menus.forEach(function (menu) {
            menu.handleTouches(touch, evt);
        });
    },
    onTouchesMoved: function (touch, evt) {
        this.menus.forEach(function (menu) {
            menu.handleTouchesMoved(touch, evt);
        });
    },
    onTouchesEnded: function (touch, evt) {
        this.menus.forEach(function (menu) {
            menu.handleTouchesEnded(touch, evt);
        });
    },
    onKeyUp: function (e) {},
    onKeyDown: function (e) {}
});

//--------------------- Scene ---------------------

var GameScene2 = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new GameLayer2();
        layer.init();

        this.addChild(layer);
    }
});

//--------------------- Scene ---------------------

var StartScene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

        var label = cc.LabelTTF.create("Game Start", "fantasy", 50, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER);
		label.setColor(cc.c3b(0, 0, 0));
        var menuItem = cc.MenuItemLabel.create(label, this.onMainMenuCallback, this);
        var menu = cc.Menu.create(menuItem);
        menu.setPosition(0,0);
        menuItem.setPosition(winSize.width/2+ 120, winSize.height/2 + 100);

        var menuItem = cc.MenuItemImage.create("sprites/bg.png","sprites/bg.png", this.onMainMenuCallback, this);
		var imageMenu = cc.Menu.create(menuItem);
        menuItem.setPosition(0,0);

        this.addChild(imageMenu, 1);
        this.addChild(menu, 2);
    },
    onMainMenuCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new GameScene();
        scene.addChild(layer);

		cc.AudioEngine.getInstance().playMusic("resources/loop.mp3");

        var transition = cc.TransitionProgressRadialCCW.create(0.5,scene);
        director.replaceScene(transition);
    },
});