import {APIRequestContext, expect} from '@playwright/test'

export class APIUtil {
    apiRequest: APIRequestContext
    constructor(apiRequest: APIRequestContext){
        this.apiRequest = apiRequest
    }
    async getToken(){
        const response = await this.apiRequest.post('https://thinking-tester-contact-list.herokuapp.com/users', {
            data: {
                email: 'tshekar.hr120@gmail.com',
                firstName: 'Chandra',
                lastName: 'karthi',
                password: 'qwerty@123'
            }
        })
        expect(response.status()).toBe(201)
        const body = await response.json()
        const token = body.token
        return token
    }
}