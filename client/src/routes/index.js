import config from "../config/index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Discover from "../pages/Discover";
import Message from "../pages/Message/index";
import Profile from "../pages/Profile/[id]";
import Notify from "../pages/Notify";
import Post from "../pages/Post/[id]";
import Conversation from "../pages/Conversation";
import ForgotPass from "../pages/ForgotPass";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../components/NotFound";

const publicRoutes = [
  { path: config.login, component: Login },
  { path: config.register, component: Register },
  { path: config.discover, component: Discover },
  { path: config.profile, component: Profile },
  { path: config.message, component: Message },
  { path: config.notify, component: Notify },
  { path: config.postDetail, component: Post },
  { path: config.conversation, component: Conversation },
  { path: config.resetPass, component: ResetPassword },
  { path: config.forgotPass, component: ForgotPass },
  { path: config.notFound, component: NotFound },
]

export { publicRoutes };