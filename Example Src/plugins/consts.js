export default ({ Vue }) => {
  Vue.prototype.$consts = {
    // #region General
    API_URL: 'http://yoursite.azurewebsites.net/api/v1',
    // #endregion

    // #region Auth
    AUTH_LOGIN_URL: '/auth/login',
    REFRESH_TOKEN_URL: '/auth/refresh',
    LOGOUT_URL: '/auth/logout',
    // #endregion
  }
}
