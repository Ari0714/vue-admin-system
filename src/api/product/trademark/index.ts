import request from "@/utils/request";
import { type BrandResponseData } from "@/api/product/trademark/type";

enum API {
    GET_TRADEMARK = '/myapi/getBrandData',
}


export const getBrandData = (data:any) => request.post<any, BrandResponseData>(API.GET_TRADEMARK, data)