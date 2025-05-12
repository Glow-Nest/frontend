
export type Order = {
    clientId: string;
    totalPrice: number;
    orderItems: OrderItem[];
}

export type OrderItem = {
    quantity: number;
    priceWhenOrdering: number;
    productId: string;
}