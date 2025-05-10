import Navbar from '@/components/common/MainNavbar';
import ManageProfile from '@/components/profile/ManageProfile';
import ViewAppointment from '@/components/profile/ViewAppointment';
import React from 'react';

function Profile() {
    return (
        <>
            <Navbar />

            <div className="mt-16 px-4 grid gap-2 h-[90vh] overflow-hidden grid-cols-1 md:grid-cols-5">
                {/* manage profile */}
                <div className="md:col-span-3 h-full overflow-auto px-4 ">
                    <ManageProfile/>
                </div>

                {/* view appointments */}
                <div className="md:col-span-2 h-full overflow-auto px-4 border-1 rounded-md">
                    <ViewAppointment />
                </div>
            </div>
        </>
    );
}

export default Profile;
