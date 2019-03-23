$js.compile("DeliveryAddressSelectionPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "delivery-address-selection"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "take_over_address_selection"; },

        on_title: function () { return "Teslim Adres Seçimi"; },

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
                            type: "delivery"
                        });

                });

        }

    };  

});