<template>
  <div style="margin: 10px">
    <b-form inline class="add-new-item-form">
      <b-form-group>
        <b-form-input
          v-model="productName"
          placeholder="Тауар атауы"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          accept="image/*"
        />
      </b-form-group>
      <b-button @click="chooseFile">Суретін таңдау</b-button>
      <b-button variant="primary" @click="onSubmit">Сақтау</b-button>
    </b-form>
    <hr />
    <AllProducts :items="items" v-if="items" />
  </div>
</template>
<script>
import AllProducts from "../components/AllProducts";
import fileService from "../services/file-service";
export default {
  components: { AllProducts },
  data() {
    return {
      items: [],
      file1: null,
      productName: "",
    };
  },
  mounted() {
    fileService.getAllProducts().then((res) => {
      this.items = res.data;
    });
  },
  methods: {
    onSubmit() {
      window.fi = this.$refs.fileInput;
      let f = this.$refs.fileInput.files;
      fileService
        .sendFile(f, this.productName)
        .then((res) => {
          alert("сақталды");
          this.items.push(res.data);
        })
        .catch(() => {
          alert("қате");
        });
    },
    chooseFile() {
      this.$refs.fileInput.click();
    },
  },
};
</script>
<style scoped>
.add-new-item-form > * {
  margin: 5px;
}
</style>
