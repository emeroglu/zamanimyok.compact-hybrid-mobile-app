app.directive("zaText", function($bcast, $nav) {

    var id = 0;

    return {
        restricts: "A",
        compile: function($element, $attr) {

            $element.textId = "text_" + id;
            id++;

            $element.text($eval($attr.zaText));

            if ($attr.zaLexicon != null) {

                $bcast.listen("lexicon_digest", {
                    owner: $nav.page.key + "_" + $element.textId,
                    invoke: function() {
                        $element.text($eval($attr.zaText));
                    }
                });

            }

        }
    };

});