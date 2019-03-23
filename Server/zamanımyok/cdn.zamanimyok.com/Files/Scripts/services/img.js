app.factory("$img", function() {

    var $factory = { };

    $factory.logo_white = {

        ratioWH: (1069 / 190).toFixed(2),
        ratioHW: (190 / 1069).toFixed(2),
        fixedWidth: function (w) {
            return (w * this.ratioHW).toFixed(1);
        },
        fixedHeight: function (h) {
            return (h * this.ratioWH).toFixed(1);
        }

    };

    return $factory;

});