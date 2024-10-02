class Main {

    static get BASE() {return "http://localhost:3615";}

    constructor() {
        this.filter = new Filter();
    }

    async loadAllEvents() {
        let res = await fetch(Main.BASE+"/getEvents?"+this.filter.getUrlParams());
        return await res.json();
    }

    async loadCals() {
        let res = await fetch(Main.BASE+"/getCals");
        return await res.json();
    }

}
