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

        // --------- Top Menu ! ---------

        var refreshMenu = new CMenu(this.getTexture("menu_refresh"));
        refreshMenu.setPosition(cc.p(winSize.width/2, winSize.height/2));
        refreshMenu.onClick(function () {
            window.location.href = "index.html";
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

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new GameLayer();
        layer.init();

        this.addChild(layer);
    }
});