app.factory("$lexicon", function($bcast, $theme, $timeout, $view) {

    var $factory = {};

    $factory.data = { };
    $factory.init = function(data) {

        $factory.data = data;

        eng();

    };

    $factory.lang = "eng";
    $factory.language = function(lang) {

        if (lang == $factory.lang)
            return;

        $view.lock();

        $factory.lang = lang;

        $bcast.shout("lexicon_changing_language");

        $timeout(function() {

            eval($factory.lang + "()");

            $bcast.shout("lexicon_digest");

            $timeout(function() {

                $view.unlock();

            }, $theme.anim.lexicon_duration + 50);

        }, $theme.anim.lexicon_duration);

    };

    var eng = function() {

        var key;

        for (var d in $factory.data.words) {

            key = $factory.data.words[d];

            $factory[d] = key.en;

        }

        for (var d in $factory.data.phrases) {

            key = $factory.data.phrases[d];

            $factory[d] = key.en;

        }

        $factory.pages = { };

        for (var d in $factory.data.pages) {

            page = $factory.data.pages[d];

            $factory.pages[d] = { };

            for (var p in page) {

                key = page[p];

                $factory.pages[d][p] = key.en;

            }

        }

    };

    var tur = function() {

        var key, page;

        for (var d in $factory.data.words) {

            key = $factory.data.words[d];

            $factory[d] = key.tr;

        }

        for (var d in $factory.data.phrases) {

            key = $factory.data.phrases[d];

            $factory[d] = key.tr;

        }

        $factory.pages = { };

        for (var d in $factory.data.pages) {

            page = $factory.data.pages[d];

            $factory.pages[d] = { };

            for (var p in page) {

                key = page[p];

                $factory.pages[d][p] = key.tr;

            }

        }

    };

    $factory.word = function(key) {

        if (key.indexOf(".") == -1) {
            
            return $factory[key];    

        } else {

            var keys = key.split(".");

            return $factory[keys[0]][keys[1]];

        }

    };

    return $factory;

});