export class User {
    _id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    kind: string;
    id_social: string;
    wallet: string;
    time: Number;
    url_photo: string;

    constructor(name: string, email: string, username: string, password: string, kind: string,
        id_social: string, url_photo: string) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.kind = kind;
        this.id_social = id_social;
        this.time = 0;
        this.url_photo = url_photo;
    }
}