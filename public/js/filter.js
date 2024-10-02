class Filter {

    cal = "";
    year = -1;
    month = -1;

    constructor() {
        const today = new Date();
        this.year = today.getFullYear();
        this.month = today.getMonth()+1;
    }

    getUrlParams() {
        const obj = {};
        if (this.cal != "") {
            obj.cal = this.cal;
        }
        if (this.year != -1) {
            obj.year = this.year;
        }
        if (this.month != -1) {
            obj.month = this.month;
        }
        return new URLSearchParams(obj).toString();
    }
}

