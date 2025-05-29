import {test as base, expect} from '@playwright/test'

export const test = base.extend<{token: string}>({
    token: async({request}, use) => {
        const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: {
                user: {
                    email: 'tshekar.hr1@gmail.com',
                    password: '12345'
                }
            }
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        const token = body.user.token
        await use(token)
    }
})

export {expect, request} from '@playwright/test'
