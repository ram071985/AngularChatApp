using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Context
{
    public class ChatContext : DbContext
    {

        private readonly IConfiguration _config;

        public ChatContext(IConfiguration config, DbContextOptions<ChatContext> options) : base(options)
        {
            _config = config;
        }

        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Messages> Messages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);


            optionsBuilder.UseSqlServer(_config.GetConnectionString("ChatContext"), b => b.MigrationsAssembly("ChatAppAPI"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Messages>();

            modelBuilder.Entity<Users>();
               
        }
    }

}
