import { User } from "types";

export interface Product {
  cod: number;
  name: string;
  status: number;
  value: number;
  categoryId: number;
  categoryName?: string 
  quantity: number;
  description: string;
  image: string;
  userId: number | null
  userName?: string
  user?: User 
  createdAt: Date;
}


export interface ProductCreate {
  name: string;
  value: number;
  quantity: number;
  description: string;
  image?: string;
  userId: number;
  categoryId: number;
}