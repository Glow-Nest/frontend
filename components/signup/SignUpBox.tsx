'use client';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../common/css/buttonSweep.css';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import InputFields from './InputFields';
import ContinueWithButton from './ContinueWithButton';

export default function SignUpBox() {
    const [showEmailForm, setShowEmailForm] = useState(false);

    return (
        <div className="bg-white shadow-md rounded-lg border border-gray-200  
                h-[90vh] sm:h-[80vh] md:h-[75vh] lg:h-[80vh] 
                w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[35vw] 
                m-auto mt-10 
                flex flex-col gap-1 items-center 
                p-6 sm:p-8 overflow-hidden">

            <span className="text-2xl sm:text-3xl font-semibold text-center mb-5">
                Create Your Account
            </span>


            <AnimatePresence mode="wait">
                {showEmailForm ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <InputFields onEmailClick={() => setShowEmailForm(false)} />

                    </motion.div>
                ) : (
                    <motion.div
                        key="buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col items-center space-y-4">
                        <p className="text-center text-sm text-gray-600">
                            By creating an account, you confirm that the information provided is accurate
                            and that you are responsible for your activity on the platform.
                        </p>


                        <ContinueWithButton onEmailClick={() => setShowEmailForm(true)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
