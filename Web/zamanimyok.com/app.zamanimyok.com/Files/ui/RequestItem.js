$js.compile("RequestItem", [View], function($self) {

    $self.fields = {

        request: null

    };

    $self.overrides = {

        on_tag: function() { return "z-request-item"; },

        on_construct: function($views) {

            $views.item = new View().init({ name: "v_item" });
           
            $views.item.views.top = new View().init({ name: "v_top" });
            $views.item.views.top.views.left = new View().init({ name: "v_top_left" });
            $views.item.views.top.views.right = new View().init({ name: "v_top_right" });

            $views.item.views.top.views.left.views.number = new TextView()
                .init({
                    size: 4.25,
                    line_height: 50,
                    weight: "regular",
                    text: $self.request.number,
                    color: $theme.color.main
                });

            $views.item.views.top.views.right.views.date = new TextView()
                .init({
                    size: 4,
                    line_height: 50,
                    weight: "regular",
                    align: "right",
                    text: $self.request.date,
                    color: $theme.color.grayLight
                });

            $views.item.views.takeOverAddress = new View().init({ name: "v_take_over_address" });
            $views.item.views.takeOverAddress.views.text = new TextView()
                .init({
                    size: 3,
                    line_height: 24,
                    weight: "light",
                    align: "left",
                    text: "(Alış Adresi) <br />" + $self.request.takeOverAddress.value,
                    color: $theme.color.grayLight
                });

            $views.item.views.deliveryAddress = new View().init({ name: "v_delivery_address" });
            $views.item.views.deliveryAddress.views.text = new TextView()
                .init({
                    size: 3,
                    line_height: 24,
                    weight: "light",
                    align: "left",
                    text: "(Teslim Adresi) <br />" + $self.request.takeOverAddress.value,
                    color: $theme.color.grayLight
                });

            $views.item.views.note = new View().init({ name: "v_note" });
            $views.item.views.note.views.text = new TextView()
                .init({
                    size: 3,
                    line_height: 24,
                    weight: "light",
                    align: "left",
                    text: "(Not) <br />" + $self.request.note,
                    color: $theme.color.grayLight
                });

            $views.item.views.bottom = new View().init({ name: "v_bottom" });
            $views.item.views.bottom.views.left = new View().init({ name: "v_bottom_left" });
            $views.item.views.bottom.views.right = new View().init({ name: "v_bottom_right" });

            $views.item.views.bottom.views.left.views.approve = new TextView()
                .init({
                    name: "tv_approve",
                    size: 3,
                    line_height: 36,
                    weight: "light",
                    text: "Onayla",
                    align: "center",
                    color: $theme.color.whiteFull
                })
                .onClick(function () {

                    $confirmation
                        .onYes(function () {

                            $confirmation.hide();
                            
                            setTimeout(function () {

                                $api.approve($self.request.pk , function () {

                                    $nav.back();

                                });                                                            

                            }, 750);

                        })
                        .onNo(function () {
                            $confirmation.hide();
                        })
                        .show("Rezervasyonu onaylamak istediğinize emin misiniz?");

                });

            $views.item.views.bottom.views.right.views.reject = new TextView()
                .init({
                    name: "tv_reject",
                    size: 3,
                    line_height: 36,
                    weight: "light",
                    text: "Geri Çevir",
                    align: "center",
                    color: $theme.color.whiteFull
                })
                .onClick(function () {

                    $confirmation
                        .onYes(function () {

                            $confirmation.hide();
                            
                            setTimeout(function () {

                                $api.reject($self.request.pk, function () {

                                    $page.current.views.content.views.list.update();

                                });                                                                

                            }, 750);

                        })
                        .onNo(function () {
                            $confirmation.hide();
                        })
                        .show("Rezervasyonu geri çevirmek istediğinize emin misiniz?");

                });

        }

    };

    $self.schema = {

        update: function($model) {

            $self.request = $model;

            $self.views.item.views.top.views.left.views.number.update($self.request.number);
            $self.views.item.views.top.views.right.views.date.update($self.request.date);
            $self.views.item.views.address.views.text.update($self.request.address.value);

        }

    };

}, function() {

    $css.select("z-request-item z-view[z-name='v_item']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(94)
            .backgroundColor($theme.color.white)
            .marginTop(10)
            .paddingBottom(10)
            .round(10)
            .shadow("#dad9d9 0px 2px 20px 0px")
        .save();   

    $css.merge("z-request-item z-view[z-name='v_top']", "z-request-item z-view[z-name='v_bottom']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(90)
            .height(50)
            .marginTop(10)
        .save();

    $css.merge("z-request-item z-view[z-name='v_top_left']", "z-request-item z-view[z-name='v_bottom_left']")
        .begin()
            .relativeLeft()
            .widthPercent(50)
            .height(50)            
        .save();

    $css.merge("z-request-item z-view[z-name='v_top_right']", "z-request-item z-view[z-name='v_bottom_right']")
        .begin()
            .relativeLeft()
            .widthPercent(50)
            .height(50)
        .save();

    $css.merge("z-request-item z-view[z-name='v_take_over_address']", "z-request-item z-view[z-name='v_delivery_address']", "z-request-item z-view[z-name='v_note']")
        .begin()
            .relativeLeft()
            .widthPercentCentered(90)   
            .marginBottom(15)
        .save();

    $css.merge("z-request-item z-text-view[z-name='tv_approve']", "z-request-item z-text-view[z-name='tv_reject']")
        .begin()
            .absolute()
            .widthPercentCentered(80)
            .heightCentered(36)            
            .backgroundColor($theme.color.main)
            .round(3)            
        .save();

});