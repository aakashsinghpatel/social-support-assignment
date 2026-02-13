
/* saveToStorage <key,data>
* Method to save data to localstorage based on key
*/
export const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to storage", error);
  }
};

/* loadFromStorage <key>
* Method to get data from localstorage based on key
*/
export const loadFromStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading from storage", error);
    return undefined;
  }
};

/* clearStorage
* Method to clear/remover all data from localStorage
*/
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing storage", error);
  }
};

/* loadAllStepsData
* Method to load all form data from localStorage
*/
export const loadAllStepsData = () => {
  return {
    personalDetails: loadFromStorage("personalDetails") || null,
    familyFinanceDetails: loadFromStorage("familyFinanceDetails") || null,
    situationDetails: loadFromStorage("situationDetails") || null,
  };
};
