/* export interface IDropDown {
  title: string;
  url?: string;
  subtitles: string[];
} */

export interface ICategory {
  id: string;
  name: string;
  icon?: string | null;
  level?: number;
  subCategories?: ICategory[] | undefined;
}
