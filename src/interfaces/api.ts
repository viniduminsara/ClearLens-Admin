import {Address, Order, Product, ResponseProduct, UserObject} from "./user.ts";

export interface ApiObject {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: Record<string, unknown> | SignInObject | SignUpObject | Address | Order | FormData | FilterObject;
    authentication?: boolean;
    urlEncoded?: boolean;
    multipart?: boolean;
    toast?: boolean;
    loading?: boolean;
    state?: "login" | "renewToken";
}

export interface ApiResponse {
    success: boolean;
    statusCode?: number;
    message?: string;
    body: Product | Product[] | UserObject | TokenResponse | PaginatedProductResponse | PaginatedOrderResponse | PaginatedUserResponse | Address[] | OrderWithHash | Order | DashboardData | ResponseProduct
}

export interface TokenResponse {
    user: UserObject;
    token: string;
}

export interface PaginatedProductResponse {
    docs: Product[];
    totalPages: number;
    totalDocs: number;
}

export interface PaginatedOrderResponse {
    docs: Order[];
    totalPages: number;
    totalDocs: number;
}

export interface PaginatedUserResponse {
    docs: UserObject[];
    totalPages: number;
    totalDocs: number;
}

export interface ChartDataItem {
    month: string;
    sales: number;
}

export interface DashboardData {
    salesCount: number;
    ordersCount: number;
    customersCount: number;
    chartData: ChartDataItem[];
}

export interface SignUpObject {
    username: string;
    email: string;
    password: string;
}

export interface SignInObject {
    username: string;
    password: string;
}

export interface OrderWithHash {
    order: Order;
    hash: string;
}

export interface FilterObject {
    sort: string;
    gender: string;
    categories: string[];
    minPrice: number;
    maxPrice: number;
}
