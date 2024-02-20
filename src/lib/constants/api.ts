const AGGREGATOR_DOMAIN = `https://aggregator-api.kyberswap.com`;
export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const API = {
    quote:(targetChain : string) => `${AGGREGATOR_DOMAIN}/${targetChain}/api/v1/routes`,
    swap: (targetChain: string) => `${AGGREGATOR_DOMAIN}/${targetChain}/api/v1/route/build`
};
