app.style(function($css, $theme, $path) {

    $css.add("list", "z-list");
    $css.add("list.headers", "z-list headers");
    $css.add("list.headers.header", "z-list headers header");
    $css.add("list.line", "z-list line");
    $css.add("list.rows", "z-list rows");
    $css.add("list.rows.row", "z-list rows row");
    $css.add("list.rows.row_even", "z-list rows row:nth-child(2n)");
    $css.add("list.rows.row.cell", "z-list rows row cell");

    $css.list
        .begin()
            .relativeLeftFull()
        .save();

    $css.list.headers
        .begin()
            .relativeLeft()
            .widthCropFromFull(20)
            .height(40)
            .paddingLeft(10)
            .paddingRight(10)
        .save();

    $css.list.headers.header
        .begin()
            .relativeLeft()
            .textHeight(40)
            .textCenter()
            .textLight()
            .textColor($theme.color.grayDark)
            .textSize(16)
            .uppercase()
        .save();

    $css.list.line
        .begin()
            .relativeLeftFull()
            .height(1)
            .backgroundColor($theme.color.mainDarkSemiTrans)
            .marginBottom(5)
        .save();

    $css.list.rows
        .begin()
            .relativeLeftFull()
        .save();

    $css.list.rows.row
        .begin()
            .relativeLeft()
            .widthCropFromFull(20)
            .height(40)
            .paddingLeft(10)
            .paddingRight(10)
        .save();

    $css.list.rows.row_even
        .begin()
            .backgroundColor($theme.color.mainExtraLight)
        .save();

    $css.list.rows.row.cell
        .begin()
            .relativeLeft()
            .textHeight(40)
            .textCenter()
            .textExtraLight()
            .textColor($theme.color.grayDark)
            .textSize(15)
        .save();
        
});

app.directive("zcList", function($bcast, $compile, $data, $nav, $rootScope, $view) {

    return {
        restricts: "E",
        scope: false,
        compile: function($element, $attr) {

            var self = {
                id: $attr.zpId,
                $element: $element,
                element: $element[0],
                structure: {},
                headers: {},
                columns: [],
                data: {},
                init: function() {

                    self.data = $data[$attr.zpData];
                    self.headers = $eval($attr.zpHeaders);
                    self.columns = $attr.zpColumns.split(":");

                    self.initStructure();
                    self.render();

                    $bcast.listen("lexicon_digest", {
                        owner: self.id,
                        invoke: function() {

                            self.headers = $eval($attr.zpHeaders);
        
                            var headers = $element[0].querySelectorAll("header");
            
                            for (var i = 0; i < headers.length; i++) {
                                headers[i].innerHTML = self.headers[i];
                            }

                        }
                    });

                },
                initStructure: function() {

                    var cells = $element[0].querySelectorAll("z-list-item z-cell");

                    var structure = {}, key = "", content = "", click = "";
        
                    for (var i = 0; i < self.headers.length; i++) {
                        
                        key = self.headers[i].toCamelCase();
                        content = cells[i].getAttribute("zp-content");
                        click = cells[i].getAttribute("zp-click");
        
                        if (content == "data") {
        
                            structure[key] = {
                                header: self.headers[i],
                                width: self.columns[i],
                                content: content,
                                key: cells[i].getAttribute("zp-key"),
                                template: cells[i]
                            };
        
                        } else if (content == "dynamic") {
        
                            var dyns = [], dyn = {};
                            var dynTemplates = cells[i].querySelectorAll("z-cell-dyn");
        
                            for (var j = 0; j < dynTemplates.length; j++) {
        
                                dyn = dynTemplates[j];
        
                                dyns.push( {
                                    equals: dyn.getAttribute("zp-equals"),
                                    template: dyn
                                });
        
                            }
        
                            structure[key] = {
                                header: self.headers[i],
                                width: self.columns[i],
                                content: content,
                                key: cells[i].getAttribute("zp-key"),
                                template: cells[i],
                                dyns: dyns
                            };
        
                        } else if (content == "static") {
        
                            structure[key] = {
                                header: self.headers[i],
                                width: self.columns[i],
                                content: content,
                                key: cells[i].getAttribute("zp-key"),
                                template: cells[i]
                            };
        
                        }
        
                        if (click != null) {
        
                            structure[key].click = {
        
                                bcast: click.split("(")[0],
                                row: (click.indexOf("row") != -1),
                                column: (click.indexOf("col") != -1)
        
                            };
        
                        }
        
                    }

                    self.structure = structure;

                },
                render: function() {

                    var html = "";

                    html += "<z-list>";

                    html += self.renderHeaders();
                    html += self.renderRows();

                    html += "</z-list>";

                    var compilation = $compile(html)($rootScope)[0];

                    $element.html("");
                    $element.append(compilation);

                },
                renderHeaders: function() {

                    var html = "";

                    html += "   <headers>";
        
                    for(var i = 0; i < self.headers.length; i++) {
                        html += "       <header style='width: " + self.columns[i] + "%;' za-lexicon>" + self.headers[i] + "</header>";
                    }
                    
                    html += "   </headers>";
                    html += "   <line></line>";

                    return html;

                },
                renderRows: function() {

                    var html = "";

                    html += "<rows>";

                    for (var i = 0; i < self.data.length; i++) {
                        html += self.renderRow(self.data[i]);   
                    }

                    html += "</rows>";

                    return html;

                },
                renderRow: function(data) {

                    var html = "";

                    html += "<row>";

                    for (var key in self.structure) {
                        html += self.renderCell(data, self.structure[key]);
                    }

                    html += "</row>";

                    return html;

                },
                renderCell: function(data, cell) {

                    var html = "";

                    if (cell.content == "data")
                        html += self.renderDataCell(data, cell);
                    else if (cell.content == "static")
                        html += self.renderStaticCell(data, cell);
                    else if (cell.content == "dynamic")
                        html += self.renderDynamicCell(data, cell);

                    return html;

                },
                renderDataCell: function(data, cell) {

                    var html = "";

                    html += "<cell style='width: " + cell.width  + "%;'>" + data[cell.key] + "</cell>";

                    return html;

                },
                renderStaticCell: function(data, cell) {

                    var html = "";

                    html += "<cell style='width: " + cell.width  + "%;'>" + cell.template.innerHTML + "</cell>";

                    return html;

                },
                renderDynamicCell: function(data, cell) {

                    var html = "";

                    for (var i = 0; i < cell.dyns.length; i++) {

                        if (data[cell.key] == cell.dyns[i].equals) {
                            html += "<cell style='width: " + cell.width  + "%;'>" + cell.dyns[i].template.innerHTML + "</cell>";
                            break;
                        }

                    }

                    return html;

                },
                dispose: function() {

                    $bcast.clear("lexicon_digest", self.id);

                    self = null;

                }
            };

            $view.pages[$nav.page.key].components[$attr.zpId] = self;

        }
    }

});