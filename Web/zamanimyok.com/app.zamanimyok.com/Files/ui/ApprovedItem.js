$js.compile("ApprovedItem", [View], function($self) {

    $self.fields = {

        reservation: null

    };

    $self.overrides = {

        on_tag: function() { return "z-approved-item"; },

        on_construct: function($views) {

            $views.item = new View().init({ name: "v_item" });           

            $views.item.views.vehicle = new View().init({ name: "v_vehicle" });           

            $views.item.views.vehicle.views.image = new View().init({ name: "v_image" });
            $views.item.views.vehicle.views.image.views.image = new ImageView()
                .init({
                    src: $self.reservation.request.vehicle.brand.image
                });

            $views.item.views.vehicle.views.info = new View().init({ name: "v_info" });

            $views.item.views.vehicle.views.info.views.model = new View().init({ name: "v_model" });
            $views.item.views.vehicle.views.info.views.model.views.text = new TextView()
                .init({
                    size: ($self.reservation.request.vehicle.model.length < 15) ? 4 : 3.5,
                    line_height: 34,
                    weight: "regular",
                    align: "center",
                    text: $self.reservation.request.vehicle.model,
                    color: $theme.color.main
                });           

            $views.item.views.vehicle.views.info.views.brand = new View().init({ name: "v_brand" });
            $views.item.views.vehicle.views.info.views.brand.views.text = new TextView()
                .init({
                    size: 3.5,
                    line_height: 24,
                    weight: "regular",
                    align: "center",
                    text: $self.reservation.request.vehicle.brand.name,
                    color: $theme.color.grayLight
                });

            $views.item.views.vehicle.views.info.views.plate = new View().init({ name: "v_plate" });
            $views.item.views.vehicle.views.info.views.plate.views.text = new TextView()
                .init({
                    size: 4.5,
                    line_height: 24,
                    weight: "regular",
                    align: "center",
                    text: $self.reservation.request.vehicle.plate,
                    color: $theme.color.gray
                });

            $views.item.views.list = new ListView()
                .init({ name: "lv" })
                .onModel(function () {
                    return [
                        { key: "Tarih:", value: function() { return $self.reservation.date; } },
                        { key: "Rez. No:", value: function() { return $self.reservation.number; } },
                        { key: "Şube:", value: function() { return $self.reservation.request.affiliate.name; } },
                        { key: "Hizmet:", value: function() { return $self.reservation.request.service.name; } },
                        { key: "Vale:", value: function() { return ($self.reservation.status == "REQUESTED") ? "Onay Bekliyor" : $self.reservation.request.servant.name + "<br />" + $self.reservation.request.servant.email + "<br />" + $self.reservation.request.servant.phone; } },
                        { key: "Alış Adresi:", value: function() { return "(" + $self.reservation.request.takeOverAddress.name + ") " + $self.reservation.request.takeOverAddress.value; } },
                        { key: "Teslim Adresi:", value: function() { return "(" + $self.reservation.request.deliveryAddress.name + ") " + $self.reservation.request.deliveryAddress.value; } },
                        { key: "Not:", value: function() { return $self.reservation.request.note; } },                        
                        { key: "Durum:", value: function() { return $self.status($self.reservation.status); } }
                    ];
                })
                .onGenerate(function ($item, $model) {

                    $item.views.item = new KeyValueItem()
                        .init({
                            key: $model.key,
                            value: $model.value
                        });

                });

            $views.item.views.btn = new Button()
                .init({
                    name: "btn",
                    text: ""
                });    

        },
        
        on_ready: function($views, $ready) {

            $views.item.views.btn.none();

            $ready();

        }

    };

    $self.schema = {

        update: function($model) {

            $self.reservation = $model;

            $self.views.item.views.vehicle.views.image.views.image.update($self.reservation.request.vehicle.brand.image);
            $self.views.item.views.vehicle.views.info.views.model.views.text.update($self.reservation.request.vehicle.model);
            $self.views.item.views.vehicle.views.info.views.brand.views.text.update($self.reservation.request.vehicle.brand.name);
            $self.views.item.views.vehicle.views.info.views.plate.views.text.update($self.reservation.request.vehicle.plate);
            $self.views.item.views.list.update();

            if ($self.reservation.status == "APPROVED") { 

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Yola çıkıyorum");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 4);

                };  

            } else if ($self.reservation.status == "VALLET_ON_THE_WAY") {
                
                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Adrese ulaştım");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 5);

                };
                
            } else if ($self.reservation.status == "USER_HANDED_THE_KEY") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Anahtarları aldım");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 7);

                };

            } else if ($self.reservation.status == "VALLET_GOT_THE_KEY") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Photoshoot");
                $self.views.item.views.btn.element.onclick = function () {

                    $bridge.native.photoshoot($api.key, $self.reservation.pk, 8, 1);
                    //$api.state_machine($self.reservation.pk, 10);

                };

            } else if ($self.reservation.status == "VALLET_PERFORMED_THE_PHOTOSHOOT") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Tekrar yola çıkıyorum");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 9);

                };

            } else if ($self.reservation.status == "VALLET_ON_THE_WAY_TO_AFFILIATE") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Şubeye ulaştım");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 10);

                };

            } else if ($self.reservation.status == "VALLET_ARRIVED_TO_AFFILIATE") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Araç yıkanıyor");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 11);

                };

            } else if ($self.reservation.status == "VEHICLE_IS_IN_PROCESS") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Araç yıkandı");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 12);

                };

            } else if ($self.reservation.status == "VEHICLE_IS_DONE") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Yola çıkıyorum");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 13);

                };

            } else if ($self.reservation.status == "VALLET_ON_THE_WAY_TO_USER") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Adrese ulaştım");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 14);

                };

            } else if ($self.reservation.status == "VALLET_ARRIVED_TO_USER") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Photoshoot");
                $self.views.item.views.btn.element.onclick = function () {

                    $bridge.native.photoshoot($api.key, $self.reservation.pk, 15, 2);
                    //$api.state_machine($self.reservation.pk, 17);

                };

            } else if ($self.reservation.status == "VALLET_PERFORMED_THE_DELIVERY_PHOTOSHOOT") {

                $self.views.item.views.btn.disp();
                $self.views.item.views.btn.setText("Anahtarları teslim ettim");
                $self.views.item.views.btn.element.onclick = function () {

                    $api.state_machine($self.reservation.pk, 16);

                };

            } else {
                $self.views.item.views.btn.none();
            }

        },

        status: function (s) {

            if (s == "REQUESTED")
                return "Onay Bekliyor...";
            else if (s == "APPROVED")
                return "Onaylandı";
            else if (s == "REJECTED")
                return "Geri Çevrildi";
            else if (s == "VALLET_ON_THE_WAY")
                return "Vale şu an yolda...";
            else if (s == "VALLET_ARRIVED")
                return "Vale adrese ulaştı";
            else if (s == "USER_PAID")
                return "Kullanıcı ödemeyi yaptı";
            else if (s == "VALLET_RECEIVED")
                return "Vale ödemeyi aldı";
            else if (s == "USER_HANDED_THE_KEY")
                return "Kullanıcı anahtarları verdi";            
            else if (s == "VALLET_GOT_THE_KEY")
                return "Vale anahtarları aldı";
            else if (s == "VALLET_PERFORMED_THE_PHOTOSHOOT")
                return "Vale aracın fotoğraflarını kaydetti";
            else if (s == "VALLET_ON_THE_WAY_TO_AFFILIATE")
                return "Vale tekrar yola çıktı";
            else if (s == "VALLET_ARRIVED_TO_AFFILIATE")
                return "Araç şubeye ulaştı";
            else if (s == "VEHICLE_IS_IN_PROCESS")
                return "Araç yıkanıyor :)";
            else if (s == "VEHICLE_IS_DONE")
                return "Araç tertemiz :)";
            else if (s == "VALLET_ON_THE_WAY_TO_USER")
                return "Vale tekrar yola çıktı";
            else if (s == "VALLET_ARRIVED_TO_USER")
                return "Vale adrese ulaştı";
            else if (s == "VALLET_PERFORMED_THE_DELIVERY_PHOTOSHOOT")
                return "Vale aracın fotoğraflarını kaydetti";
            else if (s == "VALLET_HANDED_THE_KEYS_BACK")
                return "Vale anahtarları teslim etti";
            else if (s == "USER_ENDED_THE_FLOW")
                return "Tamamlandı";

        }

    };

}, function() {

    $css.select("z-approved-item z-view[z-name='v_item']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(94)
            .backgroundColor($theme.color.white)
            .marginTop(10)
            .round(10)
            .shadow("#dad9d9 0px 2px 20px 0px")
        .save();

    $css.select("z-approved-item z-view[z-name='v_vehicle']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(94)
            .height(100)
            .marginTop(10)            
        .save();

    $css.select("z-approved-item z-view[z-name='v_image']")
        .begin()
            .absolute()
            .sideFull()
            .opacity(0.1)
        .save();

    $css.select("z-approved-item z-view[z-name='v_image'] img")
        .begin()            
            .sideCentered(90)            
        .save();

    $css.select("z-approved-item z-view[z-name='v_info']")
        .begin()
            .absolute()
            .widthCentered(150)
            .height(75)
            .top(10)
        .save();

    $css.merge("z-approved-item z-view[z-name='v_model']", "z-approved-item z-view[z-name='v_brand']", "z-approved-item z-view[z-name='v_plate']")
        .begin()
            .relativeLeft()
            .widthFull()
            .height(25)
        .save();    

    $css.select("z-approved-item z-list-view[z-name='lv']")
        .begin()                    
            .relativeLeft() 
            .heightPlain("auto")
        .save();

    $css.select("z-approved-item z-list-view[z-name='lv'] z-view[z-name='container']")
        .begin()                    
            .relativeLeft()
            .widthPercentCentered(88) 
            .marginTop(10)
            .marginBottom(25)
        .save();

    $css.select("z-approved-item z-list-view[z-name='lv'] z-view[z-name='container'] z-list-item")
        .begin()                                
            .marginTop(5)            
        .save();

    $css.select("z-approved-item z-button[z-name='btn']")
        .begin()
            .relativeLeft()            
            .textHeight(50)
            .roundBottom(10)
            .textSizeViewportWidth(3.75)
        .save();

});