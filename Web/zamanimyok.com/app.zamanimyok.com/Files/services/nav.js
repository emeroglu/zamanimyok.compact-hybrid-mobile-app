$js.compile("$nav", [], function($self) {

    $self.fields = {

        going_back: false

    };

    $self.delegates = {

        on_going_back: function() { },
        onGoingBack: function(delegate) { $self.on_back = delegate; return $self; }

    };

    $self.schema = {

        load: function(module, onload) {

            $fetch
                .begin()
                    .onFetch(function() {

                        $js.on_compile();

                        var current = $module.current;

                        if (current != null)
                            current.element.style = "z-index:-100";

                        var js = "$module.current = new " + module.capitalize() + "Module();";
                        
                        eval(js);
                        
                        $module.current
                            .begin()
                                .onLoad(function() {

                                    if (onload != null) onload();

                                    if (current != null) current.destroy();

                                })
                            .load();

                    })
                .module(module);

        },

        _on_back: function() { $self.to($page.current.on_back_page()); },        

        to: function(to) {

            var fromPage = $page.current;
            var toPage = $module.current.pages[to];

            if (toPage.loaded) {
                
                toPage.on_showing = fromPage.hide;
                toPage.show(function () { $self.going_back = false; });                                                                                                                                    

                $message_line.begin().hide();

            } else {

                $message_line
                    .begin()
                        .loading("Yükleniyor...")
                        .onShow(function() {

                            toPage
                                .begin()
                                    .onLoad(function() {
        
                                        $message_line
                                            .begin()
                                                .onHide(function() {

                                                    toPage.on_showing = fromPage.hide;
                                                    toPage.show(function () { $self.going_back = false; });                                                                                                                    

                                                })
                                            .hide();
        
                                    })
                                .load();

                        })
                    .show();

            }

        },

        back: function() {

            $self.going_back = true; 

            $self.on_going_back();

            $self._on_back();

        },

        backTo: function(to) {

            $self.going_back = true; 

            $self.on_going_back();

            $self.to(to);

        },

        backDefault: function() {
            $self._on_back = function() { $self.to($page.current.on_back_page()); };
        },

        backQuit: function() {
            $self._on_back = function() { $bridge.native.quit(); };
        }

    };

});