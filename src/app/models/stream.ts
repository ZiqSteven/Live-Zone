export class Stream {
    _id: string;
    url: string;
    platform: string;
    status: string;
    gamer: string;

    constructor(url: string, platform: string, status: string, gamer: string) {
        this.url = url;
        this.platform = platform;
        this.status = status;
        this.gamer = gamer;
    }
}