import * as ApiService from "./apiHandler.ts"
import {ApiObject, FilterObject, SignInObject} from "../interfaces/api.ts";

export const getProductsService = async (currentPage: number, currentLimit: number, obj: FilterObject) => {
    const apiObject: ApiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = false
    apiObject.endpoint = `products?page=${currentPage}&limit=${currentLimit}`
    apiObject.body = obj
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
    apiObject.authentication = true
    apiObject.endpoint = `products`
    apiObject.multipart = true
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const updateProductService = async (obj: FormData, productId: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "PATCH"
    apiObject.authentication = true
    apiObject.endpoint = `products/${productId}`
    apiObject.multipart = true
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const deleteProductService = async (productId: string | undefined) => {
    const apiObject: ApiObject = {}
    apiObject.method = "DELETE"
    apiObject.authentication = true
    apiObject.endpoint = `products/${productId}`
    return await ApiService.callApi(apiObject);
}

export const signinService = async (obj: SignInObject) => {
    const apiObject: ApiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = false
    apiObject.endpoint = `users/signIn`
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const getOrderService = async (page: number, limit: number) => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = true
    apiObject.endpoint = `orders?page=${page}&limit=${limit}`
    return await ApiService.callApi(apiObject);
}

export const getOrderDetailsService = async (orderId: string | undefined) => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = true
    apiObject.endpoint = `orders/${orderId}`
    return await ApiService.callApi(apiObject);
}

export const updateOrderStatusService = async (status: string, orderId: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "PATCH"
    apiObject.authentication = true
    apiObject.endpoint = `orders/${orderId}/status?orderStatus=${status}`
    return await ApiService.callApi(apiObject);
}
