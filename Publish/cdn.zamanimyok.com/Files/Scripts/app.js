var app = angular.module("z", []);

app.delegates = [];
app.style = function (event) {
    app.delegates.push(event);
};

app.config(function ($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://cdn.zamanimyok.com/**'
    ]);

});

app.run(function ($eval, $http, $lexicon, $nav, $style, $timeout, $view, $window) {        

    $window.onresize = function () {
        $style.screenSizeChanged();
    };

    for (var i = 0; i < app.delegates.length; i++)
        $style.onInit(app.delegates[i]);

    delete app.delegates;
    delete app.style;

    $nav.init({
        "search": {
            "key": "search",
            "template": "$path.pages.search",
            "type": "narrow",
            "title": "$lexicon.search"
        },
        "search_result": {
            "key": "search_result",
            "template": "$path.pages.search_result",
            "type": "medium",
            "title": "$lexicon.search_results"
        },
        "page_1": {
            "key": "page_1",
            "template": "$path.pages.page_1",
            "type": "medium",
            "title": "$lexicon.page_1.title"
        },
        "page_2": {
            "key": "page_2",
            "template": "$path.pages.page_2",
            "type": "wide",
            "title": "$lexicon.page_2.title"
        },
        "page_3": {
            "key": "page_3",
            "template": "$path.pages.page_3",
            "type": "small",
            "title": "$lexicon.page_3.title"
        },
        "version": {
            "key": "version",
            "template": "$path.pages.version",
            "type": "medium",
            "title": "$lexicon.version.title"
        }
    });

    $lexicon.init({
        "words": {
            "days": {
                "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "tr": ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
            },
            "months": {
                "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                "tr": ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
            },
            "welcome": {
                "en": "Content Management System",
                "tr": "İçerik Yönetim Paneli"
            },
            "activate": {
                "en": "Activate",
                "tr": "Aktive Et"
            },
            "block": {
                "en": "Block",
                "tr": "Bloke Et"
            },
            "search": {
                "en": "Search",
                "tr": "Arama"
            },
            "send": {
                "en": "Send",
                "tr": "Gönder"
            },
            "customer_type": {
                "en": "Customer Type",
                "tr": "Müşteri Tipi"
            },
            "pagess": {
                "en": "Pages",
                "tr": "Sayfalar"
            },
            "page_1": {
                "en": "Page 1",
                "tr": "Sayfa 1"
            },
            "page_2": {
                "en": "Page 2",
                "tr": "Sayfa 2"
            },
            "page_3": {
                "en": "Page 3",
                "tr": "Sayfa 3"
            }
        },
        "phrases": {
            "please_wait": {
                "en": "Please Wait",
                "tr": "Lütfen Bekleyiniz"
            },
            "tckn": {
                "en": "Citizen ID",
                "tr": "TCKN"
            },
            "search_by": {
                "en": "Search By",
                "tr": "Arama"
            },
            "search_results": {
                "en": "Search Results",
                "tr": "Arama Sonuçları"
            },
            "version_history": {
                "en": "Version History",
                "tr": "Versiyon Geçmişi"
            }
        },
        "pages": {
            "search": {
                "search_by_items": {
                    "en": ["Citizen ID", "Phone", "Email"],
                    "tr": ["TCKN", "Tel No", "E-posta"]
                },
                "customer_types": {
                    "en": ["Individual", "Corporate"],
                    "tr": ["Bireysel", "Kurumsal"]
                }
            },
            "search_result": {
                "headers": {
                    "en": ["Citizen ID", "Name", "Phone", "Status", "Action", "Details"],
                    "tr": ["TCKN", "İsim", "Tel", "Durum", "Aksiyon", "Detay"]
                }
            }
        }
    });

    $style.init();

    $timeout(function () {

        $view.login.show();

    }, 5000);

});