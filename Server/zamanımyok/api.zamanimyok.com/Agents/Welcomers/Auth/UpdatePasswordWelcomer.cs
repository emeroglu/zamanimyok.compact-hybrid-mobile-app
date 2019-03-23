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
    public class UpdatePasswordWelcomer : CoreWebAgent<UpdatePasswordPayload, UpdatePasswordDelivery>
    {
        protected override void On_Ready()
        {
            authCredentialDetail credentialDetail = Entities.authCredentialDetails.FirstOrDefault(d => d.Present && d.KeyFK == 2 && d.Value == Payload.email);

            if (credentialDetail == null)
            {
                Delivery.meta.status = "email_not_found";
                Delivery.meta.message = "Email not found";

                Delivery.payload = null;
            }
            else
            {
                authOtp otp = Entities.authOtps.FirstOrDefault(o => o.Present && o.Key == Payload.email && o.Value == Payload.otp);

                if (otp == null)
                {
                    Delivery.meta.status = "not_found";
                    Delivery.meta.message = "OTP not found";

                    Delivery.payload = null;
                }
                else
                {
                    credentialDetail = Entities.authCredentialDetails.FirstOrDefault(d => d.authCredential.MemberFK == credentialDetail.authCredential.MemberFK && d.KeyFK == 3);

                    credentialDetail.Value = Payload.password;
                    credentialDetail.UpdateDate = DateTime.Now;
                    credentialDetail.UpdatedBy = "UpdatePasswordWelcomer";

                    otp.UpdateDate = DateTime.Now;
                    otp.UpdatedBy = "UpdatePasswordWelcomer";
                    otp.RemovalDate = DateTime.Now;
                    otp.RemovedBy = "UpdatePasswordWelcomer";
                    otp.Present = false;

                    Entities.SaveChanges();

                    Delivery.meta.status = "success";
                    Delivery.meta.message = "Password changed";

                }
            }

        }
    }

    public class UpdatePasswordPayload : CorePayload
    {
        public string otp { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }

    public class UpdatePasswordDelivery : CorePayload
    {

    }
}