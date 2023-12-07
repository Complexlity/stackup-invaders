const DOMAIN = "http://localhost:5500/"

window.passport = new window.immutable.passport.Passport({
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX,
  }),
  clientId: "LOCmHiZuAGofHBVlOkAcHbJh80Z8DYhJ",
  redirectUri: DOMAIN,
  logoutRedirectUri: DOMAIN + "logout.html",
  audience: "platform_api",
  scope: "openid offline_access email transact",
});

