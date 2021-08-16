using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public partial class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime CreatedData { get; set; }
    }
}
