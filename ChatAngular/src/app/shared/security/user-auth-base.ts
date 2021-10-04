export class UserAuthBase {
    username: string = '';
    bearerToken: string = '';
    isAuthenticated: boolean = false;

    init(): void {
        this.username = '';
        this.bearerToken = '';
        this.isAuthenticated = false;
    }
}