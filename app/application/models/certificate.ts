// models/Certificate.ts
class Certificate {
    id: string;
    name: string;
    description: string;
    image: string;
    link: string;

    constructor(id: string, name: string, description: string, image: string, link: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.link = link;
    }
}

export default Certificate;