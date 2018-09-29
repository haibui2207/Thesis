using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Thesis.API.Models.DHTModel
{
    public class DHT
    {
        public int id { get; set; } // Id bắt buộc để tạo khóa chính

        [Required]
        public string temperature { get; set; } // Nhiệt độ

        [Required]
        public string humidity { get; set; }    // Độ ẩm

        [Required]
        public string key { get; set; } // Định danh Arduino

        public DHT() { }    // Hàm khởi tạo không tham số

        // Hàm khởi tạo có tham số
        public DHT(string temperature, string humidity, string key)
        {
            this.temperature = temperature;
            this.humidity = humidity;
            this.key = key;
        }
    }
}
