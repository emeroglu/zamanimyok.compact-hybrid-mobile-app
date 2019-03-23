app.style(function($css, $theme, $path) {

    $css.add("background", "z-background");

    $css.background
        .begin()
            .absolute()
            .sideFull()
            .backgroundImage($path.img.background)
            .backgroundCover()
            .backgroundFixed()
            .brightness(0.3)
        .save();

});

app.directive("ztBackground", function() {

    return {
        restricts: "E",
        scope: false,
        template: "<z-background></z-background>"
    };

});