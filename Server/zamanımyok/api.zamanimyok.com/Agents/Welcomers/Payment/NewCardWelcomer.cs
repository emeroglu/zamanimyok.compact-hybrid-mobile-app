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

namespace api.zamanimyok.com.Agents.Welcomers.Brands
{
    public class NewCardWelcomer : CorePostLoginWebAgent<NewCardPayload, NewCardDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            payCard card = new payCard()
            {
                MemberFK = User.MemberFK,
                Name = Package.payload.name,
                FullName = Package.payload.fullname,
                Number = Package.payload.number,
                ExpiryDate = Package.payload.expirydate,
                CCV = Package.payload.ccv,
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "NewCardWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.payCards.Add(card);
            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Card added";
        }
    }

    public class NewCardPayload : CorePayload
    {
        public string name { get; set; }
        public string fullname { get; set; }
        public string number { get; set; }
        public string expirydate { get; set; }
        public int ccv { get; set; }
    }

    public class NewCardDelivery : CorePayload
    {

    }
}