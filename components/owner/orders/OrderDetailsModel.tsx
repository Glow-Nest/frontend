import { useMarkOrderAsCancelledMutation, useMarkOrderAsCompletedMutation, useMarkOrderAsReadyForPickupMutation } from '@/store/api/orderApi';
import { extractFirstErrorMessage } from 'libs/helpers';
import { OrderResponseDto } from 'libs/types/OrderTypes';
import { BadgeCheck, CalendarDays, CheckCircle2, DollarSign, Truck, User, X, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function OrderDetailsModal({
    order,
    onClose,
}: {
    order: OrderResponseDto;
    onClose: () => void;
}) {
    const [markOrderAsReadyForPickup] = useMarkOrderAsReadyForPickupMutation();
    const [markOrderAsCompleted] = useMarkOrderAsCompletedMutation();
    const [markOrderAsCancelled] = useMarkOrderAsCancelledMutation();

    const onUpdateStatus = async (status: string) => {
        const toastId = toast.loading("Making changes to order...");

        try {

            switch (status) {
                case "ReadyForPickup":
                    await markOrderAsReadyForPickup(order.orderId).unwrap();
                    toast.success("Order changed to Ready for Pickup!", { id: toastId });
                    break;

                case "Completed":
                    await markOrderAsCompleted(order.orderId).unwrap();
                    toast.success("Order changed to Completed!", { id: toastId });
                    break;

                case "Cancelled":
                    await markOrderAsCancelled(order.orderId).unwrap();
                    toast.success("Order changed to Cancelled!", { id: toastId });
                    break;

                default:
                    toast.error("Unsupported status update.", { id: toastId });
                    return;
            }
        } catch (error) {
            const msg = extractFirstErrorMessage(error, "Failed to update order.");
            toast.error(msg, { id: toastId });
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-md rounded-2xl p-6 border bg-white shadow-xl text-black">
                <button onClick={onClose} className="absolute top-3 right-3 text-black hover:text-red-900">
                    <X size={20} />
                </button>

                <h2 className="text-lg font-semibold mb-4">
                    Order <span className="text-amber-400 font-bold">#{order.orderId}</span>
                </h2>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-blue-900" />
                        <span><span className="text-black">Date:</span> {order.orderDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-purple-900" />
                        <span><span className="text-black">Pickup:</span> {order.pickupDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-teal-900" />
                        <span><span className="text-black">Customer:</span> {order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BadgeCheck size={16} className="text-green-900" />
                        <span><span className="text-black">Status:</span> {order.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-yellow-900" />
                        <span><span className="text-black">Total:</span> {order.totalPrice} DKK</span>
                    </div>
                </div>

                <hr className="my-4 border-white/30" />

                <div>
                    <h3 className="text-sm font-semibold mb-2">Items</h3>
                    <ul className="space-y-1 text-sm">
                        {order.orderItems.map((item, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{item.productName}</span>
                                <span>{item.quantity} × {item.priceWhenOrdering} DKK</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- Status Update Buttons --- */}
                <div className="mt-6 flex gap-2 justify-end">
                    {/* ready for pickup button */}
                    <button
                        onClick={() => onUpdateStatus('ReadyForPickup')}
                        disabled={order.status !== 'Paid'}
                        className={`flex items-center cursor-pointer gap-1 px-3 py-1.5 text-sm rounded transition
            ${order.status === 'Paid'
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
        `}
                    >
                        <Truck size={16} />
                        Ready for Pickup
                    </button>

                    {/* completed button */}
                    <button
                        onClick={() => onUpdateStatus('Completed')}
                        disabled={order.status !== 'ReadyForPickup'}
                        className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded transition cursor-pointer
            ${order.status === 'ReadyForPickup'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
        `}
                    >
                        <CheckCircle2 size={16} />
                        Mark Completed
                    </button>

                    {/* cancel button */}
                    <button
                        onClick={() => onUpdateStatus('Cancelled')}
                        disabled={order.status === 'Completed' || order.status === 'Cancelled'}
                        className={`flex cursor-pointer items-center justify-center gap-1 px-3 py-1.5 text-sm rounded transition
            ${order.status === 'Completed' || order.status === 'Cancelled'
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }
        `}
                    >
                        <XCircle size={16} />
                        Cancel Order
                    </button>
                </div>

            </div>


        </div>
    );
}
