let DOMAIN
let CLIENT_ID

if(window.location.href.includes("localhost")){
  DOMAIN = "http://localhost:5500/"
  CLIENT_ID = "LOCmHiZuAGofHBVlOkAcHbJh80Z8DYhJ"
  }else{
  DOMAIN = "https://stackup-invaders.vercel.app/"
  CLIENT_ID = "1jOXOSHt33RhUrLrl0R0tgv3Kn4J2WPY";
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

