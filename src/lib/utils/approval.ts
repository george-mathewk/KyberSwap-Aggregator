import {ethers} from "ethers";
import ERC20ABI from "../abis/erc20.json";
import { JsonRpcSigner } from "ethers";


export async function getTokenApproval(
    tokenInAddress: string,
    routerAddress: string,
    amount: number,
    signer: JsonRpcSigner
    ) {

    const signerAddress = await signer.getAddress();
    
    const tokenContract = new ethers.Contract(tokenInAddress, ERC20ABI, signer);
    
    const limitOrderContractAllowance = await tokenContract.allowance(signerAddress, routerAddress);
    
    
    if (Number(limitOrderContractAllowance) < amount) {
        try {
            const approvalTx = await tokenContract.approve(
                routerAddress, 
                BigInt(amount)
                )
            await approvalTx.wait();
        }catch(error) {
            console.error(error);
            throw(error)
        }
    }; 
    

};