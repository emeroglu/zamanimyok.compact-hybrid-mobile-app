app.style(function($css, $theme, $path, $img) {

    $css.add("logo", "z-logo");
    $css.add("logo.image", "z-logo zc-image img");

    $css.logo
        .begin()
            .absolute()
            .widthCentered(400)
            .bottom(80)
            .opacity(0.1)
        .save();

    $css.logo.image
        .begin()
            .absolute()
            .widthCentered(300)
            .heightCentered($img.logo_white.fixedWidth(300))
        .save();

});

app.directive("ztLogo", function() {

    return {
        restricts: "E",
        scope: false,
        template: function() {

            var html = "";

            html += "<z-logo>";
            html += "   <zc-image zp-path='logo_white'></zc-image>";
            html += "</z-logo>";

            return html;

        }
    }

});