﻿
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

        [HttpPost]
        public IActionResult AddUser([FromBody] UserModel userModel)
        {
            try
            {
                var user = new UserBase();
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(userModel.Password);

                user.Username = userModel.Username;
                user.Password = passwordHash;
                user.CreatedDate = DateTime.Now;
                _db.UserBases.Add(user);
                _db.SaveChanges();

                return Ok(user);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

    }
}
