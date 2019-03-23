$js.compile("ServantModule", [Module], function($self) {

    $self.overrides = {

        on_key: function() { return "servant" },

        on_construct: function ($pages, $views) {
            
            $pages.approveds = new ApprovedsPage();
            $pages.price_entrance = new PriceEntrancePage();
            $pages.requests = new RequestsPage();

        }

    };

});