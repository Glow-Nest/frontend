"use client";

import { RootState } from '@/store';
import { useGetServicesMutation } from '@/store/api/serviceApi';
import { toggleService } from '@/store/slices/CreateAppointmentSlice';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const tempServices: Service[] = [
    {
        serviceId: "1", serviceName: "Service1", price: "150 DKK", duration: "30 min",
        description: '',
        mediaUrlList: []
    },
    {
        serviceId: "2", serviceName: "Service2", price: "150 DKK", duration: "30 min",
        description: '',
        mediaUrlList: []
    },
    {
        serviceId: "3", serviceName: "Service3", price: "150 DKK", duration: "30 min",
        description: '',
        mediaUrlList: []
    },
    {
        serviceId: "4", serviceName: "Service4", price: "150 DKK", duration: "30 min",
        description: '',
        mediaUrlList: []
    },
    {
        serviceId: "5", serviceName: "Service5", price: "150 DKK", duration: "30 min",
        description: '',
        mediaUrlList: []
    },
];

function AppointmentServiceSelector() {
    const [services, setServices] = useState<Service[]>([])

    const dispatch = useDispatch();
    const selectedServices = useSelector((state: RootState) => state.appointment.selectedServices);

    const [getServices, { isLoading }] = useGetServicesMutation();

    useEffect(() => {
      getServices({});
    }, [])


    return (
        <div className='w-full'>
            <p className="text-2xl font-bold mb-4">Customize Your Appointment – Choose a Service</p>
            <div>
                {tempServices.map((service, index) => {
                    const isSelected = selectedServices.some(s => s.serviceName === service.serviceName);

                    return (
                        <ServiceCard
                            key={index}
                            service={service}
                            selected={isSelected}
                            onClick={() => dispatch(toggleService(service))} />
                    );
                })}
            </div>
        </div>
    );
}

function ServiceCard({
    service,
    selected,
    onClick
}: {
    service: Service;
    selected: boolean;
    onClick: () => void;
}) {
    const { serviceName, price, duration } = service;

    return (
        <div onClick={onClick} className="m-2 p-5 transition-shadow border-b border-gray-200 cursor-pointer hover:shadow-lg hover:bg-[#fff3e0]"        >
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">{serviceName}</h3>
                <div className="text-sm px-3 py-1 rounded-full bg-[#f4ca67] text-gray-700 font-medium">
                    {duration}
                </div>


            </div>
            <div className="text-md font-medium text-gray-700 mt-1">{price}</div>

            {selected && (
                <div className='flex items-center text-xs gap-2 mt-1 text-green-700'>
                    <FontAwesomeIcon icon={faCheck} />
                    <p>Added</p>
                </div>
            )}
        </div>
    );
}

export default AppointmentServiceSelector;
