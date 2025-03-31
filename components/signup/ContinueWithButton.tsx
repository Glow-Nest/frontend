'use client';

import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ContinueWithButton({ onEmailClick }: { onEmailClick: () => void }) {
    const buttonData = [
        {
            icon: faGoogle,
            text: 'Continue with Google',
            onClick: () => {
                console.log('Google sign-in clicked');
            },
        },
        {
            icon: faEnvelope,
            text: 'Continue with Email',
            onClick: onEmailClick,
        },
        {
            icon: faApple,
            text: 'Continue with Apple',
            onClick: () => {
                console.log('Apple sign-in clicked');
            },
        },
    ];


    return (
        <>
            {buttonData.map(({ icon, text, onClick }, index) => (
                <button
                    key={index}
                    onClick={onClick}
                    className="btn-sweep w-68 flex items-center justify-center gap-3 px-6 py-3 
                     border text-sm font-medium bg-white transition duration-300 cursor-pointer"
                >
                    <FontAwesomeIcon icon={icon} />
                    <span>{text}</span>
                </button>
            ))}
        </>
    );
}

export default ContinueWithButton;
