using ChatAppAPI.Models;
using Data.Context;
using Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppAPI.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly ChatContext _db;

        public MessagesController(ChatContext db)
        {
            _db = db;
        }

        [HttpPost]
        public IActionResult AddMessage([FromBody] MessageModel messageModel)
        {
            try
            {
                var message = new Message();
                message.UserId = 1;
                message.Text = messageModel.Text;
                message.DateCreated = DateTime.Now;
                _db.Messages.Add(message);
                _db.SaveChanges();

                return Ok(message);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
