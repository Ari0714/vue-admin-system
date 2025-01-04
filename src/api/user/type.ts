

export interface LoginFormData {
    username: string,
    password: string,
}

export interface ResponseData {
    code: number,
    message: string,
    status: string
}

export interface LoginResponseData extends ResponseData {
    token: string,
}

export interface UserinfoResponseData extends ResponseData {
    data: {
        username: string,
        avatar: string,
        routes: [],
        userId: string,
        token: string
    }
}
