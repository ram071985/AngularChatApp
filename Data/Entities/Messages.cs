using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public partial class Messages
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
