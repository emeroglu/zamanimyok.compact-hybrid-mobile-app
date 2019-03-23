using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Abstract.Json;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Models;
using api.zamanimyok.com.Repository;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Script.Serialization;

namespace api.zamanimyok.com.Agents.Welcomers.Brands
{
    public class UploadWelcomer : CorePostLoginWebFormAgent<UploadDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            if (Servant == null)
            {
                Delivery.meta.status = "not_allowed";
                Delivery.meta.message = "This endpoint is only allowed for servants";

                Delivery.payload = null;

                return;
            }

            HttpPostedFileBase file = Material.Request.Files[0];
            int reservationFk = int.Parse(Material.Request.Form["reservationFk"]);
            int typeFk = int.Parse(Material.Request.Form["typeFk"]);
            int index = int.Parse(Material.Request.Form["index"]);
            string label = Material.Request.Form["label"];
            string name = Guid.NewGuid().ToString();

            string path = Material.Server.MapPath(Config.Azure_Temp_Path);
            string fileName = Config.Azure_Temp_FileName.Replace("{ticks}", Guid.NewGuid().ToString());

            file.SaveAs(path + fileName);

            file.InputStream.Flush();
            file.InputStream.Close();
            file.InputStream.Dispose();

            if (Cache.Azure_Blob_Client == null)
            {
                StorageCredentials storageCredentials = new StorageCredentials(Config.Azure_Account, Config.Azure_Access_Key);

                CloudStorageAccount storageAccount = new CloudStorageAccount(storageCredentials, true);
                Cache.Azure_Blob_Client = storageAccount.CreateCloudBlobClient();
            }

            CloudBlobContainer container = Cache.Azure_Blob_Client.GetContainerReference("photoshoot");

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(name);
            blockBlob.Properties.ContentType = "image/png";


            FileStream stream = new FileStream(path + fileName, FileMode.Open, FileAccess.Read);

            blockBlob.UploadFromStream(stream);

            stream.Flush();
            stream.Close();
            stream.Dispose();

            System.IO.File.Delete(path + fileName);

            flowReservation reservation = Entities.flowReservations.FirstOrDefault(r => r.Present && r.PK == reservationFk);
            flowPhotoshoot photoshoot = reservation.flowPhotoshoots.FirstOrDefault(p => p.TypeFK == typeFk);

            if (photoshoot == null)
            {
                photoshoot = new flowPhotoshoot()
                {
                    ReservationFK = reservation.PK,
                    TypeFK = typeFk,
                    Extras = "",
                    CreateDate = DateTime.Now,
                    CreatedBy = "UploadWelcomer",
                    UpdateDate = DateTime.Now,
                    UpdatedBy = "",
                    RemovalDate = DateTime.Now,
                    RemovedBy = "",
                    Present = true
                };

                Entities.flowPhotoshoots.Add(photoshoot);
                Entities.SaveChanges();
            }

            flowImage image = new flowImage()
            {
                PhotoshootFK = photoshoot.PK,
                Index = index,
                Label = label,
                Name = name,
                Url = "https://zamanimyok.blob.core.windows.net/photoshoot/" + name,
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "UploadWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.flowImages.Add(image);
            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Uploaded";

        }
    }

    public class UploadPayload : CorePayload
    {

    }

    public class UploadDelivery : CorePayload
    {

    }
}