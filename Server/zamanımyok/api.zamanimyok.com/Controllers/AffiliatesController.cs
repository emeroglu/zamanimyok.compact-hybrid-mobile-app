using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Agents.Welcomers.Affiliates;
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

namespace api.zamanimyok.com.Controllers
{
    public class AffiliatesController : Controller
    {        
        [HttpPost]
        public void All()
        {
            new AllWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }        
    }
}