<template>
    <div class="modal fade" tabindex="-1" :id="uniqueId">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p v-html="text"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let modalInfoUid = 0;
export default {
  name: 'modal-info',
  data() {
    return {
        text: "",
        modal: null,
        uniqueId: `modal-info-${modalInfoUid++}`
    }
  },
  methods: {
    open(text) {
        this.text = text;
        this.modal.show();
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(document.getElementById(this.uniqueId));
  }
}
</script>
