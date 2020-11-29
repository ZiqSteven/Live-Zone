export class Stream {
    _id: string;
    url: string;
    platform: string;
    status: string;
    username: string;

    constructor(url: string, platform: string, status: string, username: string) {
        this.url = url;
        this.platform = platform;
        this.status = status;
        this.username = username;
    }
}