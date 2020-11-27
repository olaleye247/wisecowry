<template>
  <div class="home">
    <header class="header">
      <search-bar @search-for-photos="searchForPhotos($event)" />
    </header>
    <image-layout :images="images" />
  </div>
</template>

<script>
import SearchBar from "../Partials/SearchBar";
import ImageLayout from "../Partials/ImageLayout";
export default {
  components: {
    ImageLayout,
    SearchBar,
  },
  data() {
    return {
      images: [],
    };
  },
  mounted() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await this.$_getPhotos("African");
        this.images = response.data.results;
      } catch (error) {
        alert(error);
      }
    },
    searchForPhotos(query) {
      this.$router.push(`search/${query}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height: 18rem;
  background-color: #dde2e8;
  display: grid;
  place-items: center;
  .search-bar {
    width: 70%;
  }
}
</style>
