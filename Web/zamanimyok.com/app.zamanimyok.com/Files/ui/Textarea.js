$js.compile("Textarea", [View], function ($self) {

    $self.fields = {

        area: null,
        line: null,
        left_line: null,
        right_line: null

    };

    $self.delegates = {

        on_change: function() { },
        onChange: function(delegate) { $self.on_change = delegate; return $self; }

    };

    $self.overrides = {

        on_tag: function () { return "z-textarea"; },

        on_compile: function () {

            var e = document.createElement($self.tag);

            $self.area = document.createElement("textarea");
            $self.area.rows = 1;
            e.appendChild($self.area);

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

        },        

        on_ready: function ($views, $ready) {

            $self.area.onfocus = function () {

                $css.select($self.selector +  " textarea")
                    .begin()
                        .textColor($theme.color.gray)
                    .commit();

                $css.select($self.selector + " line")
                    .begin()
                        .backgroundColor($theme.color.main)
                    .commit();

                $css.merge($self.selector + " line-left", $self.selector + " line-right")
                    .begin()
                        .opacity(1)
                    .commitAll();

                if ($self.text() == $self.placeholder)  {

                    $css.select($self.selector + " textarea")
                        .begin()
                            .textLight()
                        .commit();

                    $self.text("");

                }
                    

            };

            $self.area.onblur = function() {                                                  
        
                $css.select($self.selector +  " textarea")
                    .begin()
                        .textColor($theme.color.grayLighter)
                    .commit();

                $css.select($self.selector + " line")
                    .begin()
                        .backgroundColor($theme.color.grayLighter)
                    .commit();

                $css.merge($self.selector + " line-left", $self.selector + " line-right")
                    .begin()
                        .opacity(0)
                    .commitAll();

                if ($self.text() == "") {

                    $css.select($self.selector + " textarea")
                        .begin()
                            .textRegular()
                        .commit();

                    $self.text($self.placeholder);

                }
        
            };

            $self.area.oninput = function() {                                                

                if ($self.text() == $self.placeholder) {
                    $self.text("");
                }

                $self.on_change($self.text());

                $css.select($self.selector +  " textarea")
                    .begin()
                        .textColor($theme.color.gray)
                    .commit();
                
                $self.adjust();

            };            

            $self.text($self.placeholder);

            $ready();

        }

    };

    $self.schema = {

        adjust: function () {

            var height = $self.area.offsetHeight;
            var scroll = $self.area.scrollHeight;

            var lines = Math.ceil($self.area.scrollHeight / 30);                

            $self.area.rows = lines;

            $css.select("z-textarea")
                .begin()
                    .height(30 * lines + 15)
                .commit();

        },

        text: function(s) {

            if (s == null)
                return $self.area.value;                            
            else
                $self.area.value = s;

            $self.adjust();

        },

        valid: function() {

            return ($self.area.value != "" && $self.area.value != $self.placeholder);

        }

    };

}, function () {

    $css.select("z-textarea")
        .begin()
            .absolute()
            .widthPercentCentered(90)
            .height(45)
            .mask()
            .backgroundColor($theme.color.grayLightest)
        .save();

    $css.select("z-textarea textarea")
        .begin()
            .absolute()
            .widthCropFromFull(20)
            .textLineHeight(30)
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

    $css.select("z-textarea line")
        .begin()
            .absolute()
            .widthFull()
            .height(1)
            .bottom(0)
            .backgroundColor($theme.color.grayLighter)
        .save();

    $css.select("z-textarea line-left")
        .begin()
            .absolute()
            .width(1)
            .height(7.5)
            .left(0)
            .bottom(0)
            .backgroundColor($theme.color.main)
            .opacity(0)
        .save();

    $css.select("z-textarea line-right")
        .begin()
            .absolute()
            .width(1)
            .height(7.5)
            .right(0)
            .bottom(0)
            .backgroundColor($theme.color.main)
            .opacity(0)
        .save();

    $css.select("z-textarea [z-name='icon']")
        .begin()
            .absolute()
            .width(50)
            .height(45)
            .textColor($theme.color.grayLighter)
        .save();

});