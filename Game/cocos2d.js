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
        const introImages = [
            "sprites/bg.png",
            "intro/intro.svg",
            "intro/intro_game1-13.svg",
            "intro/intro_game1-14.svg",
            "intro/intro_game1-15.svg"
        ];

        let currentImageIndex = 0, audioFlg = false, keyDownFlg = false;
        const introContainer = document.getElementById('intro-container');
        const introImage = document.getElementById('intro-image');
        const gameCanvas = document.getElementById('viewport');

        function startGame() {
            introContainer.style.display = 'none';
            gameCanvas.style.display = 'block';

            var s = d.createElement('script');
            s.src = c.SingleEngineFile;
            d.body.appendChild(s);
            document.ccConfig = c;
            s.id = 'cocos2d-html5';    
        }

        function showNextImage() {
            if (keyDownFlg) return;

            if (!audioFlg) {
                const audio = document.querySelector("audio");
                audio.volume = 0.2;
                audio.play();
                audioFlg = true;
            }

            currentImageIndex++;
            if (currentImageIndex < introImages.length) {
                introImage.src = introImages[currentImageIndex];
            } else {
                startGame();
            }
            keyDownFlg = true;
        }
    
        function handleEvent(event) {
            showNextImage();
        }

        function handleEndEvent(event) {
            keyDownFlg = false;
        }

        document.addEventListener('keydown', handleEvent);
        document.addEventListener('mousedown', handleEvent);
        document.addEventListener('keyup', handleEndEvent);
        document.addEventListener('mouseup', handleEndEvent);

        // init
        gameCanvas.style.display = 'none';
    });
})();