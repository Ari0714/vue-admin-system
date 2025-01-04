export interface ResponseData {
    code: number,
    message: string,
    status: string
}

export interface BrandResponseData extends ResponseData {
    data: {
        tableData:[],
        total:number
    },
}
