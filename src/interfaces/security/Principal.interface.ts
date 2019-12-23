export default interface Principal{
    isAuthenticated(): Promise<boolean>
    user(): any
}

