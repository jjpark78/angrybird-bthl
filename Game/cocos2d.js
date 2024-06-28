(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG: 2, //0: debug off, 1: basic debug, 2: full debug
        box2d: true,
        showFPS: false,
        frameRate: 60,
        tag: 'viewport',
        SingleEngineFile: 'cocos2d-html5.min.js',
        /* engineDir:'../cocos2d/', */
        appFiles: ['resources.js', 'b2.js', 'game.js', 'intro.js', 'result.js', 'retry.js']
    };
    window.addEventListener('DOMContentLoaded', function () {
        var s = d.createElement('script');
        s.src = c.SingleEngineFile;
        //s.src = c.engineDir + 'platform/jsloader.js';
        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
    });
})();