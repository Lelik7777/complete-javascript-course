import {TIME_TIMEOUT} from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const getJSON = async (url) => {
    try {
        const res = await Promise.race([fetch(url), timeout(TIME_TIMEOUT)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message}(Status:${res.status})`);
        return data;
    } catch (err) {
        //мне необходимо еще раз выбросить ошибку,чтобы ее можно было поймать  catch в следующем блоке try..catch,где будет вызывать эта ф-ция getJSON
        throw err;
    }

}

 export function toggle(el, nameClass) {
    el.classList.toggle(nameClass);
}



