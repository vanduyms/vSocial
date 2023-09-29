import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import postReducer from "./reducers/postReducer";
import socketReducer from "./reducers/socketReducer";
import messageReducer from "./reducers/messageReducer";
import onlineReducer from "./reducers/onlineReducer";
import alertReducer from "./reducers/alertReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    socket: socketReducer,
    message: messageReducer,
    online: onlineReducer,
    alert: alertReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export default store;