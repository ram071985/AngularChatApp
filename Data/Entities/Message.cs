using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public partial class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
