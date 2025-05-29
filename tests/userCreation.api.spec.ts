import {APIRequestContext} from "@playwright/test";
import { test, expect, request} from "../fixtures/apiAuthToken";

test.describe.configure({mode: 'serial'})
test.describe("api tests", () => {
    let token : string
    async function getToken(){
        return token
    }
  test("api", async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/users/login`, {
      data: {
        user: {
          email: "tshekar.hr1@gmail.com",
          password: "12345",
        },
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json()
    token = body.user.token    
    console.log(await getToken());
  });
  test.skip('get user', async () => {
  const apiRequest: APIRequestContext = await request.newContext()
    const response = await apiRequest.get('https://conduit-api.bondaracademy.com/api/user', {
        headers: {
            Authorization: `Bearer ${await getToken()}`
        }
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.user.id).toBe(22765)
});
test.skip('get 22765 user data', async({request}) => {
    const response = await request.get('https://conduit-api.bondaracademy.com/api/user?id=22765', {
        headers: {
            Authorization: `Bearer ${await getToken()}`
        }
    })
    expect(response.status()).toBe(200)
    console.log(await response.json());
    expect(response.ok()).toBeTruthy()
})
test('tags', async ({request, token}) => {
  const response = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      article: {
        title: 'Hello playwright 321',
        description: 'description about',
        body: 'write about pw as documention',
        tagList: ['awesome playwright']
      }
    },
    headers: {
      Authorization: `Token ${token}`
    }
  })

 expect(response.status()).toBe(201)
 const newTagBody = await response.json()
 expect(newTagBody.article.tagList).toEqual(['awesome playwright'])
  
  
})

})
