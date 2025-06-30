class Utils {

    static loadModuleOptions() {
        return  {
            moduleCache: {
                vue: Vue
            },
            async getFile(url) {

                const res = await fetch(url+"?v="+window.VERSION);
                if ( !res.ok )
                    throw Object.assign(new Error(res.statusText + ' ' + url), { res });
                return {
                    getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
                }
            },
            addStyle(textContent) {

                const style = Object.assign(document.createElement('style'), { textContent });
                const ref = document.head.getElementsByTagName('style')[0] || null;
                document.head.insertBefore(style, ref);
            },
        };
    }

    static removeEmptyValues(obj) {
        for (let key in obj) {
            if (obj[key] == "") {
                delete obj[key];
            }
        }
        return obj;
    }

    static minutesToClock(minutes, separator=":") {
        const heuresC = Math.floor(minutes / 60) % 24;
        const minutesC = minutes % 60;
        const hStr = heuresC.toString().padStart(2, "0");
        const mStr = minutesC.toString().padStart(2, "0");
        return `${hStr}${separator}${mStr}`;
    }

    static clockToMinutes(clock, separator=":") {
        const [heures, minutes] = clock.split(separator).map(Number);
        return minutes + 60 * heures;
    }
}