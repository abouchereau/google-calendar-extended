class Filter {

    cal = "";
    year = -2;



    getUrlParams() {
        const obj = {};
        if (this.cal != "") {
            obj.cal = this.cal;
        }
        obj.year = this.year;        
        /*if (this.month != -1) {
            obj.month = this.month+1;
        }*/
        return new URLSearchParams(obj).toString();
    }
}

