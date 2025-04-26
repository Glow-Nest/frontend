import Cookies from "js-cookie";

export function GetFromCookies(value : string) {
    const token = Cookies.get(value);

    if (!token) {
        console.log(" Token Not Found");
    }

    return token;
}