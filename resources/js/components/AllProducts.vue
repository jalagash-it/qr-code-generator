<template>
  <div>
    <b-list-group horizontal>
      <b-list-group-item style="width: 100%">
        <b-container v-if="items">
          <b-row v-for="item in items" :key="item.id">
            <b-col>
              <b-card-group>
                <b-card :img-src="item.file_path" bg-variant="light" img-top>
                  <template v-slot:footer> Aтауы:{{ item.name }} </template>
                </b-card>
                <b-card :img-src="item.qrcode_path" img-top bg-variant="light">
                  <template v-slot:footer>
                    <b-link :href="item.qrcode_path" download>
                      QR CODE жүктеп алу
                    </b-link>
                  </template>
                </b-card>
              </b-card-group>
              <b-button
                variant="danger"
                block
                class="margin-bottom-15"
                @click="removeProduct(item)"
              >
                тауарды өшіру
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import fileService from "../services/file-service";
export default {
  props: ["items"],
  data() {
    return {
      fields: [
        { label: "", key: "index" },
        { key: "name", label: "Тауар" },
        { key: "file_path", label: "Суреті" },
        { key: "qrcode_path", label: "qr code" },
      ],
    };
  },

  methods: {
    removeProduct(item) {
      let confirmed = confirm(`${item.name} өше берсін бе?`);
      if (!confirmed) return;
      fileService
        .removeProduct(item.id)
        .then(() => {
          alert("Өшірілді");
          this.items.splice(this.items.indexOf(item),1);
        })
        .catch(() => {
          alert("Қате!!!");
        });
    },
  },
};
</script>
<style scoped>
.btn-qr-generate {
  color: #151880;
  font-size: 1.1em;
}
.card-footer {
  text-align: center;
}
.margin-bottom-15 {
  margin-bottom: 15px;
}
</style>
