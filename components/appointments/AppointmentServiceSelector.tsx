"use client";

import { RootState } from '@/store';
import { useGetAllServicesQuery, useLazyGetAllServicesQuery } from '@/store/api/serviceApi';
import { toggleService } from '@/store/slices/CreateAppointmentSlice';
import { setMultipleServices } from '@/store/slices/ServiceSlice';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Service } from 'libs/types/common';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function AppointmentServiceSelector() {
    // const [services, setServices] = useState<Service[]>([])

    const dispatch = useDispatch();
    const selectedServices = useSelector((state: RootState) => state.appointment.selectedServices);
    const services = useSelector((state: RootState) => state.services);

    const [trigger, { data, isLoading, error }] = useLazyGetAllServicesQuery();

    useEffect(() => {
        if (!services || services.length === 0) {
            const toastId = toast.loading("Loading services...");

            trigger({})
                .unwrap()
                .then((response) => {
                    dispatch(setMultipleServices(response.services));
                    toast.success("Services loaded!", { id: toastId });
                })
                .catch(() => {
                    toast.error("Failed to load services 😢", { id: toastId });
                });
        }
    }, [services, trigger, dispatch]);
    return (
        <div className='w-full'>
            <p className="text-2xl font-bold mb-4">Customize Your Appointment – Choose a Service</p>
            <div>
                {services ? services.map((service, index) => {
                    const isSelected = selectedServices.some(s => s.name === service.name);

                    return (
                        <ServiceCard
                            key={index}
                            service={service}
                            selected={isSelected}
                            onClick={() => dispatch(toggleService(service))} />
                    );
                }) : <div>No Services Found!!</div>}
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
    const { name, price, duration } = service;

    return (
        <div onClick={onClick} className="m-2 p-5 transition-shadow border-b border-gray-200 cursor-pointer hover:shadow-lg hover:bg-[#fff3e0]"        >
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
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
