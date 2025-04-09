// models/Project.ts
class Project {
    id: string;
    title: string;
    description: string;
    link: string;

    constructor(id: string, title: string, description: string, link: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
    }
}

export default Project;

