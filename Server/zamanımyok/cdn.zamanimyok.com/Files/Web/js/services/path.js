app.factory("$path", function($rootScope) {

    var $factory = {};

    $factory.urls = {};

    $factory.urls.img = "https://test-cdn-zamanimyok.azurewebsites.net/File/Image/" + version;    
    $factory.urls.templates = "https://test-cdn-zamanimyok.azurewebsites.net/Web/Template/" + version;
    $factory.urls.pages = "/Files/html/pages";

    $factory.img = {};
    $factory.templates = {};
    $factory.pages = {};

    $factory.img.apple = $factory.urls.img + "/apple";
    $factory.img.arrow = $factory.urls.img + "/arrow";
    $factory.img.arrow_left = $factory.urls.img + "/arrow_left";
    $factory.img.background = $factory.urls.img + "/background" + (Math.floor(Math.random() * 3) + 1);
    $factory.img.chrome = $factory.urls.img + "/chrome";
    $factory.img.close = $factory.urls.img + "/close";
    $factory.img.edge = $factory.urls.img + "/edge";
    $factory.img.explorer = $factory.urls.img + "/explorer";
    $factory.img.firefox = $factory.urls.img + "/firefox";
    $factory.img.git = $factory.urls.img + "/git";
    $factory.img.key = $factory.urls.img + "/key";
    $factory.img.loading = $factory.urls.img + "/loading";
    $factory.img.logo = $factory.urls.img + "/logo";
    $factory.img.logo_white = $factory.urls.img + "/logo_white";
    $factory.img.logout = $factory.urls.img + "/logout";
    $factory.img.nav = $factory.urls.img + "/nav";
    $factory.img.profile = $factory.urls.img + "/profile";
    $factory.img.ratio = $factory.urls.img + "/ratio";
    $factory.img.safari = $factory.urls.img + "/safari";
    $factory.img.screen = $factory.urls.img + "/screen";
    $factory.img.search = $factory.urls.img + "/search";
    $factory.img.settings = $factory.urls.img + "/settings";
    $factory.img.windows_10 = $factory.urls.img + "/windows_10";

    $factory.templates.app = $factory.urls.templates + "/App";
    $factory.templates.bar = $factory.urls.templates + "/Bar";
    $factory.templates.clock = $factory.urls.templates + "/Clock";
    $factory.templates.content = $factory.urls.templates + "/Content";
    $factory.templates.info = $factory.urls.templates + "/Info";
    $factory.templates.login = $factory.urls.templates + "/Login";
    $factory.templates.nav = $factory.urls.templates + "/Nav";

    $factory.pages.search = $factory.urls.pages + "/search.html";
    $factory.pages.search_result = $factory.urls.pages + "/search_result.html";
    $factory.pages.page_1 = $factory.urls.pages + "/page_1.html";
    $factory.pages.page_2 = $factory.urls.pages + "/page_2.html";
    $factory.pages.page_3 = $factory.urls.pages + "/page_3.html";
    $factory.pages.version = $factory.urls.pages + "/version.html";

    $rootScope.$path = $factory;

    return $factory;

});