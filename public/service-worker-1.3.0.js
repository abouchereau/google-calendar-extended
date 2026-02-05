self.addEventListener('fetch', event => {
	event.respondWith(
		caches.open('saugcal-1.3.0').then(cache => {
			return cache.match(event.request).then(response => {
				if (navigator.onLine === false) {
				  return response;
				}
				return  fetch(event.request)
				.then(response => {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});
var urlsToCache = [
    "/components/App.vue",
    "/components/block/ModalFiltres.vue",
    "/components/block/ModalInfo.vue",
    "/components/block/ModalInstall.vue",
    "/components/block/ModalRoute.vue",
    "/components/block/Spinner.vue",
    "/components/page/Event.vue",
    "/components/page/Login.vue",
    "/components/page/Panel.vue",
    "/components/page/Admin/Admin.vue",
    "/components/page/Admin/AdminFooter.vue",
    "/components/page/Admin/AdminFormulas.vue",
    "/components/page/Admin/AdminJob.vue",
    "/components/page/Admin/AdminPersonEdit.vue",
    "/components/page/Admin/AdminPersonList.vue",
    "/components/page/Event/EventCommunication.vue",
    "/components/page/Event/EventContacts.vue",
    "/components/page/Event/EventEquipe.vue",
    "/components/page/Event/EventFooter.vue",
    "/components/page/Event/EventGeneral.vue",
    "/components/page/Event/EventHebergement.vue",
    "/components/page/Event/EventHoraires.vue",
    "/components/page/Event/EventPrecision.vue",
    "/components/page/Event/EventRepas.vue",
    "/components/page/Event/EventTrajet.vue",
    "/components/page/Event/EventTransport.vue",
    "/components/page/Panel/PanelFooter.vue",
    "/components/page/Panel/PanelHeader.vue",
    "/components/page/Panel/PanelTransports.vue",
    "/css/bootstrap.css",
    "/css/font-awesome-6.7.1.min.css",
    "/css/hint-3.0.0.min.css",
    "/css/hint.min.css",
    "/css/style.css",
    "/css/vue-multiselect.css",
    "/images/LogoFondJaune.svg",
    "/images/LogoFondJaune192.png",
    "/images/LogoFondJaune512.png",
    "/images/logo_favicon.png",
    "/images/Logo_Transparent.svg",
    "/images/Logo_Transparent_60.svg",
    "/images/instru/accordeon.svg",
    "/images/instru/banjo.svg",
    "/images/instru/basson.svg",
    "/images/instru/batterie.svg",
    "/images/instru/bongos.svg",
    "/images/instru/caisse-claire.svg",
    "/images/instru/clarinette.svg",
    "/images/instru/conga.svg",
    "/images/instru/contrebasse.svg",
    "/images/instru/cor.svg",
    "/images/instru/flute-traversiere.svg",
    "/images/instru/grosse-caisse.svg",
    "/images/instru/guitare-electrique.svg",
    "/images/instru/guitare.svg",
    "/images/instru/harmonica.svg",
    "/images/instru/harpe.svg",
    "/images/instru/hautbois.svg",
    "/images/instru/headphones.svg",
    "/images/instru/lyre.svg",
    "/images/instru/maracas.svg",
    "/images/instru/microphone.svg",
    "/images/instru/piano.svg",
    "/images/instru/porte-voix.svg",
    "/images/instru/saxophone-alto.svg",
    "/images/instru/saxophone-baryton.svg",
    "/images/instru/saxophone-soprano.svg",
    "/images/instru/saxophone-tenor.svg",
    "/images/instru/saxophone.svg",
    "/images/instru/soubassophone.svg",
    "/images/instru/synthe.svg",
    "/images/instru/table-mixage.svg",
    "/images/instru/tambour.svg",
    "/images/instru/toy-xylophone.svg",
    "/images/instru/trombone.svg",
    "/images/instru/trompette.svg",
    "/images/instru/tuba.svg",
    "/images/instru/tubular-bells.svg",
    "/images/instru/violon.svg",
    "/images/instru/violoncelle.svg",
    "/images/instru/xylophone.svg",
    "/js/bootstrap.js",
    "/js/choices.js",
    "/js/const.js",
    "/js/excel.js",
    "/js/filter.js",
    "/js/init.js",
    "/js/main.js",
    "/js/routes.js",
    "/js/store.js",
    "/js/user.js",
    "/js/utils.js",
    "/js/vue-multiselect.js",
    "/js/vue-router.js",
    "/js/vue.js",
    "/js/vue3-sfc-loader.js",
    "/webfonts/fa-solid-900.woff2",
    "/webfonts/lato-bold.woff2",
    "/webfonts/lato-italic.woff2",
    "/webfonts/lato-regular.woff2"
    ];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('saugcal-1.3.0').then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
