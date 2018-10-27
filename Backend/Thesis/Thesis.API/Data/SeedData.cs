using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using Thesis.API.Context;
using Thesis.API.Models;
using Thesis.API.Models.PinModel;
using Thesis.API.Models.UserModel;

namespace Thesis.API.Data
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ThesisAPIContext(
                serviceProvider.GetRequiredService<DbContextOptions<ThesisAPIContext>>()))
            {
                if (context.Pins.Any() && context.Users.Any() && context.DHTs.Any()) // If Data had value , return
                {
                    return;
                }
                if (!context.Pins.Any())
                {

                    context.Pins.AddRange(
                        new Pin(1, KitKey.Kit001, 0), new Pin(2, KitKey.Kit001, 0), new Pin(3, KitKey.Kit001, 0),
                        new Pin(4, KitKey.Kit001, 0), new Pin(5, KitKey.Kit001, 0),
                        new Pin(9, KitKey.Kit001, 0), new Pin(10, KitKey.Kit001, 0),
                        new Pin(12, KitKey.Kit001, 0), new Pin(13, KitKey.Kit001, 0),
                        new Pin(14, KitKey.Kit001, 0), new Pin(15, KitKey.Kit001, 0),
                        new Pin(1, KitKey.Kit002, 0), new Pin(2, KitKey.Kit002, 0), new Pin(3, KitKey.Kit002, 0),
                        new Pin(4, KitKey.Kit002, 0), new Pin(5, KitKey.Kit002, 0),
                        new Pin(9, KitKey.Kit002, 0), new Pin(10, KitKey.Kit002, 0),
                        new Pin(12, KitKey.Kit002, 0), new Pin(13, KitKey.Kit002, 0),
                        new Pin(14, KitKey.Kit002, 0), new Pin(15, KitKey.Kit002, 0)
                    );
                }
                if (!context.Users.Any())
                {
                    context.Users.AddRange(
                        new User("Hai Bui", "admin", "haibui@gmail.com", "admin", "919b8459", UserRole.Admin, Gender.Male),
                        new User("User", "user", "user@gmail.com", "user", "", UserRole.User, Gender.Male),
                        new User("User 1", "user1", "user1@gmail.com", "user1", "", UserRole.User, Gender.Male),
                        new User("User 2", "user2", "user2@gmail.com", "user2", "", UserRole.User, Gender.Female),
                        new User("User 3", "user3", "user3@gmail.com", "user3", "", UserRole.User, Gender.Female)
                    );

                }

                context.SaveChanges();
            }
        }
    }
}
