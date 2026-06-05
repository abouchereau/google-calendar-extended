export class Filter {

    cal: string = "";
    year: number = -2;
    displayDeleted: boolean = false;



    getUrlParams():string {
        const obj: Record<string, string> = {};
        if (this.cal != "") {
            obj['cal'] = this.cal;
        }
        obj['year'] = this.year.toString();        
        return new URLSearchParams(obj).toString();
    }
}

