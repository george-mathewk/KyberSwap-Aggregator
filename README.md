# Kyber-Swap.js

It is a package that allows users to swap tokens using the kyber-swap aggregator 

## Building the package locally
1. Clone the repo
2. Run `npm install` to install dependencies
3. Run `vite build` to build the package

## Running it locally if you have the github PAT token

Run `npm instal <repo>`



## **QuickStart**

### Installation
```typescript
import { Swapper } from "kyber-swap";

const swapper = new Swapper(jsonRPCSigner);

```
To get the jsonRPCSigner
```typescript
import { BrowserProvider } from "ethers";
const provider = new BrowserProvider((window as any).ethereum);
const jsonRPCSigner = await provider.getSigner();
```

### Function
#### 1.Quote
Use the `quote()` method to get swap details.
```typescript
const quoteData = await swapper.quote(tokenIn: string, tokenOut: string, amount: string);
```
Output
```
"data": {
    "routeSummary": {
      "tokenIn": "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      "amountIn": "1000000",
      "amountInUsd": "385.77",
      "tokenInMarketPriceAvailable": false,
      "tokenOut": "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      "amountOut": "385727434",
      "amountOutUsd": "385.727434",
      "tokenOutMarketPriceAvailable": false,
      "gas": "875000",
      "gasPrice": "100000000",
      "gasUsd": "0.18370776392945296",
      "extraFee": {
        "feeAmount": "0",
        "chargeFeeBy": "",
        "isInBps": false,
        "feeReceiver": ""
      }
```

#### 2.Swap
Execute token swaps with the `swap()` method.
```typescript
const transactionHash = await swapper.swap(tokenIn: string, tokenOut: string, amount: string);
```
This method returns the transaction hash for a successful swap.

## Example

```typescript
// Get swap details
//1USDC -> USDT
const quoteData = await swapper.quote("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","0xdAC17F958D2ee523a2206206994597C13D831ec7","1000000"); 

// Execute swap
//1USDC -> USDT
const transactionHash = await swapper.swap("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","0xdAC17F958D2ee523a2206206994597C13D831ec7","1000000");
```
