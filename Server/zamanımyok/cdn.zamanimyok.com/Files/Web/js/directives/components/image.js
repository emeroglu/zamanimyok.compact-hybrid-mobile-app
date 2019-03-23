app.style(function($css, $theme, $path) {

    $css.add("image", "zc-image");

    $css.image
        .begin()
            .absolute()
            .sideFull()
        .save();
        
});

app.directive("zcImage", function($path, $style) {

    return {
        restricts: "E",
        scope: false,
        compile: function($element, $attr) {

            var html = "";

            if ($attr.zpGrayscale == "$true") {
                html += "<img src='" + $path.img[$attr.zpPath] + "' style='filter: grayscale()' />";
            } else {
                html += "<img src='" + $path.img[$attr.zpPath] + "' />";
            }

            $element.append(html);

            $style.queueImage();

            $element.children().on("load", function() {
                $style.dequeueImage();
            });

        }
    };

});