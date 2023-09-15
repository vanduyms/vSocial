import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import postReducer from "./reducers/postReducer";
import socketReducer from "./reducers/socketReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    socket: socketReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export default store;