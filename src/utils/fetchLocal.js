export const fetchLocal = (localStorageItemName) => {
    const userInfo =
        localStorage.getItem(localStorageItemName) !== undefined
            ? JSON.parse(localStorage.getItem(localStorageItemName))
            : localStorage.clear()

    return userInfo;
}