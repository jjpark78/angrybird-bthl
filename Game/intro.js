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

        var IntroItem = cc.MenuItemImage.create("sprites/bg.png","sprites/bg.png", this.onMainMenuCallback, this);
        IntroItem.setScale(1.8);
		var imageMenu = cc.Menu.create(IntroItem);
        IntroItem.setPosition(0,0);

        this.addChild(imageMenu, 1);
    },
    onMainMenuCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new Intro1Scene();
        scene.addChild(layer);

        var ag = cc.AudioEngine.getInstance();
		ag.playMusic(bgm_sound, true);
		ag.setMusicVolume(0.2);

        var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
    },
});

var Intro1Scene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

        var IntroItem = cc.MenuItemImage.create("sprites/intro1.png","sprites/intro1.png", this.onMainMenuCallback, this);
        IntroItem.setScale(1);
		var imageMenu = cc.Menu.create(IntroItem);
        IntroItem.setPosition(0,0);

        this.addChild(imageMenu, 1);
    },
    onMainMenuCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new Intro2Scene();
        scene.addChild(layer);

        var ag = cc.AudioEngine.getInstance();
		ag.playMusic(bgm_sound, true);
		ag.setMusicVolume(0.2);

        var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
    },
});


var Intro2Scene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

            var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

        var IntroItem = cc.MenuItemImage.create("sprites/intro2.png","sprites/intro2.png", this.onMainMenuCallback, this);
        IntroItem.setScale(1);
		var imageMenu = cc.Menu.create(IntroItem);
        IntroItem.setPosition(0,0);

        this.addChild(imageMenu, 1);
    },
    onMainMenuCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new Intro3Scene();
        scene.addChild(layer);

        var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
    },
});

var Intro3Scene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

            var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

        var IntroItem = cc.MenuItemImage.create("sprites/intro3.png","sprites/intro3.png", this.onMainMenuCallback, this);
        IntroItem.setScale(1);
		var imageMenu = cc.Menu.create(IntroItem);
        IntroItem.setPosition(0,0);

        this.addChild(imageMenu, 1);
    },
    onMainMenuCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new Intro4Scene();
        scene.addChild(layer);

		var ag = cc.AudioEngine.getInstance();
		//ag.playMusic(bgm_sound, true);
		ag.setMusicVolume(0.2);

        var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
    },
});

var Intro4Scene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

            var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

        var IntroItem = cc.MenuItemImage.create("sprites/intro4.png","sprites/intro4.png", this.onMainMenuCallback, this);
        IntroItem.setScale(1);
		var imageMenu = cc.Menu.create(IntroItem);
        IntroItem.setPosition(0,0);

        this.addChild(imageMenu, 1);
    },
    onMainMenuCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new GameScene();
        scene.addChild(layer);

		var ag = cc.AudioEngine.getInstance();
		//ag.playMusic(bgm_sound, true);
		ag.setMusicVolume(0.2);

        var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
    },
});
