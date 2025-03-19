import * as ApiService from "./apiHandler.ts"
import {ApiObject} from "../interfaces/api.ts";

export const getProductsService = async (currentPage: number, currentLimit: number) => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = false
    apiObject.endpoint = `products?page=${currentPage}&limit=${currentLimit}`
    return await ApiService.callApi(apiObject);
}

export const getProductDetailsService = async (productId: string | undefined) => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = false
    apiObject.endpoint = `products/${productId}`
    return await ApiService.callApi(apiObject);
}
