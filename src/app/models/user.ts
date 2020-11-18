export class User {
    _id: string;
    name: string;
    email: string;
    id_social: string;
    wallet: string;
    time: Number;
    url_photo: string;

    constructor(name: string, email: string, id_social: string, url_photo: string) {
        this.name = name;
        this.email = email;
        this.id_social = id_social;
        this.url_photo = url_photo;
    }
}