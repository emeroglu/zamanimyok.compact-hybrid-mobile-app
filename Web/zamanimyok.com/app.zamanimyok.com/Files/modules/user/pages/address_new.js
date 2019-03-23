$js.compile("AddressNewPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "address-new"; },

        on_type: function () { return "tail"; },

        on_back_page: function () { return "addresses"; },

        on_title: function () { return "Yeni Adres Ekle"; }       

    };

    $self.extensions = {

        on_construct: function($views) {                                              

            $views.content.views.message = new View();
            $views.content.views.message.views.text = new TextView()
                .init({                     
                    size: 3.5,
                    line_height: 25,
                    weight: "light",
                    text: "Adres kısmına açık adresin yanı sıra yol tarifi de eklemeniz, sizi bulmamızda bizi yardımcı olacaktır :)",
                    color: $theme.color.grayLight,
                    align: "center"
                });

            $views.content.views.name = new Textbox()
                .init({
                    placeholder: "Adres Adı"
                })
                .onChange(function ($text) {
                    $data.address.name = $text;
                });

            $views.content.views.text = new Textarea()
                .init({
                    placeholder: "Adres"  
                })
                .onChange(function ($text) {
                    $data.address.value = $text;
                });

            $views.content.views.save = new Button()
                .init({
                    text: "Kaydet"
                })
                .onClick(function () {
                    
                    $api.new_address($data.address.name, $data.address.value, function () {
                        $nav.back();
                    });

                });


        },

        on_style: function($views) {

            $css.select($views.content.views.name.selector)
                .begin()
                    .top(20)                    
                .save();

            $css.select($views.content.views.text.selector)
                .begin()
                    .top(90)                    
                .save();

            $css.select($views.content.views.message.selector)
                .begin()
                    .absolute()
                    .widthPercentCentered(70)
                    .top(250)
                .save();

            $css.select($views.content.views.save.selector)
                .begin()
                    .left(0)
                    .bottom(0)
                .save();

        }        

    };     

});