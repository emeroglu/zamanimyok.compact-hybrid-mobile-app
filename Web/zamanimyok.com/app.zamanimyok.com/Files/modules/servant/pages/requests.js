$js.compile("RequestsPage", [PostLoginPage], function($self) {

    $self.fields = {

        go: true

    };

    $self.overrides = {

        on_key: function() { return "requests"; },

        on_type: function () { return "head"; },

        on_title: function () { return "Onay Bekleyenler"; },

        on_complete: function ($views, $ready) {

            $views.bar.views.icon.views.back.update("exchange", $theme.color.whiteFull, false);            
            $views.bar.views.icon.views.back.element.onclick = function () {

                $api.approveds(function () {
                   $nav.to("approveds");
                });

            };

            $ready();

        },

        on_show: function($views) {

            $self.go = true;

            var recurse = function() {

                if ($api.busy) {

                    if ($self.go)
                        setTimeout(recurse, 3000);

                } else {

                    $api.requests(function() {

                        $views.content.views.list.update();
    
                        if ($self.go)
                            setTimeout(recurse, 3000);
    
                    }, true);

                }
                
            };
            recurse();

        },

        on_hide: function() {

            $self.go = false;

        }

    };

    $self.extensions = {

        on_construct: function($views) {                                               

            $views.content.views.list = new ListView()                
                .onModel(function () {
                    return $data.requests;
                })
                .onGenerate(function($item, $model) {

                    $item.views.item = new RequestItem()
                        .init({
                            request: $model
                        });

                });

        }

    };  

});