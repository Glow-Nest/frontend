"use client";

import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import {
    CreditCard,
    Calendar,
    KeyRound,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    User,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; // or from "sonner"

type PaymentFormProps = {
    onBack: (step: number) => void;
    clientSecret: string;
};

function PaymentForm({ onBack, clientSecret }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [cardholderName, setCardholderName] = useState("");

    const handleConfirm = async () => {
        if (!stripe || !elements) return;

        if (!cardholderName.trim()) {
            toast.error("Please enter the cardholder name.");
            return;
        }

        setLoading(true);
        setErrorMsg("");
        setSuccess(false);

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) return;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: cardholderName,
                },
            },
        });

        if (result.error) {
            const message = result.error.message || "An error occurred during payment.";
            setErrorMsg(message);
            toast.error(message);
            setLoading(false);
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
            setSuccess(true);
            toast.success("Payment successful!");
            setLoading(false);
        }
    };

    const elementOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#1F2937",
                "::placeholder": {
                    color: "#9CA3AF",
                },
            },
            invalid: {
                color: "#EF4444",
            },
        },
    };

    const fieldClasses =
        "flex items-center gap-2 border border-gray-300 rounded-lg p-3 shadow-sm bg-white transition-all duration-300 ease-in-out hover:scale-[1.01]";

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-1">Card Payment</h2>

            {/* Success Message */}
            {success && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 p-3 rounded-md animate-pulse">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Payment successful!</span>
                </div>
            )}

            {/* Error Message */}
            {errorMsg && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-md">
                    <AlertTriangle className="w-5 h-5" />
                    <span>{errorMsg}</span>
                </div>
            )}

            {!success && (
                <>
                    <div className="space-y-4">
                        {/* Cardholder Name */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                            <div className={fieldClasses}>
                                <User className="w-5 h-5 text-amber-500" />
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    className="w-full focus:outline-none"
                                    value={cardholderName}
                                    onChange={(e) => setCardholderName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Card Number */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <div className={fieldClasses}>
                                <CreditCard className="w-5 h-5 text-amber-500" />
                                <CardNumberElement className="w-full" options={elementOptions} />
                            </div>
                        </div>

                        {/* Expiry and CVC */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <div className={fieldClasses}>
                                <Calendar className="w-5 h-5 text-amber-500" />
                                <CardExpiryElement className="w-full" options={elementOptions} />
                            </div>

                            <label className="block text-sm font-medium text-gray-700">CVC</label>
                            <div className={fieldClasses}>
                                <KeyRound className="w-5 h-5 text-amber-500" />
                                <CardCvcElement className="w-full" options={elementOptions} />
                            </div>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between gap-4 pt-4">
                        <button
                            onClick={() => onBack(1)}
                            className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200"
                            disabled={loading}
                        >
                            ← Back
                        </button>

                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className={`w-1/2 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Confirm & Pay"
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default PaymentForm;
