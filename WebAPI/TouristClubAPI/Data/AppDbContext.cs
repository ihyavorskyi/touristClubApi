using TouristClubApi.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TouristClubApi.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Record> Records { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //builder.Entity<Service>()
            //    .HasOne(serv => serv.Department)
            //    .WithMany(dep => dep.Services)
            //    .HasForeignKey(serv => serv.DepartmentId);
            builder.Entity<Record>()
                .HasOne(r => r.Doctor)
                .WithMany(u => u.Records)
                .HasForeignKey(r => r.DoctorId);
            builder.Entity<Record>()
                .HasOne(r => r.Patient)
                .WithMany(u => u.Visits)
                .HasForeignKey(r => r.PatientId);
            builder.Entity<User>()
                .HasOne(u => u.Department)
                .WithMany(dep => dep.Doctors)
                .HasForeignKey(u => u.DepartmentId);
        }
    }
}