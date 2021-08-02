const redditStorageKey = "redditAccessToken";
const reddit = {
    get: () => window.sessionStorage.getItem(redditStorageKey),
    set: (accessToken: string) => window.sessionStorage.setItem(redditStorageKey, accessToken),
    start: () => window.location.replace("https://www.reddit.com/api/v1/authorize?client_id=goBGb_8I_vj33A&response_type=code&state=RANDOM_STRING&redirect_uri=https://localhost:8001/auth-reddit-callback&duration=temporary&scope=read")
};

export { reddit };