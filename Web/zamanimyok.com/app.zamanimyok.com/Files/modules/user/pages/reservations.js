$js.compile("ReservationsPage", [PostLoginPage], function($self) {

    $self.fields = {

        go: true

    };

    $self.overrides = {

        on_key: function() { return "reservations"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "landing"; },

        on_title: function () { return "Rezervasyonlarım"; },

        on_show: function ($views) {

            $self.go = true;

            var recurse = function() {

                if ($api.busy) {

                    if ($self.go)
                        setTimeout(recurse, 3000);

                } else {

                    $api.reservations(function() {

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
                    return $data.reservations;
                })
                .onGenerate(function($item, $model) {

                    $item.views.item = new ReservationItem()
                        .init({
                           reservation: $model
                        });

                });

        }

    };              

});