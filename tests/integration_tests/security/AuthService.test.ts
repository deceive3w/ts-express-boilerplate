import AuthServiceImpl from "../../../src/security/AuthService"

describe('Testing Auth Service', ()=>{
    it('should can decrypt token', async ()=>{
        let service = new AuthServiceImpl()
        let profile = await service.getPayload("YUZDSFMvSjhRZEJtYXFGNzlsYW9xZnVpbDh2SUdLYXVjdCtwSlFJSzhkL0huZnZKWmFxZVZ6RDJKQzJGNkdDTA==")
        console.log(profile)
    })
})