app.directive("zaLexicon", function($bcast, $lexicon, $theme, $timeout, $view) {

    return {
        restricts: "A",
        link: function($scope, $element, $attr) {
            
            $bcast.listen("lexicon_changing_language", {
                owner: "za-lexicon",
                invoke: function() {

                    $element.addClass($theme.anim.lexicon + " z-transparent");
    
                    $timeout(function() {
    
                        $element.removeClass("z-transparent");
                        $element.addClass("z-opaque");
    
                        $timeout(function() {
    
                            $element.removeClass($theme.anim.lexicon);
                            $element.removeClass("z-opaque");
    
                        }, $theme.anim.lexicon_duration);
    
                    }, $theme.anim.lexicon_duration + 50);
    
                }
            });

        }
    };

});