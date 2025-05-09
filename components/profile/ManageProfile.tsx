"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useUpdateFullNameMutation, useUpdatePhoneNumberMutation, useUpdatePasswordMutation } from "@/store/api/clientApi";
import { updateUser } from "@/store/slices/user/UserSlice";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Pen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ManageProfile() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [isEditingField, setIsEditingField] = useState<string | null>(null);

    const [firstName, setFirstName] = useState(user?.firstName ?? "");
    const [lastName, setLastName] = useState(user?.lastName ?? "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showEmailTooltip, setShowEmailTooltip] = useState(false);
    
    // Field errors state
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [updateFullName, { isLoading: isLoadingName }] = useUpdateFullNameMutation();
    const [updatePhoneNumber, { isLoading: isLoadingPhone }] = useUpdatePhoneNumberMutation();
    const [updatePassword, { isLoading: isLoadingPassword }] = useUpdatePasswordMutation();

    // Clear errors when opening edit form
    const handleEdit = (field: string) => {
        setErrors({});
        
        switch (field) {
            case "name":
                setFirstName(user?.firstName ?? "");
                setLastName(user?.lastName ?? "");
                break;
            case "phone":
                setPhoneNumber(user?.phoneNumber ?? "");
                break;
            case "password":
                setNewPassword("");
                setConfirmPassword("");
                setShowPassword(false);
                setShowConfirmPassword(false);
                break;
        }
        
        setIsEditingField(field);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const handleSave = async (field: string) => {
        if (!user?.id) return;
        setErrors({});

        // Client-side validation for password field
        if (field === "password" && newPassword !== confirmPassword) {
            setErrors({ password: "Passwords do not match" });
            return;
        }

        try {
            switch (field) {
                case "name":
                    await toast.promise(
                        updateFullName({ Id: user.id, FirstName: firstName, LastName: lastName }).unwrap(),
                        {
                            loading: "Updating name...",
                            success: () => {
                                // Update Redux state after successful API call
                                dispatch(updateUser({ firstName, lastName }));
                                setIsEditingField(null);
                                return "Name updated successfully";
                            },
                            error: (err) => {
                                const errorMessage = extractErrorMessage(err);
                                return errorMessage || "Failed to update name";
                            }
                        }
                    );
                    break;

                case "phone":
                    await toast.promise(
                        updatePhoneNumber({ Id: user.id, PhoneNumber: phoneNumber }).unwrap(),
                        {
                            loading: "Updating phone number...",
                            success: () => {
                                // Update Redux state after successful API call
                                dispatch(updateUser({ phoneNumber }));
                                setIsEditingField(null);
                                return "Phone number updated successfully";
                            },
                            error: (err) => {
                                const errorMessage = extractErrorMessage(err);
                                return errorMessage || "Failed to update phone number";
                            }
                        }
                    );
                    break;

                case "password":
                    await toast.promise(
                        updatePassword({ Id: user.id, NewPassword: newPassword, ConfirmPassword: confirmPassword }).unwrap(),
                        {
                            loading: "Updating password...",
                            success: () => {
                                setNewPassword("");
                                setConfirmPassword("");
                                setIsEditingField(null);
                                return "Password updated successfully";
                            },
                            error: (err) => {
                                const errorMessage = extractErrorMessage(err);
                                return errorMessage || "Failed to update password";
                            }
                        }
                    );
                    break;
            }
        } catch (err: any) {
            console.error("Update failed:", err);
            
            // Process field-specific errors
            const fieldErrors: { [key: string]: string } = {};
            
            if (err?.data?.length) {
                err.data.forEach((e: any) => {
                    if (field === "name") {
                        if (e.errorId?.includes("FirstName")) fieldErrors.firstName = e.message;
                        if (e.errorId?.includes("LastName")) fieldErrors.lastName = e.message;
                    } else if (field === "phone") {
                        if (e.errorId?.includes("Phone")) fieldErrors.phoneNumber = e.message;
                    } else if (field === "password") {
                        if (e.errorId?.includes("Password")) fieldErrors.password = e.message;
                    }
                });
            } else if (err?.data?.title || err?.data?.message) {
                // Handle single error message format
                const message = err?.data?.message || err?.data?.title;
                fieldErrors[field] = message;
            }
            
            setErrors(fieldErrors);
        }
    };

    // Helper function to extract error messages from API response
    const extractErrorMessage = (err: any): string => {
        if (err?.data?.length) {
            return err.data.map((e: any) => e.message).join("\n");
        }
        return err?.data?.message || err?.data?.title || err?.error || "Something went wrong";
    };

    const getInputClassName = (fieldName: string) => {
        return `px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dba052] ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
    };

    return (
        <div className="max-w-3xl mx-auto mb-5 mt-14 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-center">Manage Profile</h2>

            <div className="space-y-6">
                {/* Email Field */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                    <div className="relative">
                        <input
                            type="email"
                            disabled
                            value={user?.email ?? ""}
                            className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed"
                            onMouseEnter={() => setShowEmailTooltip(true)}
                            onMouseLeave={() => setShowEmailTooltip(false)}
                        />
                        {showEmailTooltip && (
                            <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white px-3 py-1 rounded text-sm z-10">
                                Email cannot be changed
                            </div>
                        )}
                    </div>
                </div>

                {/* Full Name Fields */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700 font-semibold">Full Name</label>
                        {isEditingField !== "name" && (
                            <button 
                                onClick={() => handleEdit("name")} 
                                className="text-[#dba052] hover:text-[#c2904a] transition-colors cursor-pointer"
                            >
                                <Pen className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    
                    
                    {isEditingField === "name" ? (
                        <div className="space-y-4">
                            <div className="flex gap-4 flex-wrap">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm text-gray-600 mb-1">First Name</label>
                                    <input 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        className={getInputClassName("firstName")}
                                        placeholder="First Name" 
                                    />
                                    <div className="text-xs text-red-500 mt-1 h-5">
                                        {errors.firstName || ' '}
                                    </div>
                                </div>
                                
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                                    <input 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        className={getInputClassName("lastName")}
                                        placeholder="Last Name" 
                                    />
                                    <div className="text-xs text-red-500 mt-1 h-5">
                                        {errors.lastName || ' '}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-2">
                                <button 
                                    onClick={() => setIsEditingField(null)} 
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                                    disabled={isLoadingName}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => handleSave("name")} 
                                    disabled={isLoadingName}
                                    className="px-4 py-2 bg-[#dba052] text-white rounded-md hover:bg-[#c2904a] transition-colors cursor-pointer"
                                >
                                    {isLoadingName ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4 flex-wrap">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm text-gray-600 mb-1">First Name</label>
                                <input 
                                    type="text" 
                                    value={user?.firstName || ""}
                                    readOnly
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md"
                                />
                            </div>
                            
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                                <input 
                                    type="text" 
                                    value={user?.lastName || ""}
                                    readOnly
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Phone Number Field */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700 font-semibold">Phone Number</label>
                        {isEditingField !== "phone" && (
                            <button 
                                onClick={() => handleEdit("phone")} 
                                className="text-[#dba052] hover:text-[#c2904a] transition-colors cursor-pointer"
                            >
                                <Pen className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    
                    {isEditingField === "phone" ? (
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <input 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    className={getInputClassName("phoneNumber")}
                                    placeholder="Phone Number" 
                                />
                                <div className="text-xs text-red-500 mt-1 h-5">
                                    {errors.phoneNumber || ' '}
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-2">
                                <button 
                                    onClick={() => setIsEditingField(null)} 
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                                    disabled={isLoadingPhone}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => handleSave("phone")} 
                                    disabled={isLoadingPhone}
                                    className="px-4 py-2 bg-[#dba052] text-white rounded-md hover:bg-[#c2904a] transition-colors cursor-pointer"
                                >
                                    {isLoadingPhone ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <input 
                                type="text" 
                                value={user?.phoneNumber || "No phone number added"}
                                readOnly
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md"
                            />
                        </div>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700 font-semibold">Password</label>
                        {isEditingField !== "password" && (
                            <button 
                                onClick={() => handleEdit("password")} 
                                className="text-[#dba052] hover:text-[#c2904a] transition-colors cursor-pointer"
                            >
                                <Pen className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    
                    {isEditingField === "password" ? (
                        <div className="space-y-4">
                            <div className="flex gap-4 flex-wrap">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm text-gray-600 mb-1">New Password</label>
                                    <div className="relative">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            value={newPassword} 
                                            onChange={(e) => setNewPassword(e.target.value)} 
                                            className={`${getInputClassName("password")} w-full pr-10`}
                                            placeholder="New Password" 
                                        />
                                        <button 
                                            type="button" 
                                            onClick={togglePasswordVisibility} 
                                            className="absolute top-0 right-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                            className={`${getInputClassName("password")} w-full pr-10`}
                                            placeholder="Confirm Password" 
                                        />
                                        <button 
                                            type="button" 
                                            onClick={toggleConfirmPasswordVisibility} 
                                            className="absolute top-0 right-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-xs text-red-500 mt-1 h-5">
                                {errors.password || ' '}
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-2">
                                <button 
                                    onClick={() => setIsEditingField(null)} 
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                                    disabled={isLoadingPassword}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => handleSave("password")} 
                                    disabled={isLoadingPassword}
                                    className="px-4 py-2 bg-[#dba052] text-white rounded-md hover:bg-[#c2904a] transition-colors cursor-pointer"
                                >
                                    {isLoadingPassword ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <input 
                                type="password" 
                                value="••••••••"
                                readOnly
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageProfile;