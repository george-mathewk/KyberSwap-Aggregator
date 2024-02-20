import { JsonRpcSigner } from "ethers";
import axios from "axios";
import { getTokenApproval } from "./utils/approval";
import { API,ETH_ADDRESS } from "./constants/api";
import { QuoteApiResponse, DataApiResponse, SwapApiResponse, Chains } from "./types";
import { ISwapper } from "./swapper.interface";

export class Swapper implements ISwapper {
    private signer: JsonRpcSigner;

    constructor(signer: JsonRpcSigner) {
        this.signer = signer;
    }

    async quote(
        tokenIn: string,
        tokenOut: string,
        amount: string
    ): Promise<DataApiResponse> {
        const targetPathConfig = {
            params: {
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                amountIn: amount
            }
        };

        try {
            const { data } = await axios.get<QuoteApiResponse>(
                API.quote(Chains.ETHEREUM),
                targetPathConfig
            );
            return data.data;

        } catch (error) {
            console.error(error);
            throw (error);
        };
    }


    async swap(
        tokenIn: string,
        tokenOut: string,
        amount: string
    ): Promise<string> {

        const swapData = await this.quote(tokenIn, tokenOut, amount);
        const routeSummary = swapData.routeSummary;

        const requestBody = {
            routeSummary: routeSummary,
            sender: await this.signer.getAddress(),
            recipient: await this.signer.getAddress(),
            slippageTolerance: 10
        };

        try {
            const { data } = await axios.post<SwapApiResponse>(
                API.swap(Chains.ETHEREUM),
                requestBody
            );
            const calldata = data.data.data;

            if (tokenIn != ETH_ADDRESS) {
                await getTokenApproval(
                    tokenIn,
                    data.data.routerAddress,
                    Number(amount),
                    this.signer
                );
                const tx = await this.signer.sendTransaction(await this.signer.populateTransaction({
                    to: data.data.routerAddress,
                    from: await this.signer.getAddress(),
                    data: calldata,
                }));
                return tx.hash;
            } else {
                const tx = await this.signer.sendTransaction(await this.signer.populateTransaction({
                    to: data.data.routerAddress,
                    from: await this.signer.getAddress(),
                    data: calldata,
                    value: amount,
                }));
                return tx.hash;
            }

        } catch (error) {
            console.error(error);
            throw (error);
        }
    }
}