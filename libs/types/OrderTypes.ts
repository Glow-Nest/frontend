
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

export type OrderItemResponseDto = {
    productId: string;
    productName: string;
    quantity: string;
    priceWhenOrdering: string;
};

export type OrderResponseDto = {
    orderId: string;
    orderDate: string;
    pickupDate: string;
    status: string;
    totalPrice: string;
    customerName: string;
    orderItems: OrderItemResponseDto[];
};