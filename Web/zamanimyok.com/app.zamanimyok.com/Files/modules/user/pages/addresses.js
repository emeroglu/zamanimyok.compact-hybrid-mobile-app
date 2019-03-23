$js.compile("AddressesPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "addresses"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "landing"; },

        on_title: function () { return "Adreslerim"; },

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

                    $item.views.item = new AddressItem()
                        .init({
                            address: $model
                        });

                });

            $views.content.views.new = new Button()
                .init({
                    text: "Yeni Adres Ekle"
                })
                .onClick(function () {
                    
                    $data.address = { };

                    $nav.to("address_new");

                });

        },

        on_style: function ($views) {

            $css.select($views.content.views.new.selector)
                .begin()
                    .left(0)
                    .bottom(0)
                .save();

        }

    };  

});