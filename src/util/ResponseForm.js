export const commonResponse = (pureResponse, code = 0, message = 'ok') => {
    return {
        code: code,
        message: message,
        data: pureResponse
    }
}