// models/Project.ts
class Project {
    id: string;
    title: string;
    description: string;
    image: string;
    github: string;
    demo: string;
    category: string;
    constructor(id: string, title: string, description: string, image: string, github: string, demo: string, category: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.github = github;
        this.demo = demo;
        this.category = category;
    }
}

export default Project;

