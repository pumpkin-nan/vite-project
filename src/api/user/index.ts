import request from '@/util/request'
import type { loginForm ,userResponseData,loginResponseData} from './type';

enum API{
    LOGIN_URI = '/user/login',
    USERINFO_URL = '/user/info'
}

export const reqLogin = (data:loginForm) =>request.post<any,loginResponseData>(API.LOGIN_URI,data)

export const reqInfo = ()=>request.get<any,userResponseData>(API.USERINFO_URL)