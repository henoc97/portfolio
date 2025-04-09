// models/Certificate.ts
class Certificate {
    id: string;
    name: string;
    issuer: string;
    date: Date;

    constructor(id: string, name: string, issuer: string, date: Date) {
        this.id = id;
        this.name = name;
        this.issuer = issuer;
        this.date = date;
    }
}

export default Certificate;