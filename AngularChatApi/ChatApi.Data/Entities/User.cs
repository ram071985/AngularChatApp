using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public partial class User
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
