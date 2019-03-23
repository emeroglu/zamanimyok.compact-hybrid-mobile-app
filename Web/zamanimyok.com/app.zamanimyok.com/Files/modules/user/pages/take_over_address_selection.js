$js.compile("TakeOverAddressSelectionPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "take-over-address-selection"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "vehicle_selection"; },

        on_title: function () { return "Alış Adres Seçimi"; },

        on_show_start: function ($views, $ready) {

            $self.views.content.views.list.update();

            setTimeout($ready, 1000);

        }

    };

    $self.extensions = {

        on_construct: function($views) {                                   

            $views.content.views.list = new ListView()                
                .onModel(function () {
                    return $data.addresses;
                })
                .onGenerate(function($item, $model) {

                    $item.views.item = new AddressSelectionItem()
                        .init({
                            address: $model,
                            type: "take_over"
                        });

                });

        }

    };  

});