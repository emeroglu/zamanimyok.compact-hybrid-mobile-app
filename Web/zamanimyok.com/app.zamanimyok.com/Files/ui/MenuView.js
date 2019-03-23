$js.compile("MenuView", [View], function($self) {    

    $self.overrides = {

        on_tag: function() { return "z-menu-view"; },

        on_compile: function() {            

            var e = document.createElement($self.on_tag());

            var items = [
                { icon: "mouse-pointer", text: "Rezervasyonlarım", nav: function () { $api.reservations(function () { $nav.to("reservations"); }); } },
                { icon: "car", text: "Araçlarım", nav: function () { $api.vehicles(function () { $nav.to("vehicles"); }); } },
                { icon: "map-marker-alt", text: "Adreslerim", nav: function () { $api.addresses(function() { $nav.to("addresses"); }); } },
                { icon: "credit-card", text: "Kartlarım", nav: function () { $api.cards(function() { $nav.to("cards"); }); } },
                { icon: "info-circle", text: "Hakkında", nav: function () { $nav.to("about"); } },
                { icon: "envelope", text: "İletişim", nav: function () { $nav.to("contact"); } },
                { icon: "sign-out", text: "Çıkış", nav: function () { $self.logout(); } }
            ];            

            var item;

            items.forEach(i => {

                item = document.createElement("z-menu-item");

                var html = "";

                html += "<icon><i class='fal fa-" + i.icon + "'></i></icon>";
                html += "<text>" + i.text + "</text>";

                item.innerHTML = html;

                item.onclick = function () {

                    $page.current.close();

                    setTimeout(i.nav, 750);

                };

                e.appendChild(item);

            });

            return e;

        }

    };

    $self.schema = {

        logout: function () {

            $api.logout(function () { $nav.load("prelogin"); });

        }

    };

}, function() {

    $css.select("z-menu-view")
        .begin()
            .absolute()
            .widthPercent(70)
            .height(60 * 7)
            .topFromViewportHeight(21)
        .save();

    $css.select("z-menu-view z-menu-item")
        .begin()
            .relativeLeft()
            .widthPercent(95)
            .marginLeftPercent(5)
            .height(60)
        .save();
    
    $css.select("z-menu-view z-menu-item icon")
        .begin()
            .relativeLeft()
            .side(60)
        .save();

    $css.select("z-menu-view z-menu-item icon i")
        .begin()
            .absolute()
            .sideCentered(40)
            .textCenter()
            .textSizeViewportWidth(4)
            .textColor($theme.color.white)
            .impTextLineHeight(40)
        .save();

    $css.select("z-menu-view z-menu-item text")
        .begin()
            .relativeLeft()
            .widthCropFromFull(60)
            .height(60)
            .textHeight(60)
            .textLight()
            .textSize(18)
            .textColor($theme.color.white)
        .save();

});