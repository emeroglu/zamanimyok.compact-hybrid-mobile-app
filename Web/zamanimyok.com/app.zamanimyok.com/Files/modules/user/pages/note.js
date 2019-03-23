$js.compile("NotePage", [PostLoginPage], function($self) {

    $self.overrides = {

        on_key: function() { return "note"; },

        on_type: function () { return "middle"; },

        on_back_page: function () { return "delivery_address_selection"; },

        on_title: function () { return "Not Bırakın"; },

        on_complete: function ($views, $ready) {

            if ($data.new_request.note == undefined)
                $data.new_request.note = "";

            $ready();

        }

    };

    $self.extensions = {

        on_construct: function($views) {                                                         

            $views.content.views.text = new Textarea()
                .init({
                    placeholder: "Aracınızı teslim alacak valeye müsait olduğunuz saat aralığı veya aracın anahtarını bırakacağınız yer ile ilgili notunuzu buraya yazabilirsiniz..."  
                })
                .onChange(function ($text) {
                    $data.new_request.note = $text;
                });

            $views.content.views.save = new Button()
                .init({
                    text: "Devam"
                })
                .onClick(function () {
                    
                    $nav.to("preview");

                });


        },        

        on_style: function($views) {          

            $css.select($views.content.views.text.selector)
                .begin()
                    .top(20)                    
                .save();     

            $css.select($views.content.views.save.selector)
                .begin()
                    .left(0)
                    .bottom(0)
                .save();

        }        

    };     

});