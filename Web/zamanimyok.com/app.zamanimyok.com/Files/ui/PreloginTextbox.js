$js.compile("PreloginTextbox", [View], function ($self) {

    $self.fields = {

        input: null,
        line: null,
        left_line: null,
        right_line: null,

        type: "text",
        icon: "",
        iconAnchor: "",
        placeholder: "",
        case: ""

    };

    $self.delegates = {

        on_change: function() { },
        onChange: function(delegate) { $self.on_change = delegate; return $self; }

    };

    $self.overrides = {

        on_tag: function () { return "z-prelogin-textbox"; },

        on_compile: function () {

            var e = document.createElement($self.tag);

            $self.input = document.createElement("input");
            $self.input.setAttribute("type", "text");
            e.appendChild($self.input);

            $self.line = document.createElement("line");
            $self.line.className = "z-ease-500";
            e.appendChild($self.line); 

            $self.left_line = document.createElement("line-left");
            $self.left_line.className = "z-ease-500";
            e.appendChild($self.left_line); 

            $self.right_line = document.createElement("line-right");
            $self.right_line.className = "z-ease-500";
            e.appendChild($self.right_line); 

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

                $css.merge($self.selector + " line-left", $self.selector + " line-right")
                    .begin()
                        .opacity(1)
                    .commitAll();

                $css.select($views.icon.selector)
                    .begin()
                        .textColor($theme.color.main)
                    .commit();
        
                $self.input.setAttribute("type", $self.type);

                if ($self.raw() == $self.placeholder)        
                    $self.text("");                           

            };

            $self.input.onblur = function() {                                                  
        
                $css.select($self.selector + " line")
                    .begin()
                        .backgroundColor($theme.color.grayLighter)
                    .commit();

                $css.merge($self.selector + " line-left", $self.selector + " line-right")
                    .begin()
                        .opacity(0)
                    .commitAll();

                $css.select($views.icon.selector)
                    .begin()
                        .textColor($theme.color.grayLighter)
                    .commit(); 

                if ($self.raw() == "") {

                    $self.text($self.placeholder);
                    $self.input.setAttribute("type", "text");       

                }
        
            };

            $self.input.oninput = function() {                        
        
                $self.on_change();

                if ($self.raw() == $self.placeholder)        
                    $self.text("");
        
            };            

            $self.text($self.placeholder);

            $ready();

        }

    };

    $self.schema = {

        reset: function () {
            $self.input.setAttribute("type", "text");
            $self.input.value = $self.placeholder;
        },

        raw: function() {
            return $self.input.value;
        },

        text: function(s) {

            if (s == null) {

                var s = $self.input.value.trim();

                if ($self.case == "")
                    return s;
                else if ($self.case == "lower")
                    return s.toLowerCase();
                else if ($self.case == "upper")
                    return s.toUpperCase();

            } else
                $self.input.value = s;

        },

        valid: function() {

            return ($self.input.value != "" && $self.input.value != $self.placeholder);

        }

    };

}, function () {

    $css.select("z-prelogin-textbox")
        .begin()
            .relativeLeft()
            .widthPercentCentered(70)
            .height(45)
        .save();

    $css.select("z-prelogin-textbox input")
        .begin()
            .absolute()
            .widthCropFromFull(60)            
            .textHeight(30)
            .top(10)
            .left(10)
            .padding(0)
            .margin(0)
            .removeBorder()
            .removeBackground()
            .removeOutline()
            .textSizeViewportWidth(3.75)
            .textColor($theme.color.grayLighter)
            .textRegular()     
            .textFamily()
        .save();

    $css.select("z-prelogin-textbox line")
        .begin()
            .absolute()
            .widthFull()
            .height(1)
            .bottom(0)
            .backgroundColor($theme.color.grayLighter)
        .save();

    $css.select("z-prelogin-textbox line-left")
        .begin()
            .absolute()
            .width(1)
            .height(7.5)
            .left(0)
            .bottom(0)
            .backgroundColor($theme.color.main)
            .opacity(0)
        .save();

    $css.select("z-prelogin-textbox line-right")
        .begin()
            .absolute()
            .width(1)
            .height(7.5)
            .right(0)
            .bottom(0)
            .backgroundColor($theme.color.main)
            .opacity(0)
        .save();

    $css.select("z-prelogin-textbox [z-name='icon']")
        .begin()
            .absolute()
            .width(50)
            .height(45)
            .textColor($theme.color.grayLighter)
        .save();

});