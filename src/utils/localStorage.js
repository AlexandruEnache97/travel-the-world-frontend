/* eslint-disable no-console */
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getFromLocalStorage = (name) => {
  try {
    const localState = localStorage.getItem(name);
    if (!localState) return undefined;
    return JSON.parse(localState);
  } catch (error) {
    return null;
  }
};

export const removeFromLocalStorage = (name) => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.log(error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
