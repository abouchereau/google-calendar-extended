<template>
    <div class="modal fade" tabindex="-1" id="modal-install">
        <div class="modal-dialog modal-dialog-centered modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title">Installer l'application</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">   
                    <p>Pour accéder plus facilement à l’application, vous pouvez l’installer sur votre écran d’accueil.</p>
                    <div v-if="isAndroid" class="blockquote">
                        <div class="badge bg-info">Android</div>
                        <ol>
                            <li class="my-2">Appuyez sur le bouton <button class="btn btn-light py-0">⋮</button> en haut à droite du navigateur</li>
                            <li class="my-2">Choisissez “Ajouter à l’écran d’accueil”</li>
                            <li class="my-2">Validez l’installation</li>
                        </ol>
                    </div>
                    <div v-else-if="isIOs" class="blockquote">
                        <div class="badge bg-info">IPhone</div>
                        <ol>
                            <li class="my-2">Appuyez sur le bouton Partager (le carré avec la flèche ⬆️)</li>
                            <li class="my-2">Faites défiler puis choisissez “Ajouter à l’écran d’accueil”</li>
                            <li class="my-2">Validez</li>
                        </ol>
                    </div>
                   <div v-else-if="isChromiumBased" class="blockquote">
                        <div class="badge bg-info">Chrome</div>
                        <ol>
                            <li class="my-2">Appuyez sur le bouton <button class="btn btn-light py-0">⋮</button> en haut à droite du navigateur</li>
                            <li class="my-2">Choisissez “Enregistrer et partager”</li>
                            <li class="my-2">Choisissez “Installer Dates Saugrenue”</li>
                            <li class="my-2">Validez</li>
                        </ol>
                    </div>



                    <p>Une fois installée, l’application apparaîtra comme une app classique sur votre téléphone.</p>
                    <div v-if="!isChromiumBased" class="border border-danger p-2">
                        <p>Pour installer l'application, il est préférable d'utiliser un navigateur Chrome (ou un autre navigateur basé sur Chromium)</p>                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-install',
    data() {
      return {    
        isAndroid: false,
        isIOs: false,
        isChrome: false,
        modal: null
      }   
    },
    methods: {
        open() {
            this.modal.show();
        }
    },
    mounted() {
        this.isIOs = Utils.isIOs();
        this.isAndroid = Utils.isAndroid();
        this.isChrome = Utils.isChromiumBased();
        this.modal = new bootstrap.Modal(document.getElementById("modal-install"));
    }
}
</script>
