app.style(function($css, $theme, $path) {

    $css.add("scroll", "zc-scroll scroll");
    $css.add("scroll.content", "zc-scroll scroll content");

    $css.scroll
        .begin()
            .absolute()
            .widthExtendUponFull(100)
            .heightCropFromFull($theme.dimen.page.title_height)
            .top($theme.dimen.page.title_height)
            .left(0)
            .hideHorizontalScroll()
            .verticalScroll()
        .save();

    $css.scroll.content
        .begin()
            .absolute()
            .widthCropFromFull(100)
            .heightFull()
        .save();

});

app.directive("zcScroll", function() {

    return {

        restricts: "E",
        scope: false,
        template: function($element) {

            var html = "";

            html += "<scroll>";
            html += "   <content>";
            html +=         $element.html();
            html += "   </content>";
            html += "</scroll>";

            return html;

        }

    }

});