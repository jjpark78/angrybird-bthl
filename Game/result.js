var ResultScene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();

        // 적중한 목표들 배치
        result_arr.sort();
        var x_interval = 200, start_x = x_interval * -1 * (result_arr.length-1), count_idx = 0;
        start_x += (x_interval/2) * (result_arr.length - 1);
        result_arr.forEach((e) => {
            var ResultItem = cc.MenuItemImage.create(`sprites/goal0${e}.png`,`sprites/goal0${e}.png`, this.onMainMenuCallback, this);
            ResultItem.setScale(1.3);
            ResultItem.setPosition(start_x + x_interval * count_idx , 0);
            var imageMenu = cc.Menu.create(ResultItem);
            this.addChild(imageMenu, 99);
            count_idx++;
        });

        var FinishBGItem = cc.MenuItemImage.create(`sprites/${language_code}_outro.png`,`sprites/${language_code}_outro.png`, this.onMainMenuCallback, this);
        FinishBGItem.setScaleY(982/1024);
        FinishBGItem.setPosition(0,1);
        var bgMenu = cc.Menu.create(FinishBGItem);
        this.addChild(bgMenu, 2);

        var refreshItem = cc.MenuItemImage.create("sprites/menu_refresh.png","sprites/menu_refresh.png", this.onRefreshCallback, this);
        var imageMenu = cc.Menu.create(refreshItem);
        refreshItem.setPosition(0,0);
        refreshItem.setScale(2);
        imageMenu.setPosition(80, winSize.height - 80);
        this.addChild(imageMenu, 999);
    },
    onMainMenuCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new CongratulationScene();
        scene.addChild(layer);
		result_arr = [];

        director.replaceScene(scene);
        return;
    },
    onRefreshCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new GameScene();
        scene.addChild(layer);
		result_arr = [];

		var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
        return;
    },
});

var CongratulationScene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        
        var CongraluationImage1 = cc.MenuItemImage.create(`sprites/${language_code}_outro1.png`,`sprites/${language_code}_outro1.png`, this.onMainMenuCallback, this);
        CongraluationImage1.setScaleY(980/1024);
        var imageMenu1 = cc.Menu.create(CongraluationImage1);
        var image1ZorderFlag = false;
        imageMenu1.schedule(function () {
            if (image1ZorderFlag) { imageMenu.setZOrder(10); }
            else { imageMenu.setZOrder(-1); }
            image1ZorderFlag = !image1ZorderFlag;
        }, 0.5);
        this.addChild(imageMenu1, 1);

        var CongraluationImage2 = cc.MenuItemImage.create(`sprites/${language_code}_outro2.png`,`sprites/${language_code}_outro2.png`, this.onMainMenuCallback, this);
        CongraluationImage2.setScaleY(980/1024);
        var imageMenu2 = cc.Menu.create(CongraluationImage2);
        var image2ZorderFlag = false;
        imageMenu2.schedule(function () {
            if (image2ZorderFlag) { imageMenu2.setZOrder(10); }
            else { imageMenu2.setZOrder(-1); }
            image2ZorderFlag = !image2ZorderFlag;
        }, 0.5);
        this.addChild(imageMenu2, 2);

        var FinishBGItem = cc.MenuItemImage.create(`sprites/${language_code}_outro.png`,`sprites/${language_code}_outro.png`, this.onMainMenuCallback, this);
        FinishBGItem.setScaleY(980/1024);
        FinishBGItem.setPosition(0,0);
        var imageMenu = cc.Menu.create(FinishBGItem);
        this.addChild(imageMenu, 5);
    },
    onMainMenuCallback:function () {
        var director = cc.Director.getInstance(),
            winSize = director.getWinSize();
        var scene = cc.Scene.create();
        var layer = new Intro1Scene();
        scene.addChild(layer);
		result_arr = [];

		var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
        return;
    },
});