using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Abstract.Json;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace api.zamanimyok.com.Agents.Welcomers.Auth
{
    public class CheckOTPWelcomer : CoreWebAgent<CheckOTPPayload, CheckOTPDelivery>
    {
        protected override void On_Ready()
        {
            authOtp otp = Entities.authOtps.FirstOrDefault(o => o.Present && o.Key == Payload.email && o.Value == Payload.otp);

            if (otp == null)
            {
                Delivery.meta.status = "otp_not_found";
                Delivery.meta.message = "OTP not found";

                Delivery.payload = null;
            }
            else
            {
                if (otp.CreateDate < DateTime.Now.Subtract(TimeSpan.FromMinutes(3)))
                {
                    Delivery.meta.status = "expired";
                    Delivery.meta.message = "OTP expired";

                    Delivery.payload = null;
                }
                else
                {
                    Delivery.meta.status = "valid";
                    Delivery.meta.message = "OTP is valid";
                }
            }
        }
    }

    public class CheckOTPPayload : CorePayload
    {
        public string otp { get; set; }
        public string email { get; set; }        
    }

    public class CheckOTPDelivery : CorePayload
    {
        
    }
}