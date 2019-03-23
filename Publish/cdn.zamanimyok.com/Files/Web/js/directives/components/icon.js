app.style(function($css, $theme, $path) {

    $css.add("icon", "zc-icon");
    $css.add("icon.i", "zc-icon i");
    
    $css.add("icon.i_large", "zc-icon[zp-size='large'] i");
    $css.add("icon.i_medium", "zc-icon[zp-size='medium'] i");
    $css.add("icon.i_small", "zc-icon[zp-size='small'] i");
    $css.add("icon.i_tiny", "zc-icon[zp-size='tiny'] i");

    $css.icon
        .begin()
            .absolute()
            .sideFull()
        .save();

    $css.icon.i
        .begin()
            .absolute()
            .sideCentered(32)
            .impTextLineHeight(32)
            .textCenter()
        .save();

    $css.icon.i_large
        .begin()
            .textSize(32)
        .save();

    $css.icon.i_medium
        .begin()
            .textSize(24)
        .save();

    $css.icon.i_small
        .begin()
            .textSize(20)
        .save();

    $css.icon.i_tiny
        .begin()
            .textSize(16)
        .save();

});

app.directive("zcIcon", function($theme) {

    return {
        restricts: "E",
        scope: false,
        template: function($element, $attr) {

            var html = "";

            if ($attr.zpWeight == "light")
                html += "<i class='fal fa-" + $attr.zpIcon + " z-ease-500'></i>";
            else
                html += "<i class='fa fa-" + $attr.zpIcon + " z-ease-500'></i>";

            return html;

        },
        compile: function($element, $attr) {

            $element.find("i").css({
                color: $theme.color[$attr.zpColor]
            });
            
        }
    }

});