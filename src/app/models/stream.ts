export class Stream {
    url: string;
    platform: string;
    state: string;
    gamer: string;

    constructor(url: string, platform: string, state: string, gamer: string) {
        this.url = url;
        this.platform = platform;
        this.state = state;
        this.gamer = gamer;
    }
}