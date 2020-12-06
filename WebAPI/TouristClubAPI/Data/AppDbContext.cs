using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TouristClub.API.Data.Models;

namespace TouristClubApi.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Article> Articles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Excursion> Excursions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Article>()
                .HasOne(a => a.Topic)
                .WithMany(t => t.Articles)
                .HasForeignKey(a => a.TopicId);
            builder.Entity<Article>()
                .HasOne(a => a.User)
                .WithMany(u => u.Articles)
                .HasForeignKey(a => a.AuthorId);
            builder.Entity<Comment>()
               .HasOne(c => c.Article)
               .WithMany(a => a.Comments)
               .HasForeignKey(c => c.ArticleId);
            builder.Entity<Comment>()
               .HasOne(c => c.User)
               .WithMany(u => u.Comments)
               .HasForeignKey(u => u.AuthorId);
            builder.Entity<Excursion>()
               .HasOne(e => e.Category)
               .WithMany(c => c.Excursions)
               .HasForeignKey(e => e.CategoryId);
            builder.Entity<Ticket>()
               .HasOne(t => t.Excursion)
               .WithMany(e => e.Tickets)
               .HasForeignKey(t => t.ExcursionId);
            builder.Entity<Ticket>()
               .HasOne(t => t.User)
               .WithMany(u => u.Tickets)
               .HasForeignKey(t => t.OwnerId);
        }
    }
}