const storage = window.localStorage;

export const setItem = (key, value) => {
    try {
        storage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
};

export const getItem = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key);
        if(!storedValue) return defaultValue;
        return JSON.parse(storedValue);
    } catch (e) {
        return defaultValue;
    }
};