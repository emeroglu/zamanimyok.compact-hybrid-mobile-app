$js.compile("PreviewPage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "preview"; },

        on_type: function () { return "tail"; },

        on_back_page: function () { return "note"; },

        on_title: function () { return "Onay"; }        

    };

    $self.extensions = {

        on_construct: function($views) {                                   

            $views.content.views.vehicle = new VehiclePreview()
                .init({
                    vehicle: $data.new_request.vehicle
                });

            $views.content.views.list = new ListView()               
                .onModel(function () {
    
                    var date = new Date();
                    var day = date.getDate();
                    if (day < 10) day = "0" + day;
                    var month = date.getMonth() + 1;
                    if (month < 10) month = "0" + month;
                    var year = date.getFullYear();
                    var hour = date.getHours();
                    if (hour < 10) hour = "0" + hour;
                    var minutes = date.getMinutes();
                    if (minutes < 10) minutes = "0" + minutes;

                    return [
                        { key: "Tarih:", value: function() { return day + "." + month + "." + year + " " + hour + ":" + minutes; } },
                        { key: "Şube:", value: function() { return $data.new_request.affiliate.name; } },
                        { key: "Hizmet:", value: function() { return "Oto Yıkama"; } },
                        { key: "Alış Adresi:", value: function() { return "(" + $data.new_request.takeOverAddress.name + ") " + $data.new_request.takeOverAddress.value; } },                        
                        { key: "Teslim Adresi:", value: function() { return "(" + $data.new_request.deliveryAddress.name + ") " + $data.new_request.deliveryAddress.value; } },                        
                        { key: "Ücret:", value: function() { return $data.new_request.affiliate.price + " TL"; } },
                        { key: "Not:", value: function () { return $data.new_request.note; } }
                    ];
                })
                .onGenerate(function($item, $model) {

                    $item.views.item = new KeyValueItem()
                        .init({
                            key: $model.key,
                            value: $model.value
                        });

                });

            $views.content.views.send = new Button()
                .init({
                    text: "Gönder"
                })
                .onClick(function () {
                    
                    $api.reserve(function () {
                        $nav.backTo("landing");
                    });

                });
        },

        on_style: function($views) {

            $css.select($views.content.views.vehicle.selector)
                .begin()
                    .relativeLeft()
                    .widthPercent(100)
                    .marginTop(10)
                .save();

            $css.select($views.content.views.list.selector)
                .begin()                    
                    .top(140)
                .save();

            $css.select($views.content.views.list.selector  + " z-view[z-name='container']")
                .begin()                    
                    .widthPercentCentered(94)
                    .backgroundColor($theme.color.white)
                    .paddingTop(20)
                    .paddingBottom(30)
                    .round(10)
                    .shadow("#dad9d9 0px 2px 20px 0px")
                .save();

            $css.select($views.content.views.list.selector + " z-view[z-name='container'] z-list-item")
                .begin()
                    .widthPercentCentered(90)
                    .marginTop(10)
                .save();

            $css.select($views.content.views.send.selector)
                .begin()
                    .left(0)
                    .bottom(0)
                .save();

        }

    };   

});