using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppAPI.Models
{
    public class MessageModel
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string Text { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
