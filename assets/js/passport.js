let DOMAIN
let CLIENT_ID

let url = window.location.href;

if(url.includes("localhost")){
  DOMAIN = "http://localhost:5500/"
  CLIENT_ID = "LOCmHiZuAGofHBVlOkAcHbJh80Z8DYhJ"
}
else if (url.includes('vercel')) {
  DOMAIN = "https://stackup-invaders.vercel.app/"
  CLIENT_ID = "1jOXOSHt33RhUrLrl0R0tgv3Kn4J2WPY";

}
else {
  DOMAIN = "https://stackup-invaders.netlify.app/";
  CLIENT_ID = "zmXQZuc3dBGQMTF9e1QaFJxRbpTUxiM3";
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

