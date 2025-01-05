import request from "@/utils/request";
import { type BrandResponseData } from "./type";

enum API {
    GET_MESSAGE = '/myapi/getMessage',
    ADD_MESSAGE = '/myapi/addMessage'
}


export const getBoardMessage = () => request.get<any, BrandResponseData>(API.GET_MESSAGE)

export const addBoardMessage = (data:any) => request.post<any, BrandResponseData>(API.ADD_MESSAGE, data)


