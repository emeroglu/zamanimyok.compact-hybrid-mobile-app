$js.compile("ApprovedsPage", [PostLoginPage], function($self) {

    $self.fields = {

        go: true

    };

    $self.overrides = {

        on_key: function() { return "approveds"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "requests"; },

        on_title: function () { return "Onayladıklarım"; },

        on_show: function ($views) {

            $self.go = true;

            var recurse = function() {

                if ($api.busy) {

                    if ($self.go)
                        setTimeout(recurse, 3000);

                } else {

                    $api.approveds(function() {

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
                    return $data.approveds;
                })
                .onGenerate(function($item, $model) {

                    $item.views.item = new ApprovedItem()
                        .init({
                           reservation: $model
                        });

                });

        }

    };              

});