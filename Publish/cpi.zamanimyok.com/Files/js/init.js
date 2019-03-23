var queue = [];
var index = -1;

var onload = null;

var load = function () {

    index++;

    if (index == queue.length) {

        onload();

        queue = [];
        index = -1;

        return;
    }

    var item = queue[index];

    if (item.type == "icon") {

        e = document.createElement("link");
        e.setAttribute("rel", "shortcut icon");
        e.setAttribute("href", item.href);

        document.head.appendChild(e);

        load();

    } else if (item.type == "stylesheet") {

        e = document.createElement("link");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("href", item.href);
        e.onload = load;

        document.head.appendChild(e);

    } else if (item.type == "script") {

        e = document.createElement("script");
        e.setAttribute("type", "text/javascript");
        e.setAttribute("src", item.src);
        e.onload = function () {

            this.remove();

            load();

        };

        document.body.appendChild(e);

    }

};

queue.push({ type: "icon", href: "https://cdn.zamanimyok.com/File/Image/Icon/" + version });
queue.push({ type: "stylesheet", href: "https://cdn.zamanimyok.com/File/Styles/" + version });
queue.push({ type: "script", src: "https://cdn.zamanimyok.com/File/Script/" + version });
queue.push({ type: "script", src: "https://cdn.zamanimyok.com/Web/Script/" + version });
queue.push({ type: "script", src: "/Files/js/controllers/search.js" });
queue.push({ type: "script", src: "/Files/js/controllers/search_result.js" });
queue.push({ type: "script", src: "/Files/js/controllers/version.js" });

onload = function () {

    var e;

    e = document.createElement("style");
    e.setAttribute("type", "text/css");
    e.setAttribute("id", "dynamic");
    document.head.appendChild(e);

    e = document.createElement("zt-background");
    document.body.append(e);

    e = document.createElement("zt-login");
    document.body.append(e);

    e = document.createElement("zt-app");
    document.body.append(e);

    e = document.createElement("zt-lock");
    document.body.append(e);

    angular.bootstrap(document.body, ["z"]);

    onload = null;

    var scripts = document.body.getElementsByTagName("script");

    for (var i = 0; i < scripts.length; i++) {
        scripts[i].remove();
    }

};

load();