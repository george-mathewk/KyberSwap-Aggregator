import { DataApiResponse } from "./types";

export interface ISwapper{
    quote(tokenIn: string, tokenOut: string, amount: string): Promise<DataApiResponse>;
    swap(tokenIn: string, tokenOut: string, amount: string): Promise<string>;
}