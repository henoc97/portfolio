// models/Skill.ts
class Skill {
    id: string;
    name: string;
    level: string;

    constructor(id: string, name: string, level: string) {
        this.id = id;
        this.name = name;
        this.level = level;
    }
}

export default Skill;

