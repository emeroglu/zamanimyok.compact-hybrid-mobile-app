$js.compile("PostLoginPage", [Page], function($self) {     

    $self.virtuals = {     

        on_title: function () { return ""; },

        on_construct: function ($views) {

            $views.bar = new NavBar()
                .init({
                    title: $self.on_title()
                }); 

            $views.content = new View();

        },

        on_style: function ($views) {

            $css.select($self.selector)
                .begin()
                    .backgroundColor($theme.color.main)
                .save();            

            $css.select($views.content.selector)
                .begin()
                    .relativeLeft()
                    .widthFull()
                    .heightCropFromFull(60)
                    .backgroundColor($theme.color.grayLightest)
                .save();        

        }
       
    };         

});