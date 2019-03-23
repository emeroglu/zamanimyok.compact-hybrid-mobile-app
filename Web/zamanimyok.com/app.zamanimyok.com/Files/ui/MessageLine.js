$js.compile("MessageLine", [View], function ($self) {      

    $self.delegates = {

        begin: function () { $self.on_show = null; $self.on_hide = null; $self.delay = 0; return $self; },

        on_show: null,
        onShow: function (delegate) { $self.on_show = delegate; return $self; },

        on_hide: null,
        onHide: function (delegate) { $self.on_hide = delegate; return $self; },

        delay: 0,
        provideDelay: function (delay) { $self.delay = delay; return $self; }

    };

    $self.overrides = {

        on_tag: function () { return "z-message-line"; },

        on_construct: function ($views) {

            $views.line = new View().transition("ease", 500);

            $views.line.views.icon = new View();
            $views.line.views.icon.views.inset = new View();

            $views.line.views.icon.views.inset.views.icon = new IconView()
                .init({
                    icon: "spinner",
                    size: 5,
                    side: 50,
                    weight: "light",
                    color: $theme.color.main,
                    spin: true
                });

            $views.line.views.text = new View();
            $views.line.views.text.views.inset = new View();

            $views.line.views.text.views.inset.views.text = new TextView()
                .init({
                    size: 3.5,
                    line_height: 30,
                    weight: "light",
                    align: "left",                    
                    color: $theme.color.grayLight,
                    text: "Yükleniyor..."
                });

        },

        on_style: function ($views) {

            $css.select($views.line.selector)
                .begin()
                    .absolute()
                    .widthFull()
                    .height(50)
                    .bottom(0)
                    .left(0)                    
                    .backgroundColor($theme.color.whiteFull)                    
                    .translateY(70)
                .save()
                .state("show")
                    .translateY(0)
                .save()
                .state("hide")
                    .translateY(70)
                .save();           

            $css.select($views.line.views.icon.selector)
                .begin()
                    .relativeLeft()
                    .widthPercent(15)
                    .height(50)
                .save();

            $css.select($views.line.views.icon.views.inset.selector)
                .begin()
                    .absolute()
                    .sideCentered(50)
                .save();

            $css.select($views.line.views.text.selector)
                .begin()
                    .relativeLeft()
                    .widthPercent(85)
                    .height(50)
                .save();

            $css.select($views.line.views.text.views.inset.selector)
                .begin()
                    .absolute()
                    .widthPercent(90)
                    .heightCentered(30)
                    .marginRightPercent(10)
                .save();

        }

    };

    $self.schema = {

        show: function () {  
            
            $lock.lock();         
            $shade.pop(); 
            $self.views.line.switch("show");
            
            setTimeout(function() {
                
                if ($self.on_show != null) 
                    $self.on_show();
                
                    $lock.unlock();

            }, ($self.delay == 0) ? 750 : $self.delay);

        },

        showThenHide: function () {           
            $lock.lock();
            $shade.pop(); 
            $self.views.line.switch("show");
            setTimeout($self.hide, ($self.delay == 0) ? 750 : $self.delay + 750);
        },

        hide: function () {
            
            $self.views.line.switch("hide");
            $shade.vanish();
            
            setTimeout(function() {
                
                if ($self.on_hide != null) 
                    $self.on_hide();
                
                    $lock.unlock();

            }, ($self.delay == 0) ? 750 : $self.delay);

        },

        loading: function (text) {
            $self.views.line.views.icon.views.inset.views.icon.update("spinner", $theme.color.main, true);
            $self.views.line.views.text.views.inset.views.text.update(text);
            return $self;
        },

        info: function (text) {
            $self.views.line.views.icon.views.inset.views.icon.update("info-circle", $theme.color.main, false);
            $self.views.line.views.text.views.inset.views.text.update(text);
            return $self;
        },

        success: function (text) {
            $self.views.line.views.icon.views.inset.views.icon.update("check", $theme.color.success, false);
            $self.views.line.views.text.views.inset.views.text.update(text);
            return $self;
        },

        error: function (text) {
            $self.views.line.views.icon.views.inset.views.icon.update("exclamation-square", $theme.color.error, false);
            $self.views.line.views.text.views.inset.views.text.update(text);
            return $self;
        }

    };

});