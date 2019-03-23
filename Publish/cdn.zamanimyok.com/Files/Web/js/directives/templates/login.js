app.style(function($css, $theme, $path, $img) {

    $css.add("login", "z-login");
    $css.add("login.logo", "z-login logo");
    $css.add("login.logo.image", "z-login logo zc-image img");
    $css.add("login.username", "z-login username");
    $css.add("login.username.input", "z-login username input");
    $css.add("login.username.input_focus", "z-login username input:focus");
    $css.add("login.username.icon", "z-login username icon");
    $css.add("login.username.icon.image", "z-login username zc-image img");
    $css.add("login.username.line", "z-login username line");
    $css.add("login.password", "z-login password");
    $css.add("login.password.input", "z-login password input");
    $css.add("login.password.input_focus", "z-login password input:focus");
    $css.add("login.password.icon", "z-login password icon");
    $css.add("login.password.icon.image", "z-login password zc-image img");
    $css.add("login.password.line", "z-login password line");
    $css.add("login.send", "z-login send");

    $css.login
        .begin()
            .absolute()
            .widthCentered(450)
            .heightCentered(550)
            .mask()
        .save()
        .state("show")
            .opacity(1)
        .save()
        .state("hide")
            .opacity(0)
        .save();

    $css.login.logo
        .begin()
            .absolute()
            .widthFull()
            .height(200)
        .save();

    $css.login.logo.image
        .begin()
            .absolute()
            .widthCentered(250)
            .heightCentered($img.logo_white.fixedWidth(250))
        .save();

    $css.login.username
        .begin()
            .absolute()
            .widthCentered(350)
            .height(50)
            .top(225)
        .save();

    $css.login.username.input
        .begin()
            .absolute()
            .widthFull()
            .textHeight(50)
            .backgroundColor("transparent")
            .border("none")
            .textColor($theme.color.grayLight)
            .textSize(16)
            .textLight()
        .save();

    $css.login.username.input_focus
        .begin()
            .removeOutline()
        .save();

    $css.login.username.icon
        .begin()
            .absolute()
            .side(50)
            .top(0)
            .right(0)
        .save();

    $css.login.username.icon.image
        .begin()
            .absolute()
            .width(20)
            .heightCentered(20)
            .right(10)
            .opacity(0.6)
        .save();

    $css.login.username.line
        .begin()
            .absolute()
            .widthFull()
            .height(1)
            .backgroundColor($theme.color.whiteSoft)
            .bottom(0)
        .save();

    $css.login.password
        .begin()
            .absolute()
            .widthCentered(350)
            .height(50)
            .top(325)
        .save();

    $css.login.password.input
        .begin()
            .absolute()
            .widthFull()
            .textHeight(50)
            .backgroundColor("transparent")
            .border("none")
            .textColor($theme.color.grayLight)
            .textSize(16)
            .textLight()
        .save();

    $css.login.password.input_focus
        .begin()
            .removeOutline()
        .save();

    $css.login.password.icon
        .begin()
            .absolute()
            .side(50)
            .top(0)
            .right(0)
        .save();

    $css.login.password.icon.image
        .begin()
            .absolute()
            .width(20)
            .heightCentered(20)
            .right(10)
            .opacity(0.6)
        .save();

    $css.login.password.line
        .begin()
            .absolute()
            .widthFull()
            .height(1)
            .backgroundColor($theme.color.whiteSoft)
            .bottom(0)
        .save();

    $css.login.send
        .begin()
            .absolute()
            .width(100)
            .textHeight(40)
            .right(50)
            .bottom(50)
            .textCenter()
            .textColor($theme.color.white)
            .textSize(16)
            .border("1px solid #ededed99")
            .round(2)
            .cursorPointer()
        .save();

});

app.directive("ztLogin", function($css, $img, $path, $theme, $timeout, $view) {

    return {
        restricts: "E",
        templateUrl: $path.templates.login,
        scope: false,
        compile: function($element, $attr) {

            var element = $element[0].querySelector("z-login");
            var username = $element[0].querySelector("username input");
            var password = $element[0].querySelector("password input");
            var send = $element[0].querySelector("send");

            var self = {

                $element: angular.element(element),
                element: element,
                isInView: false,
                init: function() {

                    self.$element.addClass("z-hide");

                    $timeout(function() {

                        self.components.username.val("Username");
                        self.components.password.val("Password");

                        self.components.username.element.onfocus = function() {

                            if (self.components.username.val() == "Username") {
                            
                                self.components.username.val("")
        
                                $css.login.username.input.select()
                                    .begin()
                                        .textColor($theme.color.white)
                                    .commit();
        
                            }

                        };

                        self.components.username.element.onblur = function() {

                            if (self.components.username.val() == "") {
                            
                                self.components.username.val("Username");
        
                                $css.login.username.input.select()
                                    .begin()
                                        .textColor($theme.color.grayLight)
                                    .commit();
        
                            }

                        };

                        self.components.password.element.onfocus = function() {

                            if (self.components.password.val() == "Password") {
        
                                self.components.password.element.setAttribute("type", "password");
                                
                                self.components.password.val("");
        
                                $css.login.password.input.select()
                                    .begin()
                                        .textColor($theme.color.white)
                                    .commit();
        
                            }
        
                        };

                        self.components.password.element.onblur = function() {

                            if (self.components.password.val() == "") {
                                
                                self.components.password.element.setAttribute("type", "text");
        
                                self.components.password.val("Password");
        
                                $css.login.password.input.select()
                                    .begin()
                                        .textColor($theme.color.grayLight)
                                    .commit();
        
                            }
        
                        };

                        self.components.send.element.onclick = self.logged;

                    });

                },
                components: {
                    username: {
                        $element: angular.element(username),
                        element: username,
                        val: function(value) {

                            if (value == null)
                                return self.components.username.$element.val();
                            else
                                return self.components.username.$element.val(value);

                        }
                    },
                    password: {
                        $element: angular.element(password),
                        element: password,
                        val: function(value) {

                            if (value == null)
                                return self.components.password.$element.val();
                            else
                                return self.components.password.$element.val(value);

                        }
                    },
                    send: {
                        $element: angular.element(send),
                        element: send
                    }
                },
                show: function(onfinish) {

                    self.$element.removeClass("z-hide");
                    self.$element.addClass($theme.anim.login + " z-show");

                    $timeout(function() {

                        self.$element.removeClass($theme.anim.login);

                        self.isInView = true;

                        if (onfinish != null) onfinish();

                    }, $theme.anim.login_duration);

                },
                logged: function() {

                    $view.lock();

                    $view.login.dispose();

                    $timeout(function() {

                        $view.app.show();                  

                        $timeout(function() {
    
                            $view.nav.show();

                            $timeout(function() {
    
                                $view.unlock();
    
                            }, $theme.anim.nav_duration);

                        }, $theme.anim.app_duration);

                    }, $theme.anim.login_duration);

                },
                dispose: function() {

                    self.$element.removeClass("z-show");
                    self.$element.addClass($theme.anim.login + " z-hide");

                    $timeout(function() {

                        $element.remove();

                    }, $theme.anim.login_duration);

                }

            };

            self.init();

            $view.login = self;

        }
    }

});