using ChatAppAPI.Models;
using Data.Context;
using Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppAPI.Controllers
{
    [Authorize(Policy = "CanAccessChat")]
    [Route("[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ChatContext _db;

        public MessagesController(ChatContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetMessages()
        {

            var messageReturn = new List<MessageReturnObject>();
            var users = _db.UserBases.ToList();
            var messages = _db.Messages.ToList();
            try
            {
                // var test = from m in messages join 
                messageReturn = (from m in messages
                           join u in users
                           on m.UserId equals u.UserId
                           select new MessageReturnObject
                           {
                               Username = u.Username,
                               Text = m.Text,
                               CreatedDate = m.CreatedDate
                           }).ToList();
                return Ok(messageReturn);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpPost]
   
        public IActionResult AddMessage([FromBody] MessageModel messageModel)
        {

          
            try
            {
                var message = new Message();
                message.UserId = new Guid("1");
                message.Text = messageModel.Text;
           //     message.DateCreated = DateTime.Now;
                _db.Messages.Add(message);
                _db.SaveChanges();

                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        public class MessageReturnObject
        {
            public string Username { get; set; }
            public string Text { get; set; }
            public DateTime CreatedDate { get; set; }
        }
    }
}
