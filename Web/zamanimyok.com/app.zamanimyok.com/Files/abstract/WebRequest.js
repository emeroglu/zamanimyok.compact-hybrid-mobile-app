$js.compile("WebRequest", [], function($self) {

    $self.fields = {

        options: {
            method: "",
            url: "",
            data: null
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

            var xhr = new XMLHttpRequest();            
            xhr.onreadystatechange = function () {

                if (xhr.readyState == XMLHttpRequest.DONE) {

                    if (xhr.status == 200) {

                        $self.response.code = 200;
                        $self.response.text = xhr.responseText;
                        $self.response.json = JSON.parse(xhr.responseText);
                        $self.response.error = "";

                        $self.onsuccess($self.response.json);

                    } else {

                        $self.response.code = xhr.status;                                                                        

                        $self.onerror($self.response);

                    }

                }

            };
            xhr.open("POST", $self.options.url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify($self.options.data));

        }

    };

});