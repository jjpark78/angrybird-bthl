var g_ressources = (function () {
  var retval = [],
    imgs = [
      "bg",
      "platform",
      "bird",
      "enemy",
      "sling1",
      "sling2",
      "sling3",
      "ground",
      "wood1",
      "wood2",
      "smoke",
      "menu_refresh",
      "menu_back",
      "party",
    ];

  for (var i = 0; i < imgs.length; i++) {
    // image file extension by jungkun
    var ext = imgs[i] === "party" ? ".gif" : ".png";
    retval.push({
      type: "image",
      // src: "sprites/" + imgs[i] + ".png",
      src: "sprites/" + imgs[i] + ext,
    });
  }

  return retval;
})();
