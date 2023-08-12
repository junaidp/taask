import { configureStore } from "@reduxjs/toolkit";

import Wrapper from "../features/slice";

export const store = configureStore({
  reducer: {
    store: Wrapper,
  },
});
