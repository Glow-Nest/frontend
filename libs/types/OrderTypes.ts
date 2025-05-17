
export type Order = {
    clientId: string;
    totalPrice: number;
    pickupDate: string;
    orderItems: OrderItem[];
}

export type OrderItem = {
    quantity: number;
    priceWhenOrdering: number;
    productId: string;
}