$js.compile("Textbox", [View], function ($self) {

    $self.fields = {

        input: null,
        line: null,

        type: "text",
        icon: "",
        iconAnchor: "",
        placeholder: ""

    };

    $self.delegates = {

        on_change: function() { },
        onChange: function(delegate) { $self.on_change = delegate; return $self; }

    };

    $self.overrides = {

        on_tag: function () { return "z-textbox"; },

        on_compile: function () {

            var e = document.createElement($self.tag);

            $self.input = document.createElement("input");
            $self.input.setAttribute("type", "text");
            e.appendChild($self.input);

            $self.line = document.createElement("line");
            $self.line.className = "z-ease-500";
            e.appendChild($self.line);            

            return e;

        },

        on_construct: function ($views) {

            $views.icon = new View();
            $views.icon.name = "icon";

            $views.icon.views.icon = new IconView();
            $views.icon.views.icon.icon = $self.icon;
            $views.icon.views.icon.size = "tiny";
            $views.icon.views.icon.weight = "light";            

        },        

        on_ready: function ($views, $ready) {

            $views.icon.views.icon.element.className = "z-ease-500";

            if ($self.iconAnchor == "right") {                

                $css.select($views.icon.selector)
                    .begin()
                        .right(0)
                    .save();                

            } else if ($self.iconAnchor == "left") {

                $css.select($self.selector + " input")
                    .begin()
                        .right(0)
                    .save();

                $css.select($views.icon.selector)
                    .begin()
                        .left(0)
                    .save();

            }

            $self.input.onfocus = function () {

                $css.select($self.selector + " line")
                    .begin()
                        .backgroundColor($theme.color.main)
                    .commit();

                $css.select($views.icon.selector)
                    .begin()
                        .textColor($theme.color.main)
                    .commit();
        
                $self.input.setAttribute("type", $self.type);

                if ($self.text() == $self.placeholder)        
                    $self.text("");                           

            };

            $self.input.onblur = function() {                                                  
        
                $css.select($self.selector + " line")
                    .begin()
                        .backgroundColor($theme.color.grayLighter)
                    .commit();

                $css.select($views.icon.selector)
                    .begin()
                        .textColor($theme.color.grayLighter)
                    .commit(); 

                if ($self.text() == "") {

                    $self.text($self.placeholder);
                    $self.input.setAttribute("type", "text");       

                }
        
            };

            $self.input.oninput = function() {                        
        
                $self.on_change();

                if ($self.text() == $self.placeholder)        
                    $self.text("");
        
            };            

            $self.text($self.placeholder);

            $ready();

        }

    };

    $self.schema = {

        text: function(s) {

            if (s == null)
                return $self.input.value;
            else
                $self.input.value = s;

        },

        valid: function() {

            return ($self.input.value != "" && $self.input.value != $self.placeholder);

        }

    };

}, function () {

    $css.select("z-textbox")
        .begin()
            .absolute()
            .sideFull()
        .save();

    $css.select("z-textbox input")
        .begin()
            .absolute()
            .widthCropFromFull(60)
            .heightFull()
            .left(10)
            .padding(0)
            .margin(0)
            .removeBorder()
            .removeBackground()
            .removeOutline()
            .textSizeViewportWidth(3.75)
            .textColor($theme.color.grayLighter)
            .textLight()
        .save();

    $css.select("z-textbox line")
        .begin()
            .absolute()
            .widthFull()
            .height(1)
            .bottom(1)
            .backgroundColor($theme.color.grayLighter)
        .save();

    $css.select("z-textbox [z-name='icon']")
        .begin()
            .absolute()
            .width(50)
            .heightFull()
            .textColor($theme.color.grayLighter)
        .save();

});