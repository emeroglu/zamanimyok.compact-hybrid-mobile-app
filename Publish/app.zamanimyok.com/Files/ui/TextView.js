$js.compile("TextView", [View], function($self) {

    $self.fields = {
        
        text: ""

    };

    $self.overrides = {

        on_tag: function () { return "z-text-view"; }

    };

    $self.schema = {

        on_compile: function() {

            var e = document.createElement($self.tag);
            e.innerHTML = $self.text;

            return e;

        }

    };

});