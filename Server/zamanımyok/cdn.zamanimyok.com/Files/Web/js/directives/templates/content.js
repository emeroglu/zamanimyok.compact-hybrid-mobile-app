app.style(function($css, $theme, $path) {

    $css.add("content", "z-content");

    $css.content
        .begin()
            .absolute()
            .widthFull()
            .heightCropFromFull($theme.dimen.nav.bar_height)
            .top($theme.dimen.nav.bar_height)
            .left(0)
        .save();

});

app.directive("ztContent", function($path) {

    return {
        restricts: "E",
        templateUrl: $path.templates.content,
        scope: false
    }

}); 