using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.Entities
{

    [Table("Users", Schema = "dbo")]

    public class UserBase
    {
        [Required()]
        [Key()]
        public Guid UserId { get; set; }
        [Required()]
        public string Username { get; set; }
        [Required()]
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
 //       public string Active { get; set; }

    }
}
