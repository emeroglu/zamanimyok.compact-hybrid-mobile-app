app.factory("$theme", function ($rootScope) {

    var $factory = {};

    $factory.anim = {

        app: "z-ease-1000",
        app_duration: 1050,

        login: "z-ease-1000",
        login_duration: 1050,

        lexicon: "z-ease-1000",
        lexicon_duration: 1050,

        slider: "z-ease-750",
        slider_duration: 800,

        page_load: "z-ease-1000",
        page_load_duration: 1050,

        page_enable: "z-ease-500",
        page_enable_duration: 550,

        page_disable: "z-ease-500",
        page_disable_duration: 550,

        page_loading: "z-ease-500",
        page_loading_duration: 550,

        page_loaded: "z-ease-250",
        page_loaded_duration: 300,

        nav: "z-ease-750",
        nav_duration: 800

    };

    $factory.color = {

        whiteFull: "#FFFFFF",
        white: "#EDEDED",
        whiteSoft: "#EDEDEDE6",

        mainExtraLight: "#dde2e7",
        mainLight: "#c0d1e1",
        mainSoft: "#68a0cd",
        main: "#2f80c0",
        mainDark: "#497394",
        mainDarkSemiTrans: "#49739480",

        grayExtraLight: "#d1d0ce",
        grayLight: "#ABABAB",
        gray: "#A2A2A2",
        grayDark: "#616161",

        blackFull: "#000000",
        blackSoft: "#212121",

        active: "#2a8a0d",
        blocked: "#8c1515",
        info: "#383965",

    };

    $factory.dimen = {

        nav: {

            width: 300,
            bar_height: 125,
            logo_width: 150

        },
        page: {

            width_wide: 1075,
            width_medium: 775,
            width_small: 575,
            width_narrow: 475,
            space: 25,
            title_height: 70,
            view_padding: 25

        }

    };

    $rootScope.$theme = $factory;

    return $factory;

});