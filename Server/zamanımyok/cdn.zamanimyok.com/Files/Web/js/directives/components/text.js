app.style(function($css, $theme, $path) {

    $css.add("text", "zc-text");

    $css.text
        .begin()
            .relativeLeftFull()
            .textLineHeight(25)
            .textExtraLight()
            .textSize(15)
            .textColor($theme.color.grayDark)
        .save();

});

app.directive("zcText", function() {

    return {
        restricts: "E",
        scope: false
    }

});