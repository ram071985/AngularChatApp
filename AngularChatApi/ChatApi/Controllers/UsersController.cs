
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
    public class UsersController : ControllerBase
    {
        private readonly ChatContext _db;

        public UsersController(ChatContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _db.UserBases.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] UserModel userModel)
        {
            try
            {
                var users = _db.UserBases.Where(x => x.Username == userModel.Username).ToArray();
                if (users.Length < 1)
                {
                    var user = new UserBase();
                    string passwordHash = BCrypt.Net.BCrypt.HashPassword(userModel.Password);

                    user.Username = userModel.Username;
                    user.Password = passwordHash;
                    user.CreatedDate = DateTime.Now;

                    _db.UserBases.Add(user);
                    _db.SaveChanges();

                    var claims = new UserClaim
                    {
                        UserId = user.UserId,
                        ClaimType = "CanAccessChat",
                        ClaimValue = "true"
                    };

                    _db.Claims.Add(claims);
                    _db.SaveChanges();

                    return Ok(user);
                }
                else 
                {
                    return BadRequest("Username exists");
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

    }
}
