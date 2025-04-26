"use client";

import { RootState } from '@/store';
import { useLazyGetAllCategoriesWithServiceQuery } from '@/store/api/serviceApi';
import { toggleCategoryId, toggleService } from '@/store/slices/schedules/CreateAppointmentSlice';
import { setServiceCategory } from '@/store/slices/serviceCategory/ServiceCategorySlice';
import { faChevronDown, faChevronUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Service } from 'libs/types/ServiceCategory';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function AppointmentServiceSelector() {
    const dispatch = useDispatch();
    const selectedServices = useSelector((state: RootState) => state.appointment.selectedServices);
    const serviceCategory = useSelector((state: RootState) => state.serviceCategory);

    const [trigger] = useLazyGetAllCategoriesWithServiceQuery();

    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (!serviceCategory || Object.keys(serviceCategory).length === 0) {
            const toastId = toast.loading("Loading categories with services....");

            trigger()
                .unwrap()
                .then((response) => {
                    const normalizedCategories = response.categories.reduce((acc: any, category: any) => {
                        acc[category.categoryId] = category;
                        return acc;
                    }, {});

                    dispatch(setServiceCategory(normalizedCategories));
                    toast.success("Categories with services loaded!", { id: toastId });
                })
                .catch(() => {
                    toast.error("Failed to load services 😢", { id: toastId });
                });
        }
    }, [serviceCategory]);

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleServiceToggle = (service: Service, categoryId: string) => {
        dispatch(toggleService(service));
        dispatch(toggleCategoryId(categoryId));
    }

    return (
        <div className="w-full">
            <p className="text-2xl font-bold mb-6 text-gray-800">Customize Your Appointment – Choose a Service</p>
            <div className="space-y-4">
                {serviceCategory && Object.values(serviceCategory).length > 0 ? (
                    Object.values(serviceCategory).map((category) => {
                        const isExpanded = expandedCategories[category.categoryId] ?? false;

                        return (
                            <div key={category.categoryId} className="rounded-lg border border-gray-200 shadow-sm">
                                {/* Category Title */}
                                <div
                                    className="flex justify-between items-center px-5 py-4 pb-2 cursor-pointer rounded-lg"
                                    onClick={() => toggleCategory(category.categoryId)}
                                >
                                    <h2 className="text-lg font-semibold text-[#d18800]">
                                        {category.name}
                                        <span className="text-sm text-gray-500">({category.services.length})</span>
                                    </h2>

                                    <FontAwesomeIcon
                                        icon={isExpanded ? faChevronUp : faChevronDown}
                                        className="text-[#d18800]"
                                    />
                                </div>

                                {/* Services under this Category */}
                                {isExpanded && (
                                    <div className="p-4 pt-0 space-y-1">
                                        <div className="flex-1 h-px bg-[#f4ca67]"></div>

                                        {category.services.map((service) => {
                                            if (!service) return null;

                                            const isSelected = selectedServices.some(s => s.serviceId === service.serviceId);

                                            return (
                                                <ServiceCard
                                                    key={service.serviceId}
                                                    service={service}
                                                    selected={isSelected}
                                                    onClick={() => handleServiceToggle(service, category.categoryId)} />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div>No Categories Found!!</div>
                )}
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
        <div onClick={onClick} className="p-3 transition-shadow border-b w-full border-gray-200 cursor-pointer hover:shadow-lg hover:bg-[#fff3e0]">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <div className="text-sm px-3 py-1 rounded-full bg-[#f4ca67] text-gray-700 font-medium">
                    {duration}
                </div>
            </div>
            <div className="text-md font-medium text-gray-700 mt-1">{price} kr.</div>

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
