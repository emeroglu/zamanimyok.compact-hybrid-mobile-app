//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace api.zamanimyok.com.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class authDevice
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public authDevice()
        {
            this.authLogins = new HashSet<authLogin>();
            this.authMemberDevices = new HashSet<authMemberDevice>();
        }
    
        public int PK { get; set; }
        public Nullable<int> ScreenFK { get; set; }
        public Nullable<int> UseragentFK { get; set; }
        public Nullable<int> OSFK { get; set; }
        public string Extras { get; set; }
        public System.DateTime CreateDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdateDate { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime RemovalDate { get; set; }
        public string RemovedBy { get; set; }
        public bool Present { get; set; }
    
        public virtual authScreen authScreen { get; set; }
        public virtual authUseragent authUseragent { get; set; }
        public virtual authO authO { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<authLogin> authLogins { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<authMemberDevice> authMemberDevices { get; set; }
    }
}
