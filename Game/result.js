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

        var label = cc.LabelTTF.create("Result", "fantasy", 50, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER);
        label.setColor(cc.c3b(0,0,0));
        var menuItem = cc.MenuItemLabel.create(label, this.onMainMenuCallback, this);
        var menu = cc.Menu.create(menuItem);
        menu.setPosition(0,0);
        menuItem.setPosition(winSize.width/2, winSize.height/2 + 200);

        var result_string = result_arr.join('/');
        var label = cc.LabelTTF.create(result_string, "fantasy", 50, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER);
        label.setColor(cc.c3b(0,0,0));
        var menuItem = cc.MenuItemLabel.create(label, this.onMainMenuCallback, this);
        var menu2 = cc.Menu.create(menuItem);
        menu2.setPosition(0,0);
        menuItem.setPosition(winSize.width/2, winSize.height/2);

        var FinishBGItem = cc.MenuItemImage.create("sprites/bg_finish.png","sprites/bg_finish.png", this.onMainMenuCallback, this);
        FinishBGItem.setScale(1.8);
        FinishBGItem.setPosition(0,0);
        var imageMenu = cc.Menu.create(FinishBGItem);

        this.addChild(imageMenu, 1);
        this.addChild(menu, 999);
        this.addChild(menu2, 999);
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
    },
});