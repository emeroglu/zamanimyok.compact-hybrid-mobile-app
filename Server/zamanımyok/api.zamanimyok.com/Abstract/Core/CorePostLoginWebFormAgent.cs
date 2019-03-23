using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using api.zamanimyok.com.Models;
using api.zamanimyok.com.Abstract.Tools;

namespace api.zamanimyok.com.Abstract.Core
{
    public abstract class CorePostLoginWebFormAgent<DeliveryPayloadType> : CoreAgent<PostLoginWebFormMaterial> where DeliveryPayloadType : CorePayload
    {
        protected Entities Entities { get; set; }

        protected CoreDelivery<DeliveryPayloadType> Delivery { get; set; }

        protected authInstance Instance { get; set; }
        protected userSelf User { get; set; }
        protected serSelf Servant { get; set; }

        protected abstract void On_Instance_Validated();
        protected abstract void On_Instance_Invalidated();

        public void Welcome()
        {
            Perform();
        }

        protected override void Job()
        {
            OnFail = (ex) =>
            {
                Delivery.meta.status = "error";
                Delivery.meta.message = ex.Message;

                Delivery.payload = null;
            };

            Delivery = (CoreDelivery<DeliveryPayloadType>)Activator.CreateInstance(typeof(CoreDelivery<DeliveryPayloadType>));
            Delivery.meta = new CoreDeliveryMeta();
            Delivery.payload = (DeliveryPayloadType)Activator.CreateInstance(typeof(DeliveryPayloadType));

            Entities = new Entities();

            string key = Material.Request.Form["key"];

            Instance = Entities.authInstances.FirstOrDefault(i => i.Present && i.Key == key && i.StatusFK == 1);

            if (Instance == null)
            {
                Delivery.meta.status = "invalid_key";
                Delivery.meta.message = "Invalid Instance Key";

                Delivery.payload = null;

                On_Instance_Invalidated();
            }
            else
            {
                List<authInstance> openInstances;

                if (Instance.authMember.authRole.Value == "USER")
                {
                    User = Instance.authMember.userSelves.FirstOrDefault();
                    openInstances = User.authMember.authInstances.Where(i => i.Present && i.StatusFK == 1 && i.PK != Instance.PK).ToList();
                }
                else
                {
                    Servant = Instance.authMember.serSelves.FirstOrDefault();
                    openInstances = Servant.authMember.authInstances.Where(i => i.Present && i.StatusFK == 1 && i.PK != Instance.PK).ToList();
                }

                foreach (authInstance instance in openInstances)
                {
                    instance.StatusFK = 3;
                    instance.UpdateDate = DateTime.Now;
                    instance.UpdatedBy = "CorePostLoginWebFormAgent";
                }

                Entities.SaveChanges();

                Delivery.meta.status = "success";
                Delivery.meta.message = "";

                On_Instance_Validated();
            }

            Material.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            Material.Response.ContentType = "application/json";
            Material.Response.Write(new JavaScriptSerializer().Serialize(Delivery));

        }
        
    }

    public class PostLoginWebFormMaterial : WebMaterial
    {
        public HttpServerUtilityBase Server { get; set; }
    }

}