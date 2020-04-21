export const updateObject = (obj, newValues) => {
    return {
        ...obj,
        ...newValues,
    };
};
