using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Agents.Welcomers.Auth;
using api.zamanimyok.com.Repository;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using api.zamanimyok.com.Abstract.Tools;

namespace api.zamanimyok.com.Controllers
{
    public class SysController : Controller
    {
        [HttpGet]
        public string Environment()
        {
            return new Entities().Database.Connection.ConnectionString.Split(';')[0].Split('=')[1];
        }
    }
}