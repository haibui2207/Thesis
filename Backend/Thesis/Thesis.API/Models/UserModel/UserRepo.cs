using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thesis.API.Context;

namespace Thesis.API.Models.UserModel
{
    public class UserRepo : IUserRepo
    {
        private readonly ThesisAPIContext _context; // DbContext để truy xuất dữ liệu từ CSDL

        public UserRepo(ThesisAPIContext context)
        {
            this._context = context;
        }

        // Triển khai phương thức Add
        public async Task<User> Add(User newUser)
        {
            try
            {
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
                return newUser;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức Remove
        public User Remove(User removeUser)
        {
            try
            {
                var user = _context.Users.Single(item =>
                    item.name == removeUser.name &&
                    item.RFID == removeUser.RFID);
                _context.Users.Remove(user);
                _context.SaveChanges();

                return user;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức GetDataByRFID
        public User GetDataByRFID(string RFID)
        {
            try
            {
                return _context.Users.Single(item => item.RFID == RFID);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
