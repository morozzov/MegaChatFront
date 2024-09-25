import jwtDecode from "jwt-decode";

export const isTokenValid = (token) => {
    
    if (!token) {
        return false;
    }

    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
        return false;
    }

    const currentTime = Date.now() / 1000;

    return decodedToken.exp > currentTime;
};
