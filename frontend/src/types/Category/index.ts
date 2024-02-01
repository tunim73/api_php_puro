import { Product } from "types";

export interface Category {
  id: number;
  name: string;
  products?: Product[]
  count?: number
}