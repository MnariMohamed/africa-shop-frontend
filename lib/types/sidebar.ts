import { IDropDown } from "./dropDown";

export interface ISideNavBar {
  isSidebarOpen: boolean;
  isNavbarOpen: boolean;
  dropDownList: IDropDown[];
  category: string;
}

export interface ISideNavBarRootState {
  sideNavBar: ISideNavBar;
}
