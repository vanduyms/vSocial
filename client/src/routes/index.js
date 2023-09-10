import config from "../config/index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Discover from "../pages/Discover";
import Message from "../pages/Message";
import Profile from "../pages/Profile/[id]";
import Notify from "../pages/Notify";
import NotFound from "../components/NotFound";

const publicRoutes = [
  { path: config.login, component: Login },
  { path: config.register, component: Register },
  { path: config.discover, component: Discover },
  { path: config.profile, component: Profile },
  { path: config.message, component: Message },
  { path: config.notify, component: Notify },
  // { path: config.notfound, component: NotFound }
]

export { publicRoutes };