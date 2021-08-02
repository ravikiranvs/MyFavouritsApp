using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MyFavouritsApp.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFavouritsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public TokenController(IHttpClientFactory httpclientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpclientFactory;
            _configuration = configuration;
        }

        // POST api/<TokenController>
        [HttpPost]
        [Route("reddit")]
        public async Task<UserTokenData> GenerateRedditToken([FromBody] string code, string userToken)
        {
            var httpClient = _httpClientFactory.CreateClient();

            var token = await new TokenHelper(_configuration).UpdateTokenWithRedditAccess(code, userToken, httpClient);

            return new UserTokenData { Token = token };
        }
    }

    public class UserTokenData
    {
        [Required]
        public string Token { get; set; }
    }
}
