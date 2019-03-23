app.controller("SearchCtrl", function($bcast, $data, $nav, $scope, $timeout) {

    $bcast.listen("search_compiled", {
        owner: "SearchCtrl",
        invoke: function(args) {

            var $page = args.$page;
            var $comp = args.$comp;

            $comp.rg_customer_type.onchange = function(from, to) {
    
                if (to == 0)
                    $comp.rg_search_by.item(0, "TCKN");
                else if (to == 1)
                    $comp.rg_search_by.item(0, "VKN");
    
                if ($comp.rg_search_by.index == 0)
                    $comp.txt_search.placehold($comp.rg_search_by.item(0));
    
            };
    
            $comp.rg_search_by.onchange = function(from, to) {
    
                $comp.txt_search.placehold($comp.rg_search_by.item(to));
    
            };
    
            $comp.btn_send.onclick(function() {
    
                $page.loading(function() {
    
                    $timeout(function() {
    
                        $data.search_result = [
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" },
                            { tckn: "87823912762", name: "Erhan Emre Eroğlu", phone: "05389828218", status: "Active" },
                            { tckn: "70269368072", name: "Kağan Cenan", phone: "05389828218", status: "Blocked" },
                            { tckn: "19019287817", name: "Gökberk Erüst", phone: "05389828218", status: "Active" }
                        ];
    
                        $page.loadedWithShadeBehind(function() {
    
                            $nav.load('search_result');
    
                        });
    
                    }, 250);
    
                });
    
            });

        }
    });

});