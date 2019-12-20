export default interface AuthService {
    getPayload(token: string): Promise<any>
}