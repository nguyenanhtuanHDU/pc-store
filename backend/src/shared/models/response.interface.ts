import { HttpStatus } from "@nestjs/common"

export interface IResponse<T> {
    status: HttpStatus
    message: string
    subMessage: 'Success' | 'Error'
    data: T
} 