var RetryLayer = cc.Layer.extend({
  menus: [],
  getTexture: function (name) {
    return cc.TextureCache.getInstance().addImage("sprites/" + name + ".png");
  },
  init: function () {
    this._super();
    this.removeAllChildrenWithCleanup(true);
    this.setTouchEnabled(true);

    var director = cc.Director.getInstance(),
      self = this,
      winSize = director.getWinSize();

    b2.initWorld();

    var RetryBGItem = cc.MenuItemImage.create(
      "sprites/retry.png",
      "sprites/retry.png",
      this.onMainMenuCallback,
      this
    );
    RetryBGItem.setScale(1.8);
    RetryBGItem.setPosition(0, 0);
    imageMenu = cc.Menu.create(RetryBGItem);
    this.addChild(imageMenu, 1);

    this.scheduleUpdate();
  },
  onMainMenuCallback: function () {
    var director = cc.Director.getInstance();
    var scene = cc.Scene.create();
    var layer = new GameScene();
    scene.addChild(layer);
    result_arr = [];

    var transition = cc.TransitionFade.create(0.5, scene);
    director.replaceScene(transition);
  },
  update: function (dt) {},
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
  onKeyDown: function (e) {},
});

//--------------------- Scene ---------------------

var RetryScene = cc.Scene.extend({
  onEnter: function () {
    this._super();

    var layer = new RetryLayer();
    layer.init();

    this.addChild(layer);
  },
});
