using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Linq;
using Data.Context;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Data.Entities;
using System;

namespace ChatAppAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMvc()
     .AddNewtonsoftJson(
          options =>
          {
              options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
          });

            services.AddDbContext<ChatContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ChatContext")));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ChatApi",
                    Version = "v1"
                });

            });

            var allowedOrigins = Configuration.GetValue<string>("AllowedOrigins").Split(",").Select(x => x.Trim()).ToArray();

            services.AddCors(options =>
            {
                options.AddPolicy(
                  "CorsPolicy",
                  builder => builder.WithOrigins(allowedOrigins)
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ChatApi v1");

                c.RoutePrefix = string.Empty;
            });


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            // Most likely a better alternative for handling CORS
            //app.UseCors(options =>
            //options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                     name: "default",
                    pattern: "{controller}/{action=Index}/{id?}"
                    );
            });
        }

        public JwtSettings GetJwtSettings()
        {
            JwtSettings settings = new JwtSettings();

            settings.Key = Configuration["JwtToken:key"];
            settings.Audience = Configuration["JwtToken:audience"];
            settings.MinutesToExpiration = Convert.ToInt32(
                Configuration["JwtToken:minutestoexpiration"]);

            return settings;

        }
    }
}