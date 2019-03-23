$js.compile("UserModule", [Module], function($self) {

    $self.overrides = {

        on_key: function() { return "user" },

        on_construct: function ($pages, $views) {

            $pages.about = new AboutPage();
            $pages.address_new = new AddressNewPage();            
            $pages.address_update = new AddressUpdatePage();
            $pages.addresses = new AddressesPage();
            $pages.brands = new BrandsPage();
            $pages.contact = new ContactPage();            
            $pages.delivery_address_selection = new DeliveryAddressSelectionPage();            
            $pages.landing = new LandingPage();
            $pages.list = new ListPage();
            $pages.note = new NotePage();
            $pages.models = new ModelsPage();
            $pages.plate = new PlatePage();
            $pages.preview = new PreviewPage();
            $pages.reservations = new ReservationsPage();
            $pages.take_over_address_selection = new TakeOverAddressSelectionPage();
            $pages.vehicle_update = new VehicleUpdatePage();
            $pages.vehicles = new VehiclesPage();
            $pages.vehicle_selection = new VehicleSelectionPage();

        }

    };

});