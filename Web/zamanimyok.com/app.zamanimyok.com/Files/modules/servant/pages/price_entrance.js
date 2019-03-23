$js.compile("PriceEntrancePage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "price-entrance"; },

        on_type: function () { return "tail"; },

        on_back_page: function () { return "requests"; },        

        on_title: function () { return "Ücret Belirleme"; }

    };

    $self.extensions = {

        on_construct: function($views) {                                                        

            $views.content.views.message = new View();
            $views.content.views.message.views.text = new TextView()
                .init({                     
                    size: 3.5,
                    line_height: 25,
                    weight: "light",
                    text: "Müşterinin bulunduğu konuma ve saate bağlı trafik durumuna göre ücret belirleyebilirsiniz...",
                    color: $theme.color.grayLight,
                    align: "center"
                });

            $views.content.views.price = new Textbox()
                .init({
                    placeholder: "Ücret"
                });

            $views.content.views.approve = new Button()
                .init({
                    text: "Onayla"
                })
                .onClick(function () {
                    
                    var price = $views.content.views.price.text();
                    price = price.replace(" ",".").replace(",",".");

                    if (price.indexOf(".") == -1)
                        price += ".00";

                    var amount = price.split(".")[0];
                    var decimal = price.split(".")[1].substring(0,2);

                    $api.approve($data.request.pk, amount + "." + decimal , function () {

                        $nav.back();

                    }); 

                });

        },

        on_style: function($views) {

            $css.select($views.content.views.price.selector)
                .begin()
                    .height(60)
                    .top(20)                    
                .save();

            $css.select($views.content.views.price.selector + " input")
                .begin()
                    .textHeight(60)
                    .textCenter()
                    .textSizeViewportWidth(5)
                    .uppercase()
                .save();

            $css.select($views.content.views.message.selector)
                .begin()
                    .absolute()
                    .widthPercentCentered(70)                    
                    .top(250)
                .save();
               
            $css.select($views.content.views.approve.selector)
                .begin()
                    .left(0)
                    .bottom(0)
                .save();

        }        

    };     

});