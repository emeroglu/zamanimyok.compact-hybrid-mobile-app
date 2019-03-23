app.style(function($css, $theme, $path) {

    $css.add("frosty", "z-frosty");
    $css.add("frosty.cover", "z-frosty cover");
    $css.add("frosty.white", "z-frosty white");

    $css.frosty
        .begin()
            .absolute()
            .sideFull()
        .save();

    $css.frosty.cover
        .begin()
            .absolute()
            .widthPercent(110)
            .heightPercent(110)
            .topPercent(-5)
            .leftPercent(-5)
            .backgroundImage($path.img.background)
            .backgroundCover()
            .backgroundFixed()
            .blur(15)
            .brightness(0.4)
        .save();

    $css.frosty.white
        .begin()
            .absolute()
            .sideFull()
            .backgroundColor($theme.color.whiteFull)
            .opacity(0.1)
        .save();

});

app.directive("ztFrosty", function() {

    return {
        restricts: "E",
        scope: false,
        template: function() {

            var html = "";

            html += "<z-frosty>";
            html += "   <cover></cover>";
            html += "   <white></white>";
            html += "</z-frosty>";

            return html;

        }
    }

});