using Microsoft.EntityFrameworkCore;
using ProductMvc.Models.DbEntities;

namespace ProductMvc.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
