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

        var label = cc.LabelTTF.create("Congratulations!", "fantasy", 50, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER);
        label.setColor(cc.c3b(0,0,0));
        var menuItem = cc.MenuItemLabel.create(label, this.onMainMenuCallback, this);
        var menu = cc.Menu.create(menuItem);
        menu.setPosition(0,0);
        menuItem.setPosition(winSize.width/2, winSize.height/2 + 200);
        this.addChild(menu, 999);

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

        var FinishBGItem = cc.MenuItemImage.create("sprites/bg_finish.png","sprites/bg_finish.png", this.onMainMenuCallback, this);
        FinishBGItem.setScale(1.8);
        FinishBGItem.setPosition(0,0);
        var imageMenu = cc.Menu.create(FinishBGItem);
        this.addChild(imageMenu, 1);

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
        var layer = new Intro1Scene();
        scene.addChild(layer);
		result_arr = [];

		var transition = cc.TransitionFade.create(0.5,scene);
        director.replaceScene(transition);
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