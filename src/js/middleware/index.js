
const tokenExist = () => {
    let tokenAndUserId = localStorage.getItem('token');
    if (tokenAndUserId) {
        return true;
    }
    return false;
}
export function forbiddenRequestsMiddleware(storeAPI) {
    return function (next) {
        return function (action) {
            //TODO - add missing impl
            if (!tokenExist) return storeAPI.dispatch(action);
            return next(action);
        };
    };
}