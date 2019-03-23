$js.compile("$path", [], function($self) {
    
    $self.cdn = $.cdn;                
    $self.api = $.api;

    $self.auth = {};
    $self.auth.login = $self.api + "/Auth/Login";    
    $self.auth.forgot_password = $self.api + "/Auth/Forgot_Password";
    $self.auth.check_otp = $self.api + "/Auth/Check_OTP";
    $self.auth.update_password = $self.api + "/Auth/Update_Password";
    $self.auth.verify_email = $self.api + "/Auth/Verify_Email";
    $self.auth.signup = $self.api + "/Auth/Signup";
    $self.auth.logout = $self.api + "/Auth/Logout";

    $self.member = {};
    $self.member.me = $self.api + "/Member/Me";

    $self.user = {};
    $self.user.me = $self.api + "/User/Me";
    $self.user.addresses = $self.api + "/User/Addresses";
    $self.user.new_address = $self.api + "/User/New_Address";
    $self.user.update_address = $self.api + "/User/Update_Address";
    $self.user.remove_address = $self.api + "/User/Remove_Address";
    $self.user.vehicles = $self.api + "/User/Vehicles";
    $self.user.new_vehicle = $self.api + "/User/New_Vehicle";
    $self.user.update_vehicle = $self.api + "/User/Update_Vehicle";
    $self.user.remove_vehicle = $self.api + "/User/Remove_Vehicle";

    $self.affiliates = {};
    $self.affiliates.all = $self.api + "/Affiliates/All";

    $self.brands = {};
    $self.brands.all = $self.api + "/Brands/All";
    $self.brands.brand = $self.api + "/Brands/Brand";

    $self.flow = {};
    $self.flow.requests = $self.api + "/Flow/Requests";
    $self.flow.reservations = $self.api + "/Flow/Reservations";
    $self.flow.approveds = $self.api + "/Flow/Approveds";
    $self.flow.reserve = $self.api + "/Flow/Reserve";
    $self.flow.approve = $self.api + "/Flow/Approve";
    $self.flow.reject = $self.api + "/Flow/Reject";
    $self.flow.state_machine = $self.api + "/Flow/State_Machine";

    $self.payment = {};
    $self.payment.cards = $self.api + "/Payment/Cards";
    $self.payment.new_card = $self.api + "/Payment/New_Card";
    $self.payment.remove_card = $self.api + "/Payment/Remove_Card";

});