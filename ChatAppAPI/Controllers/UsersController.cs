using Data.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppAPI.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ChatContext _db;

        public UsersController(ChatContext db)
        {
            _db = db;
        }

        [HttpPost]
        public IActionResult AddUser()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

    }
}
