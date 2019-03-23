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
    public class ForgotPasswordWelcomer : CoreWebAgent<ForgotPayload, ForgotDelivery>
    {

        protected override void On_Ready()
        {
            authCredentialDetail credentialDetail = Entities.authCredentialDetails.FirstOrDefault(d => d.Present && d.KeyFK == 2 && d.Value == Payload.email);

            if (credentialDetail == null)
            {
                Delivery.meta.status = "not_found";
                Delivery.meta.message = "Email not found";

                Delivery.payload = null;
            }
            else
            {
                string otpass = new Random().Next(10000, 99999).ToString();

                authOtp otp = new authOtp()
                {                    
                    Key = Payload.email,
                    Value = otpass,
                    Extras = "",
                    CreateDate = DateTime.Now,
                    CreatedBy = "ForgotPasswordWelcomer",
                    UpdateDate = DateTime.Now,
                    UpdatedBy = "",
                    RemovalDate = DateTime.Now,
                    RemovedBy = "",
                    Present = true
                };

                Entities.authOtps.Add(otp);
                Entities.SaveChanges();

                new Postman()
                {
                    Material = new PostmanMaterial()
                    {
                        To = Payload.email,
                        Subject = "zamanımyok - Tek Kullanımlık Şifre",
                        Body = otpass
                    },
                    OnFinish = () =>
                    {
                        Delivery.meta.status = "success";
                        Delivery.meta.message = "One Time Password generated";
                    },
                    OnFail = (ex) =>
                    {
                        Delivery.meta.status = "fail";
                        Delivery.meta.message = "One Time Password could not be sent";

                        Delivery.payload = null;
                    }
                }
                .Send();                
            }
        }
    }

    public class ForgotPayload : CorePayload
    {
        public string email { get; set; }
    }

    public class ForgotDelivery : CorePayload
    {
        
    }
}