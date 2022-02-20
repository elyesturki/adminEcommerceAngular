import { Product } from "./product";

export interface ResponseAPI {
  status: number,
  message: string,
  time: string,
  result: Product[],
  args: string[],
}
