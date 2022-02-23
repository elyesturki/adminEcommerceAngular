import { Product } from "./product";
import { Category } from './category';

export interface ResAPIProduct {
  status: number,
  message: string,
  time: string,
  result: Product[],
  args: string[],
}

export interface ResponseAPICat {
  status: number,
  message: string,
  time: string,
  result: Category[],
  args: string[],
}
