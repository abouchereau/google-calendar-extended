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

    static loadScriptOnce(url, globalName, cacheVar) {
    if (cacheVar.value) return cacheVar.value; // déjà en cours ou chargé

    cacheVar.value = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;

      script.onload = () => {
        if (globalName && !window[globalName]) {
          reject(`Le script ${url} est chargé mais ${globalName} est introuvable.`);
          return;
        }
        resolve(window[globalName] || true);
      };

      script.onerror = () => reject(`Erreur de chargement : ${url}`);
      document.head.appendChild(script);
    });

    return cacheVar.value;
  }

  static isIOs() {
        return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  }

  static isAndroid() {
        return /android/.test(navigator.userAgent.toLowerCase());
  }

  static isMobile() {
    return Utils.isAndroid() || Utils.isIOs();
  }

  static isChromiumBased() {
    return /chrome|crios|crmo|edg|opr|brave\//.test(navigator.userAgent.toLowerCase())
    }
}