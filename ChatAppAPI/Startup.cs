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
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
            ConfigureJwt(services);
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
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("CorsPolicy");

            // Most likely a better alternative for handling CORS
            //app.UseCors(options =>
            //options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());

          

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                     name: "default",
                    pattern: "{controller}/{action=Index}/{id?}"
                    );
            });
        }

        public void ConfigureJwt(IServiceCollection services)
        {
            // Get JWT Token Settings from appsettings.json file
            JwtSettings settings = GetJwtSettings();
            services.AddSingleton<JwtSettings>(settings);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            })
                .AddJwtBearer("JwtBearer", jwtBearerOptions =>
                {
                    jwtBearerOptions.TokenValidationParameters =
                    new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(settings.Key)),
                        ValidateIssuer = true,
                        ValidIssuer = Configuration["JwtToken:iss"],

                        ValidateAudience = true,
                        ValidAudience = Configuration["JwtToken:audience"],

                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.FromMinutes(
                            settings.MinutesToExpiration)
                    };
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