import { configureStore } from "@reduxjs/toolkit";

import newestProductReducer from "./newestProduct-slice";
import cartUiReducer from "./cartUI-slice";
import sideNavBarReducer from "./sideNavBar-slice";
import megaMenuReducer from "./megaMenu-slice";
import settingBoxReducer from "./settingBox-slice";
import favoriteReducer from "./favorite-slice";
import activeMenuItemReducer from "./activeMenuItem-slice";

const store = configureStore({
  reducer: {
    newestProductsList: newestProductReducer,
    cartUi: cartUiReducer,
    sideNavBar: sideNavBarReducer,
    megaMenu: megaMenuReducer,
    settingBox: settingBoxReducer,
    favorite: favoriteReducer,
    activeMenuItem: activeMenuItemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
