using TouristClub.API.Middlewares;
using TouristClub.API.Services;
using TouristClub.API.Services.Interfaces;
using TouristClubApi.Data;
using TouristClubApi.Data.Models;
using TouristClubApi.Middlewares;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace TouristClubApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = "";
            connectionString = Configuration.GetConnectionString("LocalDb");

            services.AddEntityFrameworkSqlServer().AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });
            services.AddIdentity<User, IdentityRole>(set =>
            {
                set.Password = new PasswordOptions()
                {
                    RequireNonAlphanumeric = false,
                    RequireDigit = true,
                    RequireLowercase = true,
                    RequireUppercase = true,
                    RequiredLength = 8
                };
                set.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<AppDbContext>();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigin", builder => builder.AllowAnyOrigin());
            });
            services.AddControllers();

            var tokenParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,

                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["JwtIssuer"],
                ValidAudience = Configuration["JwtAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JwtKey"])),
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = tokenParameters;
                options.RequireHttpsMetadata = true;
            });
            services.AddSingleton(tokenParameters);

            services.AddControllers();
            var assembly = typeof(Startup).Assembly;
            services.AddMediatR(assembly);
            services.AddScoped<IAuthService, AuthService>();
            services.AddMvcCore().AddApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "TouristClubAPI", Version = "v1" });
                var security = new Dictionary<string, IEnumerable<string>>
                {
                     {"Bearer", new string[0] }
                };
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the bearer scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                     {
                         new OpenApiSecurityScheme
                         {
                             Reference = new OpenApiReference
                             {
                                 Type = ReferenceType.SecurityScheme,
                                 Id = "Bearer"
                             },
                             Scheme = "oauth2",
                             Name = "Bearer",
                             In = ParameterLocation.Header,
                         },
                         new List<string>()
                     }
                });
                options.CustomSchemaIds(f => f.FullName);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.None,
                HttpOnly = HttpOnlyPolicy.Always,
                Secure = CookieSecurePolicy.Always
            });
            app.UseHttpsRedirection();
            app.UseRouting();
            if (env.IsDevelopment())
            {
                app.UseCors(builder => builder.WithOrigins("http://localhost:4200").AllowCredentials().AllowAnyMethod().AllowAnyHeader());
            }

            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseMiddleware<AuthMiddleware>();
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}