'use client';

import { faArrowLeft, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useState } from 'react'

import '@fortawesome/fontawesome-svg-core/styles.css';

function BackIcon() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="cursor-pointer flex items-center gap-1 text-sm uppercase" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <FontAwesomeIcon icon={isHovered ? faArrowLeft : faChevronLeft} className="transition-all duration-200 w-4" />
            <span>Back</span>
        </div>
    )
}

export default BackIcon