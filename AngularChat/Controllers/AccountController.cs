using AngularChat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace AngularChat.Controllers
{
    [Route("[Controller]/[Action]")]
    [ApiController]
    public class AccountController : Controller
    {
        public readonly SqlConnection SqlCon;
        private readonly IConfiguration _config;

        public AccountController(IConfiguration config)
        {
            _config = config;
            SqlCon = new SqlConnection(_config.GetConnectionString("Connection"));
        }

        [Route("~/Account/RegisterUser")]
        [HttpPost]
        public IActionResult RegisterUser([FromBody]RegistrationModel registration)
        {
            SqlCommand com = new("CHECK_USER", SqlCon)
            {
                CommandType = CommandType.StoredProcedure
            };
            com.Parameters.AddWithValue("@Username", registration.UserName);
            SqlCon.Open();
            var result = com.ExecuteScalar();
            SqlCon.Close();

            if(result != null)
            {
                return BadRequest();
            }
            com = new SqlCommand("REGISTER_USER", SqlCon)
            {
                CommandType = CommandType.StoredProcedure
            };
            com.Parameters.AddWithValue("@Username", registration.UserName);
            com.Parameters.AddWithValue("@Password", registration.Password);
            SqlCon.Open();
            com.ExecuteNonQueryAsync();
            SqlCon.Close();

            return Ok();
        }

        [Route("~/Account/LoginUser")]
        [HttpPost]
        public IActionResult LoginUser([FromBody]LoginModel loginModel)
        {
            SqlCommand com = new("CHECK_USER_FOR_LOGIN", SqlCon)
            {
                CommandType = CommandType.StoredProcedure
            };
            com.Parameters.AddWithValue("@Username", loginModel.UserName);
            com.Parameters.AddWithValue("@Password", loginModel.Password);
            SqlCon.Open();
            var result = com.ExecuteScalar();
            SqlCon.Close();

            if (result == null)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
