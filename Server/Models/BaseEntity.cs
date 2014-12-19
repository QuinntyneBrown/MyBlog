using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Models
{
    public class BaseEntity: ILoggable
    {
        [Key]
        [Required]
        public int Id { get; set; }
        
        public int? TenantId { get; set; }
        
        public DateTime? CreatedDate { get; set; }
        
        public DateTime? LastModifiedDate { get; set; }
        
        public string LastModifiedByUserName { get; set; }

        [ForeignKey("LastModifiedByUser")]
        public int? LastModifiedByUserId { get; set; }

        public User LastModifiedByUser { get; set; }
        
        public bool IsDeleted { get; set; }
        
        public bool IsActive { get; set; }
    }
}