var $ = {

    cdn: cdn,
    api: api,

    start: new Date(),
    init: function () {

        window.$window = window;

        $window.$js = new $js();
        $window.$fetch = new $fetch();

        $fetch
            .begin()
                .queueStylesheet($.cdn + "/File/Styles/" + version)
                .queueScript("/File/Script/" + version)
                    .onFetch($._on_ready)
                .start();

    },
    _force_fonts: function (onfinish) {

        var text_200 = document.createElement("text-200");
        text_200.innerHTML = "abcAbcçşğÇŞĞ0123!";
        text_200.style = "position:relative; float:left; width: 100%; height: 50px; line-height: 50px; text-align: center; font-weight: 200;";        
        document.body.appendChild(text_200);

        var text_300 = document.createElement("text-300");
        text_300.innerHTML = "abcAbcçşğÇŞĞ0123!";
        text_300.style = "position:relative; float:left; width: 100%; height: 50px; line-height: 50px; text-align: center; font-weight: 300;";        
        document.body.appendChild(text_300);

        var text_400 = document.createElement("text-400");
        text_400.innerHTML = "abcAbcçşğÇŞĞ0123!";
        text_400.style = "position:relative; float:left; width: 100%; height: 50px; line-height: 50px; text-align: center; font-weight: 400;";        
        document.body.appendChild(text_400);

        var icon_300 = document.createElement("icon-300");
        icon_300.innerHTML = "<i class='fa fa-clock' style='position:relative; float:left; width: 100%; height: 50px; line-height: 50px; text-align: center; font-weight: 300;'></i>";                
        document.body.appendChild(icon_300);

        var icon_400 = document.createElement("icon-400");
        icon_400.innerHTML = "<i class='fa fa-clock' style='position:relative; float:left; width: 100%; height: 50px; line-height: 50px; text-align: center; font-weight: 400;'></i>";                
        document.body.appendChild(icon_400);                

        document.fonts.ready.then(function () {            

            text_200.remove();
            text_300.remove();
            text_400.remove();
            icon_300.remove();
            icon_400.remove();

            delete text_200;
            delete text_300;
            delete text_400;
            delete icon_300;
            delete icon_400;

            onfinish();

        });

    },
    _on_ready: function () {

        $._force_fonts(function () {

            var scripts = document.body.getElementsByTagName("script");

            for (var i = 0; i < scripts.length; i++) {
                scripts[i].remove();
            }

            var e = document.createElement("style");
            e.setAttribute("id", "dynamic");
            e.setAttribute("type", "text/css");
            e.innerHTML = "* { -webkit-tap-highlight-color: rgba(0,0,0,0); } ";
            document.head.appendChild(e);

            $window.$api = new $api();
            $window.$bridge = new $bridge();
            $window.$css = new $css();
            $window.$data = new $data();
            $window.$http = new $http();
            $window.$lexicon = new $lexicon();
            $window.$module = new $module();
            $window.$nav = new $nav();
            $window.$path = new $path();
            $window.$page = new $page();
            $window.$theme = new $theme();
            $window.$view = new $view();

            $js.on_compile();

            $bridge.native.getLocation(function ($lat, $long) {

                $data.lat = $lat;
                $data.long = $long;

                $bridge.native.getDeviceVariable("credentials", function($value) {

                    if ($value == "") {

                        $nav.load("prelogin", function() {

                            var now = new Date();
                            var duration = now - $.start;
                            var delay = 1000 - duration;
        
                            if (delay < 0) delay = 0;
        
                            setTimeout($bridge.native.onload, delay);
        
                            delete $;
        
                        });

                    } else {

                        var username = $value.split(",")[0];
                        var password = $value.split(",")[1];

                        $api.raw_login(username, password, function () {

                            if ($data.member.role == "USER")                       
                                $nav.load("user", function() {
                                
                                    var now = new Date();
                                    var duration = now - $.start;
                                    var delay = 1000 - duration;
                
                                    if (delay < 0) delay = 0;
                
                                    setTimeout($bridge.native.onload, delay);
                
                                    delete $;
                                
                                });
                            else if ($data.member.role == "SERVANT")                       
                                $nav.load("servant", function() {
                                
                                    var now = new Date();
                                    var duration = now - $.start;
                                    var delay = 1000 - duration;
                
                                    if (delay < 0) delay = 0;
                
                                    setTimeout($bridge.native.onload, delay);
                
                                    delete $;

                                });

                        }, function() {

                            $nav.load("prelogin", function() {

                                var now = new Date();
                                var duration = now - $.start;
                                var delay = 1000 - duration;
            
                                if (delay < 0) delay = 0;
            
                                setTimeout($bridge.native.onload, delay);
            
                                delete $;
            
                            });

                        });

                    }

                });

            });

        });

    }

};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.capitalize = function () {

    var initial = this.charAt(0).toUpperCase();
    var rest = this.slice(1);
    var restLower = "";

    for (var i = 0; i < rest.length; i++) {
        restLower += rest[i].toLowerCase();
    }

    return initial + restLower;

};

function $js() {

    this.id = 0;

    this.schemas = {};
    this.on_compile = function () {

        for (var i = 0; i < $js.on_compile_delegates.length; i++) {
            $js.on_compile_delegates[i]();
        }

        $js.on_compile_delegates = [];

    };
    this.on_compile_delegates = [];
    this.compile = function(name, imports, delegate, oncompile) {
        
        $js.schemas[name] = { imports: imports, delegate: delegate };

        eval("$window['" + name + "'] = function " + name + "() { this.__key__ = '" + name + "'; if (this.__name__ == undefined) this.__name__ = '" + name + "'; $js.instantiate(this); }");

        if (oncompile != null) $js.on_compile_delegates.push(oncompile);

    };

    this.instantiate = function(instance) {

        var key = instance.__key__;
        var schema = $js.schemas[key];

        for (var j = 0; j < schema.imports.length; j++) {
            $js.import(instance, eval(schema.imports[j]));
        }

        schema.delegate(instance);

        $js.build(instance);

        delete instance.__key__;

    };

    this.import = function (instance, proto) {

        proto.call(instance);

        if (instance.__protos__ == undefined)
            instance.__protos__ = [];

        instance.__protos__.push(proto);

    };

    this.build = function(instance) {

        if (instance.on_build != null) {
            instance.on_build(); 
            delete instance.on_build;
        }

        if (instance.__virtuals__ == undefined) {
            instance.__virtuals__ = {};            
        }

        if (instance.__extensions__ == undefined) {
            instance.__extensions__ = {};            
        }


        for (var key in instance.fields) {
            instance[key] = instance.fields[key];
        }

        for (var key in instance.delegates) {
            instance[key] = instance.delegates[key];
        }

        for (var key in instance.virtuals) {

            if (!(key in instance.__virtuals__))
                instance.__virtuals__[key] = [];

            instance.__virtuals__[key].push(instance.virtuals[key]);
            instance[key] = instance.virtuals[key];

        }
        
        for (var key in instance.extensions) {

            instance.__extensions__[key] = instance.extensions[key];
            eval("instance[key] = function () { var key = '" + key + "'; if (key in instance.__virtuals__) { for (var i = 0; i < instance.__virtuals__[key].length; i++) { instance.__virtuals__[key][i](arguments[0]); } } instance.__extensions__[key](arguments[0]); }");

        }                          

        for (var key in instance.overrides) {
            instance[key] = instance.overrides[key];
        }  

        for (var key in instance.schema) {
            instance[key] = instance.schema[key];
        } 

        instance.id = this.id++;
        
        if (instance.on_post_build != null) {
            instance.on_post_build();
            delete instance.on_post_build;
        }

        delete instance.fields;
        delete instance.delegates;
        delete instance.virtuals;
        delete instance.extensions;        
        delete instance.overrides;
        delete instance.schema;

    };

}

function $fetch() {

    var self = this;

    self._index = -1;
    self._queue = [];

    self.begin = function () { self._index = -1; self._queue = []; return self; };

    self.queueStylesheet = function (url) { self._queue.push({ type: "stylesheet", url: url }); return self; };
    self.queueScript = function (url) { self._queue.push({ type: "script", url: url }); return self; };

    self.on_fetch = function () { };
    self.onFetch = function (delegate) { self.on_fetch = delegate; return self; };

    self._on_recurse_end = function () { };
    self._recurse = function () {

        self._index++;

        if (self._index == self._queue.length) {

            self._on_recurse_end();

            return;

        }

        var item = self._queue[self._index];

        eval("self." + item.type + "(item.url, self._recurse);");

    };

    self.stylesheet = function (href, onload) {

        var e = document.createElement("link");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("href", href);
        e.onload = onload;

        document.head.appendChild(e);

    };

    self.script = function (src, onload) {

        var e = document.createElement("script");
        e.setAttribute("type", "text/javascript");
        e.setAttribute("src", src);
        e.onload = function () {

            this.remove();

            onload();

        };

        document.body.appendChild(e);

    };

    self.module = function (name) {

        var url = "/File/Module/" + version + "/" + name.capitalize();
        self.script(url, self.on_fetch);

    };

    self.start = function () {

        self._on_recurse_end = self.on_fetch;
        self._recurse();

    };

}

$.init();