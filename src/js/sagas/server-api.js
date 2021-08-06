export function* conversion(formData) {
    //TODO
    try {
        let { data } = yield call(
            post(`${SERVER_IP}conversion`, {
                ...formData
            })
        );
        yield put({type: actionTypes.CONVERSION_SUCCESS, data})
    } catch (error) {
        yield put({type: actionTypes.CONVERSION_ERROR, error})
    }
}
export function* withdrawal(formData) {
    //TODO
    try {
        let { data } = yield call(
            post(`${SERVER_IP}withdrawal`, {
                ...formData
            })
        );
        yield put({type: actionTypes.WITHDRAWAL_SUCCESS, data})
    } catch (error) {
        yield put({type: actionTypes.WITHDRAWAL_ERROR, error})
    }
}
