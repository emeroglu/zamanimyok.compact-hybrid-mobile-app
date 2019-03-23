app.style(function($css, $theme, $path) {

    $css.add("info", "z-info");
    $css.add("info_hover", "z-info:hover");
    $css.add("info.cover", "z-info cover");
    $css.add("info.shade", "z-info shade");
    $css.add("info.item", "z-info item");
    $css.add("info.item.icon", "z-info item icon");
    $css.add("info.item.icon.image", "z-info item icon zc-image img");
    $css.add("info.item.text", "z-info item text");

    $css.info
        .begin()
            .absolute()
            .height(40)
            .left(10)
            .bottom(10)
            .opacity(0)
            .z(1)
        .save();

    $css.info_hover
        .begin()
            .opacity(1)
        .save();

    $css.info.shade
        .begin()
            .absolute()
            .widthPercent(110)
            .heightPercent(160)
            .topPercent(-30)
            .leftPercent(-5)
            .backgroundColor($theme.color.black)
            .blur(10)
        .save();

    $css.info.item
        .begin()
            .relativeLeft()
            .height(40)
            .marginRight(10)
        .save();

    $css.info.item.icon
        .begin()
            .relativeLeft()
            .side(40)
        .save();    

    $css.info.item.icon.image
        .begin()
            .absolute()
            .sideCentered(25)
        .save();

    $css.info.item.text
        .begin()
            .relativeLeft()
            .textHeight(40)
            .textExtraLight()
            .textLeft()
            .textSize(16)
            .textColor($theme.color.whiteFull)
            .marginLeft(5)
        .save();

});

app.directive("ztInfo", function($path, $platform) {

    return {
        restricts: "E",
        templateUrl: $path.templates.info,
        scope: false
    }

});