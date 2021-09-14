using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppAPI.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Password { get; set; }
    }
}
