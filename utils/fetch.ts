import CONSTANTS from './constants';


export const getTokenPriceFromCoinGecko = async (id: string, currency: string) => {
    const response = await fetch(CONSTANTS.COINGECKO.BASE_URI + CONSTANTS.COINGECKO.PRICE_API({id, currency}), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    const result = (await response.json());
    return result[id][currency]
}
