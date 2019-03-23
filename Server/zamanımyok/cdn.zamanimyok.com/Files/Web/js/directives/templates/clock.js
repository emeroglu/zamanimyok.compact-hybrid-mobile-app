app.style(function($css, $theme, $path) {

    $css.add("clock", "z-clock");
    $css.add("clock.time", "z-clock time");
    $css.add("clock.date", "z-clock date");

    $css.clock
        .begin()
            .absolute()
            .width(500)
            .height(200)
            .right(50)
            .bottom(50)
            .opacity(0.5)
        .save();

    $css.clock.time
        .begin()
            .relativeLeftFull()
            .textHeight(130)
            .textRight()
            .textSize(110)
            .textColor($theme.color.white)
            .textExtraLight()
        .save();
    
    $css.clock.date
        .begin()
            .relativeLeftFull()
            .textHeight(70)
            .textRight()
            .textSize(40)
            .textColor($theme.color.white)
            .textExtraLight()
        .save();

});

app.directive("ztClock", function($bcast, $lexicon, $path, $timeout, $view) {

    return {
        restricts: "E",
        templateUrl: $path.templates.clock,
        scope: false,
        compile: function($element, $attr) {

            var element = $element[0].querySelector("z-clock");
            var time = $element[0].querySelector("time");
            var date = $element[0].querySelector("date");

            var self = {
                $element: angular.element(element),
                element: element,
                init: function() {

                    $bcast.listen("lexicon_digest", {
                        owner: "clock",
                        invoke: function() {

                            var dayOfWeek = $lexicon.days[self.dayOfWeek];
                            var month = $lexicon.months[self.month];
                            
                            self.date = dayOfWeek + ", " + month + " " + self.dayOfMonth;

                            self.components.date.text(self.date);

                        }
                    });

                    self.recurse();
                    
                },
                components: {
                    time: {
                        $element: angular.element(time),
                        element: time,
                        text: function(text) {

                            self.components.time.$element.text(text);

                        }
                    },
                    date: {
                        $element: angular.element(date),
                        element: date,
                        text: function(text) {
                            
                            self.components.date.$element.text(text);

                        }
                    }
                },
                recurse: function() {

                    self.now = new Date();

                    self.dayOfMonth = self.now.getDate();
                    self.dayOfWeek = self.now.getDay();
                    self.month = self.now.getMonth();
                    self.hour = self.now.getHours();
                    self.minute = self.now.getMinutes();

                    if (self.hour < 10)
                        self.hour = "0" + self.hour;

                    if (self.minute < 10)
                        self.minute = "0" + self.minute;

                    var dayOfWeek = $lexicon.days[self.dayOfWeek];
                    var month = $lexicon.months[self.month];
                    
                    self.time = self.hour + ":" + self.minute;
                    self.date = dayOfWeek + ", " + month + " " + self.dayOfMonth;

                    self.components.time.text(self.time);
                    self.components.date.text(self.date);

                    $timeout(self.recurse, 10000);

                }
            };

            self.init();

            $view.clock = self;

        }
    }

});