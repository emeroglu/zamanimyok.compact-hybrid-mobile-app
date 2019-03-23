using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web.Mail;
using System.Web;

namespace api.zamanimyok.com.Agents
{
    public class Postman : CoreAgent<PostmanMaterial>
    {
        public void Send()
        {
            Perform();
        }

        protected override void Job()
        {
            MailMessage mail = new MailMessage();
            mail.From = "info@zamanimyok.com";
            mail.To = Material.To;
            mail.Subject = Material.Subject;
            mail.Body = Material.Body;

            mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserver", "srvm05.trwww.com");
            mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserverport", "465");
            mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusing", "2");
            mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1");
            mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", "info@zamanimyok.com");
            mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", "Qzxc1234");
            mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpusessl", "true");

            SmtpMail.SmtpServer = "srvm05.trwww.com";
            SmtpMail.Send(mail);
        }

    }

    public class PostmanMaterial : CoreMaterial
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}