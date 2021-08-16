using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public partial class Message
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
