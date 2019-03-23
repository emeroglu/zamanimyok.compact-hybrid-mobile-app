app.style(function($css, $theme, $path) {

    $css.add("space", "zc-space");

    $css.space
        .begin()
            .relativeLeft()
        .save();

});

app.directive("zcSpace", function() {

    return {
        restricts: "E",
        scope: false,
        compile: function($element, $attr) {

            var w = $attr.zpDimens.split(":")[0];
            var h = $attr.zpDimens.split(":")[1];

            if (w == "fill")
                width = "100%";
            else
                width = w + "px";

            if (h == "fill")
                height = "100%";
            else if (h == "wrap")
                height = "";
            else
                height = h + "px";

            if (height == "")
                $element.css({
                    width: width
                }); 
            else
                $element.css({
                    width: width,
                    height: height
                });
            
        }
    }

});