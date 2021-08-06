using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MyFavouritsApp.Model;
using MyFavouritsApp.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFavouritsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RedditDataController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public RedditDataController(IHttpClientFactory httpclientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpclientFactory;
            _configuration = configuration;
        }

        // GET: api/<RedditDataController>
        [HttpGet("favourits")]
        public async Task<RedditFavouritsResponceRoot> GetFavourits(string token)
        {
            var redditAccessToken = new TokenHelper(_configuration).GetAccessToken(TokenSource.Reddit, token);
            var httpClient = _httpClientFactory.CreateClient();

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", redditAccessToken);
            httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("MyFavouritsAppBot", "1.0"));

            var response = await httpClient.GetAsync("https://oauth.reddit.com/user/ravi_kiran_vs/saved");

            var responseString = await response.Content.ReadAsStringAsync();

            var favourits = JsonConvert.DeserializeObject<RedditFavouritsResponceRoot>(responseString);

            return favourits;
        }

        // GET api/<RedditDataController>/5
        [HttpGet("user-info")]
        public string GetUserInfo(string token)
        {
            return "value";
        }
    }
}
