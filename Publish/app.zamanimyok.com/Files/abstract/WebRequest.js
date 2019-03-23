$js.compile("WebRequest", [], function($self) {

    $self.fields = {

        state: "initial",

        options: {
            method: "",
            url: ""
        },

        response: {
            code: 0,
            text: "",
            error: ""
        }

    };

    $self.delegates = {

        onsuccess: null,
        onerror: null,

    };

    $self.virtuals = {

    };

    $self.extensions = {

    };

    $self.overrides = {

    };

    $self.schema = {               

        send: function () {

            $self.state = "sending";

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {

                if (xhr.readyState == XMLHttpRequest.DONE) {

                    $self.state = "sent";

                    if (xhr.status == 200) {

                        $self.state = "success";

                        $self.response.code = 200;
                        $self.response.text = xhr.responseText;
                        $self.response.error = "";

                        $self.onsuccess($self.response);

                    } else {

                        $self.state = "error";

                        $self.response.code = xhr.status;
                        $self.response.text = "";
                        $self.response.error = xhr.statusText;

                        $self.onsuccess($self.response);

                    }

                }

            };
            xhr.open($self.options.method, $self.options.url, true);
            xhr.send(null);

        }

    };

});