export class Connected {
    _id: string;
    username: string;
    stream: string;

    constructor(username: string, stream: string) {
        this.username = username;
        this.stream = stream;
    }
}