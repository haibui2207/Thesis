using Microsoft.EntityFrameworkCore;
using Thesis.API.Models.DHTModel;
using Thesis.API.Models.PinModel;
using Thesis.API.Models.UserModel;

namespace Thesis.API.Context
{
    public class ThesisAPIContext : DbContext
    {
        public ThesisAPIContext(DbContextOptions<ThesisAPIContext> options) : base(options) { }

        public DbSet<Pin> Pins { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DHT> DHTs { get; set; }
    }
}
