export class User {
    constructor(
        public name: string,
        public username: string,
        public email: string,
        public email_confirmation: string,
        public password: string,
        public address: string,
        public password_confirmation: string,
        public identification: number,
        public lastname: string,
        public phone: number,
    ) {}
}