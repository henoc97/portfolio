// models/Blog.ts
class Blog {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: Date;

    constructor(id: string, title: string, excerpt: string, category: string, date: Date) {
        this.id = id;
        this.title = title;
        this.excerpt = excerpt;
        this.category = category;
        this.date = date;
    }
}

export default Blog;

