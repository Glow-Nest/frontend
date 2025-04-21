import { notFound } from 'next/navigation';
import AppointmentContent from '@/components/appointments/AppointmentServiceSelector';
import AppointmentScheduler from '@/components/appointments/AppointmentScheduler';
import AppointmentConfirmation from '@/components/appointments/AppointmentConfirmation';

const steps = ['services', 'datetime', 'confirmation'] as const;
type Step = typeof steps[number];

export default async function StepPage(props: { params: Promise<{ step: string }> }) {
    const params = await props.params;
    const currentStep = params.step as Step;


    if (!steps.includes(currentStep)) return notFound();

    switch (currentStep) {
        case 'services':
            return <AppointmentContent />;
        case 'datetime':
            return <AppointmentScheduler />;
        case 'confirmation':
            return <AppointmentConfirmation />;
        default:
            return notFound();
    }
}
