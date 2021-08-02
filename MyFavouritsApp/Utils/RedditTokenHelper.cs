using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Net.Http.Headers;

namespace MyFavouritsApp.Utils
{
    public class RedditTokenHelper
    {
        public async Task<string> GetToken(string code, HttpClient httpClient = null)
        {
            if(httpClient == null)
            {
                httpClient = new HttpClient();
            }

            string username = "goBGb_8I_vj33A";
            string password = "DT8pB9nidwZnJjsMA1vGBgUeNUU";

            string basicAuth = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));

            var values = new Dictionary<string, string>
                {
                    { "grant_type", "authorization_code" },
                    { "code", code },
                    {"redirect_uri", "https://localhost:8001/auth-reddit-callback" }
                };

            var content = new FormUrlEncodedContent(values);

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", basicAuth);

            var response = await httpClient.PostAsync("https://www.reddit.com/api/v1/access_token", content);

            var responseString = await response.Content.ReadAsStringAsync();

            return responseString;
        }
    }
}
