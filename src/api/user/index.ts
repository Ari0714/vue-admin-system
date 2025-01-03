import request from "@/utils/request";
import type { LoginFormData, LoginResponseData, UserinfoResponseData } from "./type";

enum API {
    LOGIN_URL = '/user/login',
    USER_INFO_URL = '/user/info',
    LOGINOUT_URL = '/user/loginout'
 }


// export const reqLogin = (data:LoginFormData) => {request.post<any,LoginResponseData>(API.LOGIN_URL,data)}

export const reqLogin = (data: LoginFormData) =>
    request.post<any, LoginResponseData>(API.LOGIN_URL, data)

export const reqUserinfo = () => {request.get<any,UserinfoResponseData>(API.USER_INFO_URL)}

export const reqLoginout = () => {request.get<any,any>(API.LOGINOUT_URL)}