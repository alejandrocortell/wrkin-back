import { Request } from 'express'
export interface IExtendRequest extends Request {
    decoded: { id: number }
}
