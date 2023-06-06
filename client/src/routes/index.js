import config from "../config/index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Discover from "../pages/Discover";
import Message from "../pages/Message";
import Profile from "../pages/Profile/[id]";
import Notify from "../pages/Notify";

const publicRoutes = [
  { path: config.login, component: Login },
  { path: config.register, component: Register },
  { path: config.discover, component: Discover },
  { path: config.profile, component: Profile },
  { path: config.message, component: Message },
  { path: config.notify, component: Notify },
]

export { publicRoutes };