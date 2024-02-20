export interface FilledOrder {
    allowedSenders: string;
    feeAmount: string;
    feeRecipient: string;
    filledMakingAmount: string;
    filledTakingAmount: string;
    getMakerAmount: string;
    getTakerAmount: string;
    interaction: string;
    isFallback: boolean;
    maker: string;
    makerAsset: string;
    makerAssetData: string;
    makerTokenFeePercent: number;
    makingAmount: string;
    orderId: number;
    permit: string;
    predicate: string;
    receiver: string;
    salt: string;
    signature: string;
    takerAsset: string;
    takerAssetData: string;
    takingAmount: string;
}

export interface PoolExtra {
    type: string;
    dodoV1SellHelper: string;
    baseToken: string;
    quoteToken: string;
}

export interface Route {
    pool: string;
    tokenIn: string;
    tokenOut: string;
    limitReturnAmount: string;
    swapAmount: string;
    amountOut: string;
    exchange: string;
    poolLength: number;
    poolType: string;
    poolExtra: PoolExtra;
    extra: {
        amountIn: string;
        filledOrders: FilledOrder[];
        swapSide: string;
    };
}

export interface RouteSummary {
    tokenIn: string;
    amountIn: string;
    amountInUsd: string;
    tokenInMarketPriceAvailable: boolean;
    tokenOut: string;
    amountOut: string;
    amountOutUsd: string;
    tokenOutMarketPriceAvailable: boolean;
    gas: string;
    gasPrice: string;
    gasUsd: string;
    extraFee: {
        feeAmount: string;
        chargeFeeBy: string;
        isInBps: boolean;
        feeReceiver: string;
    };
}

export interface DataApiResponse {
    routeSummary: RouteSummary;
    route: Route[][];
    routerAddress: string;
}

export interface QuoteApiResponse {
    code: string;
    message: string;
    data: DataApiResponse;
}

export interface SwapApiResponse {
    code: number;
    message: string;
    data: {
      amountIn: string;
      amountInUsd: string;
      amountOut: string;
      amountOutUsd: string;
      gas: string;
      gasUsd: string;
      outputChange: {
        amount: string;
        percent: number;
        level: number;
      };
      data: string;
      routerAddress: string;
    };
   }

export enum Chains {
    ARBITRUM = "arbitrum",
    ETHEREUM = "ethereum"
}