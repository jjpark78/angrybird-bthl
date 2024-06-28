var bgm_sound = "sounds/bgm.mp3",
	effect_sound = "sounds/effect.mp3",
	impact_sound = "sounds/impact.mp3",
    fail_sound = "sounds/fail.mp3";

var result_arr = [];

var g_ressources = (function () {
    var retval = [],
        imgs = [
            "intro01",
            "intro2",
            "intro3",
            "intro4",
            "bg",
            "bg_finish",
            "platform", 
            "bird", 
            "poll", 
            "sling1", 
            "sling2", 
            "sling3", 
            "ground", 
            "wood1", 
            "wood2", 
            "smoke", 
            "menu_refresh", 
            "menu_back",
            "goal01",
            "goal02",
            "goal03",
            "goal04",
            "goal05",
        ],
        sounds = [bgm_sound, effect_sound, impact_sound];

    for (var i = 0; i < sounds.length; i++) {
        retval.push({
            type: "sound",
            src: sounds[i]
        });
    }
    for (var i = 0; i < imgs.length; i++) {
        retval.push({
            type: "image",
            src: 'sprites/' + imgs[i] + '.png'
        });
    }

    return retval;
}());