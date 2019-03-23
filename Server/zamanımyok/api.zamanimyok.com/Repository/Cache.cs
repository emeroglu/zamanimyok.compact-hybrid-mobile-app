using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Repository
{
    public static class Cache
    {
        public static CloudBlobClient Azure_Blob_Client;        
    }
}