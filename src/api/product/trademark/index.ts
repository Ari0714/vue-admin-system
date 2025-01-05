import request from "@/utils/request";
import { type BrandResponseData } from "@/api/product/trademark/type";

enum API {
    GET_TRADEMARK = '/myapi/getBrandData',
    UPLOAD_TRADEMARK = '/myapi/uploadImg',
    EDIT_TRADEMARK = '/myapi/uploadBrandName',
    DEL_TRADEMARK = '/myapi/delBrandData',
}


export const getBrandData = (data:any) => request.post<any, BrandResponseData>(API.GET_TRADEMARK, data)

export const uploadBrandData = (data:any) => request.post<any, BrandResponseData>(API.UPLOAD_TRADEMARK, data)

export const editBrandData = (data:any) => request.post<any, BrandResponseData>(API.EDIT_TRADEMARK, data)

export const delBrandData = (data:any) => request.post<any, BrandResponseData>(API.DEL_TRADEMARK, data)

