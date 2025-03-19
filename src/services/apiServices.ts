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

export const createNewProductService = async (obj: FormData) => {
    const apiObject: ApiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = false
    apiObject.endpoint = `products`
    apiObject.multipart = true
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const updateProductService = async (obj: FormData, productId: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "PATCH"
    apiObject.authentication = false
    apiObject.endpoint = `products/${productId}`
    apiObject.multipart = true
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const deleteProductService = async (productId: string | undefined) => {
    const apiObject: ApiObject = {}
    apiObject.method = "DELETE"
    apiObject.authentication = false
    apiObject.endpoint = `products/${productId}`
    return await ApiService.callApi(apiObject);
}
