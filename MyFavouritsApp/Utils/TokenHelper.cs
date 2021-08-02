using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace MyFavouritsApp.Utils
{
    public class TokenHelper
    {
        private readonly IConfiguration _configuration;
        public TokenHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> GetRedditToken(string code, string userToken = null, HttpClient httpClient = null)
        {
            var redditConfig = _configuration.GetSection("Reddit");
            string basicAuth = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(redditConfig.GetValue<string>("AppId") + ":" + redditConfig.GetValue<string>("Secret")));

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

            var responseObject = JsonConvert.DeserializeObject<RedditTokenResponse>(responseString);

            return CreateUserToken(new UserToken { Expiry = responseObject.expires_in, Source = "REDDIT", Token = responseObject.access_token }, userToken);
        }

        internal string CreateUserToken(UserToken token, string userToken = null)
        {
            var secret = _configuration.GetValue<string>("AppSecret");
            List<UserToken> newUserTokens;
            if (userToken != null)
            {
                var userTokenDecrypted = AesOperation.DecryptString(secret, userToken);
                newUserTokens = JsonConvert.DeserializeObject<UserToken[]>(userTokenDecrypted).ToList();
            }
            else
            {
                newUserTokens = new List<UserToken>();
            }

            var newUserTokensArray = newUserTokens.Where(t => t.Source != token.Source).Append(token).ToArray();

            var newUserTokensEncrypted = AesOperation.EncryptString(secret, JsonConvert.SerializeObject(newUserTokensArray));
            return newUserTokensEncrypted;
        }
    }


    public class RedditTokenResponse
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public string scope { get; set; }
    }

    public class UserToken
    {
        public string Token { get; set; }
        public int Expiry { get; set; }

        public string Source { get; set; }
    }

    public class AesOperation
    {
        private static byte[] CreateKey(string password, int keyBytes = 32)
        {
            byte[] Salt = new byte[] { 10, 20, 30, 40, 50, 60, 70, 80 };
            var keyGenerator = new Rfc2898DeriveBytes(password, Salt);
            return keyGenerator.GetBytes(keyBytes);
        }

        public static string EncryptString(string key, string plainText)
        {
            byte[] iv = new byte[16];
            byte[] array;

            using (Aes aes = Aes.Create())
            {
                aes.Key = CreateKey(key);
                aes.IV = iv;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                        {
                            streamWriter.Write(plainText);
                        }

                        array = memoryStream.ToArray();
                    }
                }
            }

            return Convert.ToBase64String(array);
        }

        public static string DecryptString(string key, string cipherText)
        {
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(cipherText);

            using (Aes aes = Aes.Create())
            {
                aes.Key = CreateKey(key);
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                        {
                            return streamReader.ReadToEnd();
                        }
                    }
                }
            }
        }
    }

}
