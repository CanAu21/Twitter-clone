// local storage kaydetme
export const setLocal = (key,value) => {
    // stringe çevirme
    const strData = JSON.stringify(value);
    // locale kaydeder
    localStorage.setItem(key,strData);
};


// localden veri çekme
export const getLocal = (key) => {
    // localden veriye eriş
    const strData = localStorage.getItem(key);
    // fonksiyonun çağrıldığı yere döner
    return JSON.parse(strData);
};