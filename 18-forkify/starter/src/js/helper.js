import {TIME_TIMEOUT} from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
//используем эту универсальную ф-цию вместо sendJson and getJson
//если uploadData нет, то обычный get request,иначе post request
export const AJAX = async (url, uploadData = undefined) => {
    try {
        const fetchPro = uploadData
            ? fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uploadData),
            })
            : fetch(url);

        let res = await Promise.race([fetchPro, timeout(TIME_TIMEOUT)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message}(Status:${res.status})`);

        return data;
    } catch (e) {
        throw e;
    }
}
// const resPromise = async (proFetch) => {
//     try {
//         const res = await Promise.race([proFetch, timeout(TIME_TIMEOUT)]);
//         const data = await res.json();
//
//         if (!res.ok) throw new Error(`${data.message}(Status:${res.status})`);
//         return data;
//     } catch (e) {
//         throw e;
//     }
//
// }
// export const getJSON = async (url) => {
//     try {
//         const proFetch = fetch(url);
//         return await resPromise(proFetch);
//     } catch (err) {
//         //мне необходимо еще раз выбросить ошибку,чтобы ее можно было поймать  catch в следующем блоке try..catch,где будет вызывать эта ф-ция getJSON
//         throw err;
//     }
//
// }
//
// export const sendJSON = async (url, recipeNew) => {
//     try {
//         const proFetch = await fetch(`${url}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(recipeNew),
//         });
//         return await resPromise(proFetch);
//     } catch (e) {
//         throw e;
//     }
// }


export function toggle(el, nameClass) {
    el.classList.toggle(nameClass);
}



