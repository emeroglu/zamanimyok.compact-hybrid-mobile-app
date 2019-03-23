$js.compile("$css", [], function($self) {

    $self.fields = {

        prefix: "",
        target: "dynamic"

    };

    $self.delegates = {

    };

    $self.virtuals = {

    };

    $self.extensions = {

    };

    $self.overrides = {

    };

    $self.schema = {

        begin: function(o) {
            if (o == null)
                return $css.builder({ json: { } });
            else
                return $css.builder({ json: o });
        },
    
        select: function(s) {
    
            var selector = (s == "") ? $css.prefix : $css.prefix + " " + s;

            return {
                selector: selector,
                clss: "",
                element: document.querySelector(selector),
                elements: document.querySelectorAll(selector),
                json: { },
                begin: function () {
                    return $css.builder(this);
                },
                state: function (s) {
                    this.json = { };
                    this.clss = ".z-" + s;
                    return $css.builder(this);
                }
            };
    
        },
    
        merge: function() {
    
            var s = "";
    
            for (var i = 0; i < arguments.length; i++) {
                s += arguments[i].selector + ",";
            }
    
            s = s.substr(0, s.length - 1);
    
            return $css.select(s);
    
        },

        builder: function (o) {
            return {
                json: function() { return o.json },
                commitAll: function () {
    
                    var css = JSON.stringify(o.json)
                        .replaceAll(",", ";")
                        .replaceAll("<>", ",")
                        .replaceAll("\"", "")
                        .replace("}", "")
                        .replace("{", "");
    
                    for (var i = 0; i < o.elements.length; i++) {
                        o.elements[i].setAttribute("style", css);
                    }
    
                    console.log("$css    commitAll(): " + o.selector + " { " + css + "; }");
    
                    return this;
    
                },
                commit: function () {
    
                    var css = JSON.stringify(o.json)
                        .replaceAll(",", "; ")
                        .replaceAll(":", ": ")
                        .replaceAll("\"", "")
                        .replace("}", "")
                        .replace("{", "")
                        .replaceAll("; 0px; 0px", ", 0px, 0px");
    
                    o.element.setAttribute("style", css);
    
                    console.log("$css    commit(): " + o.selector + " { " + css + "; }");
    
                    return this;
    
                },
                save: function () {
    
                    var css = o.selector + o.clss + " " + JSON.stringify(o.json)
                        .replaceAll(",", "; ")
                        .replaceAll(":", ": ")
                        .replaceAll("\"", "")
                        .replace("}", ";}")
                        .replace("}", " }")
                        .replace("{", "{ ")
                        .replaceAll("https: //","https://");
    
                    document.getElementById($css.target).innerHTML += css + " ";
    
                    console.log("$css      save(): " + css);
    
                    return o;
    
                },
                z: function(i) {
                    o.json["z-index"] = i;
                    return this;
                },
                disp: function () {
                    o.json.display = "block";
                    return this;
                },
                none: function (i) {
                    o.json.display = "none";
                    return this;
                },
                rightToLeft: function () {
                    o.json.direction = "rtl";
                    return this;
                },
                leftToRight: function () {
                    o.json.direction = "ltr";
                    return this;
                },
                verticalScroll: function () {
                    o.json["overflow-y"] = "scroll";
                    o.json["-webkit-overflow-scrolling"] = "touch";
                    return this;
                },
                horizontalScroll: function () {
                    o.json["overflow-x"] = "scroll";
                    o.json["-webkit-overflow-scrolling"] = "touch";
                    return this;
                },
                hideVerticalScroll: function () {
                    o.json["overflow-y"] = "hidden";
                    return this;
                },
                hideHorizontalScroll: function () {
                    o.json["overflow-x"] = "hidden";
                    return this;
                },
                mask: function () {
                    o.json["overflow-y"] = "hidden";
                    o.json["overflow-x"] = "hidden";
                    return this;
                },
                maskVertical: function () {
                    o.json["overflow-y"] = "hidden";
                    return this;
                },
                maskHorizontal: function () {
                    o.json["overflow-x"] = "hidden";
                    return this;
                },
                opaque: function () {
                    o.json.opacity = "1";
                    o.json["will-change"] = "opacity";
                    return this;
                },
                opacity: function (p) {                
                    o.json.opacity = p;
                    o.json["will-change"] = "opacity";
                    return this;
                },
                transparent: function () {
                    o.json.opacity = 0;
                    o.json["will-change"] = "opacity";
                    return this;
                },
                absolute: function () {
                    o.json.position = "absolute";
                    return this;
                },
                relativeLeft: function () {
                    o.json.position = "relative";
                    o.json.float = "left";
                    return this;
                },
                relativeLeftHalf: function () {
                    o.json.position = "relative";
                    o.json.float = "left";
                    o.json.width = "50%";
                    return this;
                },
                relativeLeftFull: function () {
                    o.json.position = "relative";
                    o.json.float = "left";
                    o.json.width = "100%";
                    return this;
                },
                relativeRight: function () {
                    o.json.position = "relative";
                    o.json.float = "right";
                    return this;
                },
                anchorTop: function() {
                    o.json.top = "0px";
                    return this;
                },
                anchorBottom: function() {
                    o.json.bottom = "0px";
                    return this;
                },
                anchorLeft: function() {
                    o.json.left = "0px";
                    return this;
                },
                anchorRight: function() {
                    o.json.right = "0px";
                    return this;
                },
                anchorTopLeft: function() {
                    o.json.top = "0px";
                    o.json.left = "0px";
                    return this;
                },
                anchorTopRight: function() {
                    o.json.top = "0px";
                    o.json.right = "0px";
                    return this;
                },
                anchorBottomLeft: function() {
                    o.json.bottom = "0px";
                    o.json.left = "0px";
                    return this;
                },
                anchorBottomRight: function() {
                    o.json.bottom = "0px";
                    o.json.right = "0px";
                    return this;
                },
                width: function (px) {
                    o.json.width = px + "px";
                    return this;
                },
                widthHalf: function () {
                    o.json.width = "50%";
                    return this;
                },
                widthHalfCentered: function () {
                    o.json.width = "50%";
                    o.json.left = "25%";
                    return this;
                },
                widthCropFromHalf: function (px) {
                    o.json.width = "calc(50% - " + px + "px)";
                    return this;
                },
                widthCropFromFull: function (px) {
                    o.json.width = "calc(100% - " + px + "px)";
                    return this;
                },
                widthCropFromPercent: function (p, px) {
                    o.json.width = "calc(" + p + "% - " + px + "px)";
                    return this;
                },
                widthExtendUponFull: function (px) {
                    o.json.width = "calc(100% + " + px + "px)";
                    return this;
                },
                widthCentered: function (px) {
                    o.json.width = px + "px";
                    o.json.left = "calc(50% - " + (px * 0.5) + "px)";
                    return this;
                },
                widthFull: function () {
                    o.json.width = "100%";
                    return this;
                },
                widthPercent: function (p) {
                    o.json.width = p + "%";
                    return this;
                },
                widthPercentCentered: function (p) {
                    o.json.width = p + "%";
                    o.json["margin-left"] = ((100 - p) * 0.5) + "%";
                    o.json["margin-right"] = ((100 - p) * 0.5) + "%";
                    return this;
                },
                minHeight: function (px) {
                    o.json["min-height"] = px + "px";
                    return this;
                },
                maxHeight: function (px) {
                    o.json.json["max-height"] = px + "px";
                    return this;
                },
                height: function (px) {
                    o.json.height = px + "px";
                    return this;
                },
                heightPercent: function (p) {
                    o.json.height = p + "%";
                    return this;
                },
                heightPercentCentered: function (p) {
                    o.json.height = p + "%";
                    o.json["margin-top"] = ((100 - p) * 0.5) + "%";
                    o.json["margin-bottom"] = ((100 - p) * 0.5) + "%";
                    return this;
                },
                heightCentered: function (px) {
                    o.json.height = px + "px";
                    o.json.top = "calc(50% - " + (px * 0.5) + "px)";
                    return this;
                },
                heightFull: function () {
                    o.json.height = "100%";
                    return this;
                },
                heightCropFromFull: function (px) {
                    o.json.height = "calc(100% - " + px + "px)";
                    return this;
                },
                heightCropFromFullScreen: function (px) {
                    o.json.height = "calc(100vh - " + px + "px)";
                    return this;
                },
                heightExtendUponFull: function (px) {
                    o.json.height = "calc(100% + " + px + "px)";
                    return this;
                },
                side: function (px) {
                    o.json.width = px + "px";
                    o.json.height = px + "px";
                    return this;
                },
                sideFull: function () {
                    o.json.width = "100%";
                    o.json.left = "0px";
                    o.json.height = "100%";
                    o.json.top = "0px";
                    return this;
                },
                sideCentered: function (px) {
                    o.json.width = px + "px";
                    o.json.left = "calc(50% - " + (px * 0.5) + "px)";
                    o.json.height = px + "px";
                    o.json.top = "calc(50% - " + (px * 0.5) + "px)";
                    return this;
                },
                top: function (px) {
                    o.json.top = px + "px";
                    return this;
                },
                topCropFromHalf: function (px) {
                    o.json.top = "calc(50% - " + px + "px)";
                    return this;
                },
                middle: function (px) {
                    o.json.top = "calc(50% - " + (px * 0.5) + "px)";
                    return this;
                },
                topPercent: function (p) {
                    o.json.top = p + "%";
                    return this;
                },
                left: function (px) {
                    o.json.left = px + "px";
                    return this;
                },
                leftPercent: function (p) {
                    o.json.left = p + "%";
                    return this;
                },
                leftCropFromFull: function (px) {
                    o.json.left = "calc(100% - " + px + "px)";
                    return this;
                },
                center: function (px) {
                    o.json.left = "calc(50% - " + (px * 0.5) + "px)";
                    return this;
                },
                right: function (px) {
                    o.json.right = px + "px";
                    return this;
                },
                bottom: function (px) {
                    o.json.bottom = px + "px";
                    return this;
                },
                bottomPercent: function (p) {
                    o.json.bottom = p + "%";
                    return this;
                },
                leftFromHalf: function (px) {
                    o.json.left = "calc(50% - " + px + "px)";
                    return this;
                },
                margin: function (px) {
                    o.json.margin = px + "px";
                    return this;
                },
                marginTop: function(px) {
                    o.json["margin-top"] = px + "px";
                    return this;
                },
                marginTopPercent: function (p) {
                    o.json["margin-top"] = p + "%";
                    return this;
                },
                marginLeft: function (px) {
                    o.json["margin-left"] = px + "px";
                    return this;
                },
                marginLeftPercent: function (p) {
                    o.json["margin-left"] = p + "%";
                    return this;
                },
                marginRight: function (px) {
                    o.json["margin-right"] = px + "px";
                    return this;
                },
                marginBottom: function (px) {
                    o.json["margin-bottom"] = px + "px";
                    return this;
                },
                marginHorizontal: function (px) {
                    o.json["margin-left"] = px + "px";
                    o.json["margin-right"] = px + "px";
                    return this;
                },
                marginVertical: function (px) {
                    o.json["margin-top"] = px + "px";
                    o.json["margin-bottom"] = px + "px";
                    return this;
                },
                padding: function(px) {
                    o.json.padding = px + "px";
                    return this;
                },
                paddingLeft: function (px) {
                    o.json["padding-left"] = px + "px";
                    return this;
                },
                paddingRight: function (px) {
                    o.json["padding-right"] = px + "px";
                    return this;
                },
                paddingVertical: function (px) {
                    o.json["padding-top"] = px + "px";
                    o.json["padding-bottom"] = px + "px";
                    return this;
                },
                paddingHorizontal: function (px) {
                    o.json["padding-left"] = px + "px";
                    o.json["padding-right"] = px + "px";
                    return this;
                },
                paddingTop: function (px) {
                    o.json["padding-top"] = px + "px";
                    return this;
                },
                paddingBottom: function (px) {
                    o.json["padding-bottom"] = px + "px";
                    return this;
                },
                removeBackground: function () {
                    o.json.background = "none";
                    return this;
                },
                backgroundColor: function (c) {
                    o.json["background-color"] = c;
                    return this;
                },
                backgroundCover: function () {
                    o.json["background-size"] = "cover";
                    return this;
                },
                backgroundImage: function (u) {
                    o.json["background-image"] = "url('" + u + "')";
                    return this;
                },
                backgroundFixed: function() {
                    o.json["background-attachment"] = "fixed";
                    return this;
                },
                textColorWhite: function () {
                    o.json.color = "#FFFFFF";
                    return this;
                },
                textColor: function (c) {
                    o.json.color = c;
                    return this;
                },
                textColorI: function (c) {
                    o.json.color = c + " !important";
                    return this;
                },
                textLeft: function () {
                    o.json["text-align"] = "left";
                    return this;
                },
                textCenter: function () {
                    o.json["text-align"] = "center";
                    return this;
                },
                textRight: function () {
                    o.json["text-align"] = "right";
                    return this;
                },
                textSize: function (px) {
                    o.json["font-size"] = px + "px";
                    return this;
                },
                textSizeViewportWidth: function (p) {
                    o.json["font-size"] = p + "vw";
                    return this;
                },
                textBlack: function () {
                    o.json["font-weight"] = "900";
                    return this;
                },
                textExtraBold: function () {
                    o.json["font-weight"] = "800";
                    return this;
                },
                textBold: function () {
                    o.json["font-weight"] = "700";
                    return this;
                },
                textSemiBold: function () {
                    o.json["font-weight"] = "600";
                    return this;
                },
                textMedium: function () {
                    o.json["font-weight"] = "500";
                    return this;
                },
                textRegular: function () {
                    o.json["font-weight"] = "400";
                    return this;
                },
                textLight: function () {
                    o.json["font-weight"] = "300";
                    return this;
                },
                textExtraLight: function () {
                    o.json["font-weight"] = "200";
                    return this;
                },
                textThin: function () {
                    o.json["font-weight"] = "100";
                    return this;
                },
                textHeight: function (px) {
                    o.json.height = px + "px";
                    o.json["line-height"] = px + "px";
                    return this;
                },
                textHeightCentered: function (px) {
                    o.json.height = px + "px";
                    o.json.top = "calc(50% - " + (px * 0.5) + "px)";
                    o.json["line-height"] = px + "px";
                    return this;
                },
                textLineHeight: function (px) {
                    o.json["line-height"] = px + "px";
                    return this;
                },
                impTextLineHeight: function (px) {
                    o.json["line-height"] = px + "px !important";
                    return this;
                },
                removeTextDecoration: function () {
                    o.json["text-decoration"] = "none";
                    return this;
                },
                underline: function () {
                    o.json["text-decoration"] = "underline";
                    return this;
                },
                uppercase: function() {
                    o.json["text-transform"] = "uppercase";
                    return this;
                },
                removeOutline: function () {
                    o.json.outline = "none";
                    return this;
                },
                cursorPointer: function () {
                    o.json.cursor = "pointer";
                    return this;
                },
                removeBullets: function () {
                    o.json["list-style-type"] = "none";
                    return this;
                },
                translateX: function(px) {
                    o.json.transform = "translateX(" + px + "px)";
                    o.json["will-change"] = "transform";
                    return this;
                },
                translateXPercent: function(p) {
                    o.json.transform = "translateX(" + p + "%)";
                    o.json["will-change"] = "transform";
                    return this;
                },
                translateY: function(px) {
                    o.json.transform = "translateY(" + px + "px)";
                    o.json["will-change"] = "transform";
                    return this;
                },
                round: function (px) {
    
                    if (px == null)
                        o.json["border-radius"] = "50%";    
                    else
                        o.json["border-radius"] = px + "px";
    
                    return this;
                },
                roundTop: function(px) {
                    o.json["border-top-left-radius"] = px + "px";
                    o.json["border-top-right-radius"] = px + "px";
                    return this;
                },
                roundBottom: function(px) {
                    o.json["border-bottom-left-radius"] = px + "px";
                    o.json["border-bottom-right-radius"] = px + "px";
                    return this;
                },
                border: function (b) {
                    o.json.border = b;
                    return this;
                },
                removeBorder: function () {
                    o.json.border = "none";
                    return this;
                },
                removeSideBorders: function () {
                    o.json["border-left"] = "none";
                    o.json["border-right"] = "none";
                    return this;
                },
                borderTop: function (b) {
                    o.json["border-top"] = b;
                    return this;
                },
                borderBottom: function (b) {
                    o.json["border-bottom"] = b;
                    return this;
                },
                fillNone: function () {
                    o.json.fill = "none";
                    return this;
                },
                stroke: function (c) {
                    o.json.stroke = c;
                    return this;
                },
                strokeWidth: function (px) {
                    o.json["stroke-width"] = px + "px";
                    return this;
                },
                rotate: function (deg) {
                    o.json.transform = "rotate(" + deg + "deg)";
                    return this;
                },
                scale: function(p) {
                    o.json.transform = "scale(" + p + ")";
                    return this;
                },
                blur: function (px) {
    
                    if (o.json.filter == null)
                        o.json.filter = "blur(" + px + "px)";
                    else
                        o.json.filter += " blur(" + px + "px)";
    
                    return this;
                },
                brightness: function(b) {
    
                    if (o.json.filter == null)
                        o.json.filter = "brightness(" + b + ")";
                    else
                        o.json.filter += " brightness(" + b + ")";
    
                    return this;
                },
                animation: function(a) {
                    o.json.animation = a;
                    return this;
                }
            };
        }

    };

});