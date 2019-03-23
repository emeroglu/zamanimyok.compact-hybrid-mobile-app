$js.compile("Button", [View], function($self) {

    $self.fields = {

        text: ""

    };

    $self.delegates = {

        on_click: function() { },
        onClick: function(delegate) { $self.on_click = delegate; return $self; }

    };

    $self.overrides = {

        on_tag: function() { return "z-button"; },

        on_ready: function($views, $ready) {

            $self.element.innerHTML = $self.text;
            $self.element.className = "z-ease-500";
            $self.element.onclick = $self.on_click;

            $ready();

        }

    };
    
    $self.schema = {

        enable: function() {
            
            $self.element.onclick = $self.on_click;

            $css.select($self.selector)
                .begin()
                    .backgroundColor($theme.color.main)
                .commit();

        },
        disable: function() {

            $self.element.onclick = function() { };

            $css.select($self.selector)
                .begin()
                    .backgroundColor($theme.color.mainDark)
                .commit();

        }

    };

}, function() {

    $css.select("z-button")
        .begin()
            .backgroundColor($theme.color.main)
        .save();

});