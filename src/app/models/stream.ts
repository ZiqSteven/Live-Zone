export class Stream {
    nombre: string;
    url: string;
    platform: string;

    constructor(nombre: string, url: string, platform: string) {
        this.nombre = nombre;
        this.url = url;
        this.platform = platform;
    }
}