export const steps = ['services', 'datetime', 'confirmation'] as const;
export type Step = typeof steps[number];

export const getNextStep = (current: Step): Step | null => {
    const i = steps.indexOf(current);
    return i < steps.length - 1 ? steps[i + 1] : null;
};

export const getPrevStep = (current: Step): Step | null => {
    const i = steps.indexOf(current);
    return i > 0 ? steps[i - 1] : null;
};
