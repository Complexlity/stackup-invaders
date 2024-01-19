let DOMAIN
let CLIENT_ID

let url = window.location.href;

if(url.includes("localhost")){
  DOMAIN = "http://localhost:5500/"
  CLIENT_ID = "7pcx6llzmGnX9WZBRmA683HpgSDbYWkV";
}
else if (url.includes('vercel')) {
  DOMAIN = "https://stackup-invaders.vercel.app/"
  CLIENT_ID = "rr2dn32f3eDZQIsBD0aF6YtGn0sWLRCq";

}
else {
  DOMAIN = "https://stackup-invaders.netlify.app/";
  CLIENT_ID = "IQH9SkHcHTWQDSyUHUo3QW7YbZR9LHoM";
}


window.passport = new window.immutable.passport.Passport({
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX,
  }),
  clientId: CLIENT_ID,
  redirectUri: DOMAIN,
  logoutRedirectUri: DOMAIN + "logout.html",
  audience: "platform_api",
  scope: "openid offline_access email transact",
});

