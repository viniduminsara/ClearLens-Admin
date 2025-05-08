export interface Product {
    _id?: string;
    name: string;
    description: string;
    brand: string;
    category: string;
    gender: string;
    weight: string;
    quantity: number;
    image: File | null;
    rating?: number;
    price: number;
    newPrice: number;
    trending?: boolean;
}

export interface ResponseProduct {
    _id?: string;
    name: string;
    description: string;
    brand: string;
    category: string;
    gender: string;
    weight: string;
    quantity: number;
    image: string;
    rating?: number;
    price: number;
    newPrice: number;
    trending?: boolean;
}

export interface UserObject {
    id: string;
    username: string;
    email: string;
    cart: Product[];
    wishlist: Product[];
    role?: string;
}

export interface Address {
    _id?: string;
    fullName: string;
    mobileNumber: string;
    houseNo: string;
    street: string;
    city: string;
    postalCode: string;
}

export interface OrderItem {
    _id: string,
    name: string,
    image: string,
    price: number,
    newPrice: number,
    qty: number;
}

export interface Order {
    _id?: string;
    date: string;
    amount?: number;
    orderItems?: OrderItem[];
    status?: string;
    user?: UserObject;
    paymentStatus?: string;
}
