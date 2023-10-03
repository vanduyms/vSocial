const routes = {
  home: "/",
  // login: "/login",
  register: "/register",
  postDetail: "/post/:id",
  message: "/message",
  conversation: "/message/:id",
  profile: "/profile/:id",
  discover: "/discover",
  notify: "/notify",
  forgotPass: "/resetPassword",
  resetPass: "/resetPassword/:id/:token",
  notfound: "*"
}

export default routes;