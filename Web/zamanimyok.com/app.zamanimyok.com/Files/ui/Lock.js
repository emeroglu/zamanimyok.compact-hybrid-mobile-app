$js.compile("Lock", [View], function($self) {

    $self.overrides = {

        on_tag: function() { return "z-lock"; },

        on_ready: function($views, $ready) {

            $self.unlock();

            $ready();

        }

    };

    $self.schema = {

        lock: function() {

            $self.element.className = "z-disp";

        },

        unlock: function() {

            $self.element.className = "z-none";

        }

    };

}, function() {

    $css.select("z-lock")
        .begin()
            .absolute()
            .sideFull()
            .transparent()
        .save();

});