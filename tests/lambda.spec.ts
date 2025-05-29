import {test, expect} from '@playwright/test'
import { ApiTesting } from './pages/apiPages/apiGetToken'

let token: string


test.describe(() => {
    test.beforeEach(async({request}) => {
        const apiTesting = new  ApiTesting(request)
        token = await apiTesting.isToken()

        
    })
    test('api testing',async ({request}) => {
               const response = await request.get('https://conduit-api.bondaracademy.com/api/user',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.user).toHaveProperty('email')
        console.log(body.user);
    })
    test('get user details with id', async ({request}) => {       
        const response = await request.get('https://conduit-api.bondaracademy.com/api/user?/22765',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        expect(response.status()).toBe(200)
        console.log(await response.json());
    })
    
    test('get tags', async({request}) => {       
        const response = await request.get('https://conduit-api.bondaracademy.com/api/tags')
        expect(response.status()).toBe(200)
        const body = await response.json()
        let result = body.tags.filter((item: string) => item === 'Zoom')
        console.log(result);
    })

})

