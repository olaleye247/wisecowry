<template>
  <div class="home">
    <header class="header">
      <div class="no-results" v-if="noResults">
        <h1>No results for {{ $route.params.query }} :(</h1>
        <small>Not to worry, try searching for something else!</small>
        <search-bar @search-for-photos="query = $event" />
      </div>
      <h1 v-else>
        <span v-if="images.length == 0">Searching for</span>
        <span v-else>Search results for</span>
        <span class="query-string">
          <span class="quotes">"</span>{{ query
          }}<span class="quotes">"</span></span
        >
      </h1>
    </header>
    <image-layout :images="images" />
  </div>
</template>

<script>
import ImageLayout from "../Partials/ImageLayout";
import SearchBar from "../Partials/SearchBar";
export default {
  components: {
    ImageLayout,
    SearchBar,
  },
  data() {
    return {
      images: [],
      noResults: false,
      query: "",
    };
  },
  mounted() {
    this.query = this.$route.params.query;
    this.getPhotos();
  },
  watch: {
    query() {
      this.getPhotos();
    },
  },
  methods: {
    async getPhotos() {
      this.noResults = false;
      try {
        let response = await this.$_getPhotos(this.query);
        this.images = response.data.results;
        if (this.images.length == 0) {
          this.noResults = true;
        }
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
  display: flex;
  align-items: center;

  h1 {
    color: var(--primary);
    font-size: 2.5rem;
    text-align: left;
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: 700px) {
    h1 {
      width: 100%;
      font-size: 2rem;
      padding-left: 1rem;
    }
  }
}
.query-string {
  color: #9ba4b4;
  padding-left: 1rem;
}
.no-results {
  width: 70%;
  margin: auto;
  text-align: center;
  h1 {
    text-align: center;
  }
  .search-bar {
    margin-top: 1rem;
  }
  small {
    text-align: center;
    color: var(--primary);
  }
}
</style>
