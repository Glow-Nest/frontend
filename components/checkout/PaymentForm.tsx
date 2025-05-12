import React, { useState } from 'react';

type PaymentFormProps = {
    onBack: (step: number) => void;
};

function PaymentForm({ onBack }: PaymentFormProps) {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handleConfirm = () => {
        alert('Payment confirmed!');
    };

    return (
        <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Card Payment</h2>

            <div className="space-y-4">
                {/* Cardholder Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    />
                </div>

                {/* Card Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                        inputMode="numeric"
                        maxLength={19}
                    />
                </div>

                {/* Expiry and CVV Row */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                            type="password"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                            maxLength={4}
                        />
                    </div>
                </div>
            </div>

            {/* Button Row */}
            <div className="flex justify-between gap-4 pt-2">
                <button
                    onClick={() => onBack(1)}
                    className="w-1/2 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
                >
                    ← Back
                </button>

                <button
                    onClick={handleConfirm}
                    className="w-1/2 bg-amber-500 cursor-pointer hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition"
                >
                    Confirm & Pay
                </button>
            </div>
        </div>
    );
}

export default PaymentForm;
