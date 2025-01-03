

export interface LoginFormData {
    username: string,
    password: string
}

export interface ResponseData {
    code: number,
    message: string
    ok: boolean
}

export interface LoginResponseData extends ResponseData {
    data: {
        token:string,
        message:string
    }
}

export interface UserinfoResponseData extends ResponseData {
    data: {
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}