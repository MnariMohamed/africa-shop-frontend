export interface IProductDetails {
  processor?: string;
  screen?: string;
  operating_system?: string;
  ram?: string;
  ssd?: string;
  ports?: string;
  graphic?: string;
  warranty?: string;
  back_camera?: string;
  front_camera?: string;
  battery?: string;
  frequency_response?: string;
  microphone?: boolean;
  wireless?: boolean;
  wireless_standby_time?: boolean;
  connectionType?: string[];
  connectors?: string[];
  bluetooth?: boolean;
  noise_cancelling?: boolean;
  sound_isolating?: boolean;
}

/* export type TSlug = {
  _type: string;
  current: string;
}; */

export interface IProduct {
  id: string;
  image?: TImage;
  images: TImage[];
  name: string;
  quantity: number;
  description: string;
  price: number;
  discount?: number;
  category: Category;
  status: string; // Inactive, Active
  createdAt?: string;
  timeStamp?: number;
}

export interface ProductState {
  homeProducts: IProduct[];
  searchedProducts: IProduct[];
  similarProducts: IProduct[];
  currentProduct: IProduct;
  loading: boolean;
  error: any;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ProductResponse {
  id: string;
  name: string;
  quantity: number;
  description: string;
  price: number;
  discount?: number;
  status: string;
  createdAt: string;
  updated_at: string;
  category: Category;
  images: TImage[];
}

export interface TImage {
  id: string;
  path: string;
  createdAt?: string;
  updatedAt?: string;
  __entity: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
