$js.compile("ImageView", [View], function($self) {
    
        $self.fields = {
    
            img: null,
    
            src: ""
    
        };    
    
        $self.overrides = {        
    
            on_tag: function () { return "z-image-view"; },  
    
            _on_switch: function () {            
                $self.img.className = $self._on_state_name();
            },
    
            on_compile: function () {
    
                var e = document.createElement($self.tag);
    
                $self.img = document.createElement("img");
                e.appendChild($self.img);
    
                return e;
    
            },        
    
            on_ready: function ($views, $ready) {
    
                $self.img = $self.element.querySelector("img");
                $self.img.onload = function () {
    
                    setTimeout($ready, 10);
    
                };
                $self.img.src = $self.src;
    
                if ($self.src == "")
                    $ready();
            }
    
        };  
        
        $self.schema = {

            update: function(src) {

                $self.img.onload = function() { };
                $self.img.src = src;

            }

        };

    }, function() {

        $css.select("z-image-view")
            .begin()
                .absolute()
                .sideFull()
                .mask()
            .save();

        $css.select("z-image-view img")
            .begin()
                .absolute()
                .widthFull()                
            .save();

    });