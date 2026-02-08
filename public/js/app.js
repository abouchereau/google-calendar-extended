const BASE_API = location.hostname=="localhost"?"http://localhost:3615":"https://node.lasaugrenue.fr";
const fetchText = (url)=> {
    return fetch(url).then(response => response.text()).catch((error) => {console.log(error);});
}      
const loadScriptsSequentially = (index, place) => {
    if (index >= scripts.length) return;

    const script = document.createElement('script');
    script.src = `${scripts[index][0]}?v=${window.VERSION}`;
    if (scripts[index][1] == 1) {
        script.defer = true;
    }
    script.onload = () => loadScriptsSequentially(index + 1); 
    document.head.appendChild(script);
}
const scripts =  [
    ["/js/const.js",0],
    ["/js/vue.js",0],
    ["/js/vue-router.js",0],
    ["/js/utils.js",0],
    ["/js/user.js",0],
    ["/js/vue3-sfc-loader.js",0],
    ["/js/filter.js",0],             
    ["/js/excel.js",0],
    ["/js/main.js",0],
    ["/js/vue-multiselect.js",0],   
    ["/js/init.js",1],
    ["/js/bootstrap.js",1]
];            
const styles = [
    "/css/bootstrap.css",
    "/css/vue-multiselect.css",
    "/css/font-awesome-6.7.1.min.css",
    "/css/hint-3.0.0.min.css",
    "/css/style.css"            
];

(async () => {
    fetchText(BASE_API+'/getHashVersion').then(a=>{
        window.VERSION = a.substr(0,6);        
        styles.forEach(file => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${file}?v=${window.VERSION}`;
            document.head.appendChild(link);
        });
        loadScriptsSequentially(0);
    })    
    .catch(e=> {
        document.getElementById("app").innerHTML = "<h1>Petite pause technique. Retour imminent :)</h1>"
    });

    if ('serviceWorker' in navigator && window.location.href.indexOf("localhost") == -1) {           
        navigator.serviceWorker.register('service-worker-1.3.0.js');
    }
})();