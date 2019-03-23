$js.compile("MapView", [View], function($self) {

    $self.fields = {

        map: null,
        mapElement: null

    };

    $self.overrides = {

        on_tag: function() { return "z-map-view"; },

        on_compile: function() {

            var e = document.createElement($self.tag);

            $self.mapElement = document.createElement("map");
            e.appendChild($self.mapElement);

            return e;

        },
        
        on_ready: function($views, $ready) {

            var script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA7N4xjegf_fSdtqWzoX2h4Wg3slBq5evw";
            script.onload = function() {

                script.remove();

                $self.map = new google.maps.Map($self.mapElement, {
                    center: { lat: $data.lat, lng: $data.long },
                    zoom: 13,
                    gestureHandling: "greedy",
                    scale: 2,
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                });
                $self.map.set("styles", [
                    {
                        elementType: "labels.icon",
                        stylers: [
                            { visibility: "off" }
                        ]
                    }
                ]);

                var markers = [];
                        
                $data.affiliates.forEach(affiliate => {

                    var marker;

                    marker = new google.maps.Marker({
                        position: { lat: parseFloat(affiliate.latitude), lng: parseFloat(affiliate.longitude) }, 
                        icon: {
                            url: $path.cdn + "/File/Image/" + version + "/icon", 
                            scaledSize: new google.maps.Size(30, 30)
                        },
                        map: $self.map 
                    });
                    marker.setOpacity(0.8);
                    marker.addListener("click", function() {

                        $view.card.update({                            
                            affiliate: affiliate                            
                        });
                        
                        markers.forEach(m => { m.setOpacity(0.8); });
                        marker.setOpacity(1);

                        $self.map.panTo(marker.position);

                    });

                    markers.push(marker);

                });

                markers[0].setOpacity(1);

                setTimeout($ready, 1000);

            };
            document.body.appendChild(script);

        }

    };

}, function() {

    $css.select("z-map-view")
        .begin()
            .absolute()
            .sideFull()
            .mask()
        .save();

    $css.select("map")
        .begin()
            .absolute()
            .widthFull()
            .heightExtendUponFull(30)
            .mask()
        .save();

});