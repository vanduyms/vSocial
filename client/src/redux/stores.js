import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import postReducer from "./reducers/postReducer";
import socketReducer from "./reducers/socketReducer";
import messageReducer from "./reducers/messageReducer";
import onlineReducer from "./reducers/onlineReducer";
import alertReducer from "./reducers/alertReducer";
import notifyReducer from "./reducers/notifyReducer";
import discoverReducer from "./reducers/discoverReducer";
import suggestionReducer from "./reducers/suggestionReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    socket: socketReducer,
    message: messageReducer,
    online: onlineReducer,
    alert: alertReducer,
    discover: discoverReducer,
    notify: notifyReducer,
    suggestion: suggestionReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export default store;