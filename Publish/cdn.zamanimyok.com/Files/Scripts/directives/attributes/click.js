app.directive("zaClick", function() {

    return {
        restricts: "A",
        link: function($scope, $element, $attr) {

            $element.css({ cursor: "pointer" });

            $element[0].onclick = function() {

                $eval($attr.zaClick);

            };

        }
    }

});