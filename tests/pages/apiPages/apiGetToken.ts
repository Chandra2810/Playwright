import {APIRequestContext, expect} from '@playwright/test'

export class ApiTesting {
    apiRequest: APIRequestContext
    token: string
    constructor(apiRequest: APIRequestContext){
        this.apiRequest = apiRequest
    }
    async isToken(){
        const response = await this.apiRequest.post('https://conduit-api.bondaracademy.com/api/users/login',
            {
                data: {
                    user: {
                        email:"tshekar.hr1@gmail.com",
                        password:"12345"
                    }
                }
            }
        )
        const body = await response.json()
        expect(response.status()).toBe(200)
        const token = body.user.token
        return token
    }
}