﻿using System;
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

        // Triển khai phương thức Login
        public User Login(User user)
        {
            try
            {
                return _context.Users.Single(item => item.username == user.username && item.password == user.password);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức Add
        public async Task<User> Add(User newUser)
        {
            try
            {
                if (!String.IsNullOrEmpty(newUser.role))
                {
                    if (newUser.role == UserRole.Admin || newUser.role == UserRole.User)
                    {
                        newUser.role = newUser.role;
                    }
                    else
                    {
                        newUser.role = UserRole.User;
                    }
                }
                else
                {
                    newUser.role = UserRole.User;
                }
                if (!String.IsNullOrEmpty(newUser.gender))
                {
                    if(newUser.gender == Gender.Female || newUser.gender == Gender.Male)
                    {
                        newUser.gender = newUser.gender;
                    }
                    else
                    {
                        newUser.gender = Gender.Male;
                    }
                }
                else
                {
                    newUser.gender = Gender.Male;
                }
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
                return newUser;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức GetAllUser
        public IEnumerable<User> GetAllUser()
        {
            try
            {
                return _context.Users.ToArray();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức GetUserInfo
        public User GetUserInfo(int userId)
        {
            try
            {
                return _context.Users.Single(item => item.id == userId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức GetUserByRFID
        public User GetUserByRFID(string rfidCode)
        {
            try
            {
                return _context.Users.Single(item => item.RFID == rfidCode);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức UpdateUser
        public async Task<User> UpdateUser(User user)
        {
            try
            {
                var updatedUser = _context.Users.Single(item => item.id == user.id);
                if (updatedUser != null)
                {
                    if (!String.IsNullOrEmpty(user.name))
                    {
                        updatedUser.name = user.name;
                    }
                    updatedUser.password = user.password;
                    updatedUser.RFID = user.RFID;
                    updatedUser.email = user.email;
                    if (!String.IsNullOrEmpty(user.gender))
                    {
                        if (user.gender == Gender.Female || user.gender == Gender.Male)
                        {
                            updatedUser.gender = user.gender;
                        }
                        else
                        {
                            updatedUser.gender = Gender.Male;
                        }
                    }
                    if (!String.IsNullOrEmpty(user.role))
                    {
                        if (user.role == UserRole.Admin || user.role == UserRole.User)
                        {
                            updatedUser.role = user.role;
                        }
                        else
                        {
                            updatedUser.role = UserRole.User;
                        }
                    } 
                    _context.Users.Update(updatedUser);
                    await _context.SaveChangesAsync();

                    return updatedUser;
                }

                return null;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức RemoveUser
        public async Task<bool> RemoveUser(int userId)
        {
            try
            {
                var user = _context.Users.Single(item => item.id == userId);
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                return false;
                throw e;
            }
        }

        // Triển khai phương thức RemoveAllUser
        public async Task<bool> RemoveAllUser()
        {
            try
            {
                var data = from user in _context.Users
                           select user;
                _context.Users.RemoveRange(data);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                return false;
                throw e;
            }
        }
    }
}
