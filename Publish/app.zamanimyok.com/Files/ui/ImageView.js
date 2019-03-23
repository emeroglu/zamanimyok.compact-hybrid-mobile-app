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
    
                    setTimeout($ready, 50);
    
                };
                $self.img.src = $self.src;
    
            }
    
        };   

    });