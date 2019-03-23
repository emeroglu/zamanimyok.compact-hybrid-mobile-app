$js.compile("MessageBox", [View], function ($self) {   

    $self.delegates = {

        begin: function () { $self.on_show = null; $self.on_hide = null; $self.delay = 0; $self.text = ""; $self.type = ""; return $self; },

        on_show: null,
        onShow: function (delegate) { $self.on_show = delegate; return $self; },

        on_hide: null,
        onHide: function (delegate) { $self.on_hide = delegate; return $self; },

        delay: 0,
        provideDelay: function (delay) { $self.delay = delay; return $self; },

        text: "",
        provideText: function (text) { $self.text = text; return $self; },

        type: "",
        provideType: function (type) { $self.type = type; return $self; }

    };

    $self.overrides = {

        on_tag: function () { return "z-message"; },

        on_construct: function ($views) {

            $views.message = new View().transition("ease", 500);

            $views.message.views.icon = new View();
            $views.message.views.icon.views.inset = new View();

            $views.message.views.icon.views.inset.views.icon = new IconView()
                .init({
                    icon: "info-circle",
                    size: 7,
                    side: 80,
                    weight: "light",
                    color: $theme.color.main
                });

            $views.message.views.text = new View();
            $views.message.views.text.views.inset = new View();

            $views.message.views.text.views.inset.views.text = new TextView()
                .init({
                    size: 3.25,
                    line_height: 18,
                    weight: "light",
                    align: "left",
                    text: $self.text,
                    color: $theme.color.grayLight
                });

        },

        on_style: function ($views) {

            $css.select($views.message.selector)
                .begin()
                    .absolute()
                    .widthFull()
                    .height(80)
                    .bottom(0)
                    .left(0)                    
                    .backgroundColor($theme.color.whiteFull)
                    .shadow("#909090 0px 5px 20px 0px")
                    .translateY(100)
                .save()
                .state("show")
                    .translateY(0)
                .save()
                .state("hide")
                    .translateY(100)
                .save();           

            $css.select($views.message.views.icon.selector)
                .begin()
                    .relativeLeft()
                    .widthPercent(20)
                    .height(80)
                .save();

            $css.select($views.message.views.icon.views.inset.selector)
                .begin()
                    .absolute()
                    .sideCentered(80)
                .save();

            $css.select($views.message.views.text.selector)
                .begin()
                    .relativeLeft()
                    .widthPercent(80)
                    .height(80)
                .save();

            $css.select($views.message.views.text.views.inset.selector)
                .begin()
                    .absolute()
                    .widthPercent(90)
                    .heightCentered(54)
                    .marginRightPercent(10)
                .save();

        }

    };

    $self.schema = {

        show: function () { 

            $lock.lock();

            if ($self.type == "four") {
                $css.select($self.views.message.views.text.views.inset.views.text.selector)
                    .begin()
                        .textSizeViewportWidth(3)
                    .commit();
            } else {
                $css.select($self.views.message.views.text.views.inset.views.text.selector)
                    .begin()
                        .textSizeViewportWidth(3.25)
                    .commit();
            }

            $self.views.message.views.text.views.inset.views.text.update($self.text);
            $shade.pop(); 
            $self.views.message.switch("show");
            
            setTimeout(function() {
                
                if ($self.on_show != null) 
                    $self.on_show();
                
                    $lock.unlock();

            }, ($self.delay == 0) ? 750 : $self.delay);

        },

        showThenHide: function () {           
            $shade.pop(); 
            $self.show();
            setTimeout($self.hide, ($self.delay == 0) ? 750 : $self.delay + 750);
        },

        hide: function () {
            $self.views.message.switch("hide");
            $shade.vanish();
            if ($self.on_hide != null) setTimeout($self.on_hide, ($self.delay == null) ? 750 : $self.delay);
        } 

    };

});