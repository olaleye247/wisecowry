<template>
  <div class="home">
    <header class="header">
      <search-bar />
    </header>
    <div class="container">
      <div class="images-wrapper">
        <div class="image-card" v-for="image in images" :key="image.id">
          <div class="card-content">
            <div class="overlay"></div>
            <img
              class="image"
              :src="image.urls.small"
              :alt="image.alt_description"
              @load="imageCount++"
            />
            <div class="image-description">
              <p>{{ image.user.first_name }} {{ image.user.last_name }}</p>
              <p class="location">{{ image.user.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "../Partials/SearchBar";
import ImageCard from "../Partials/ImageCard";
export default {
  components: {
    SearchBar,
    ImageCard,
  },
  data() {
    return {
      images: [],
      imageCount: 0,
    };
  },
  watch: {
    imageCount() {
      console.log(this.imageCount);
      if (this.imageCount == 8) {
        console.log("getting all image cards");
        this.resizeAllGridItems();
      }
    },
  },
  mounted() {
    window.onload = this.resizeAllGridItems();
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await this.$_getPhotos("African");
        console.log(response);
        this.images = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    resizeAllGridItems() {
      let imageCards = document.getElementsByClassName("image-card");
      for (let i = 0; i < imageCards.length; i++) {
        this.resizeImageCard(imageCards[i]);
      }
    },
    resizeImageCard(imageCard) {
      let grid = document.getElementsByClassName("images-wrapper")[0],
        rowGap = parseInt(
          window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
        ),
        rowHeight = parseInt(
          window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
        );
      //   console.log(rowGap, rowHeight);
      let rowSpan = Math.ceil(
        (imageCard.querySelector(".card-content").getBoundingClientRect()
          .height +
          rowGap) /
          (rowHeight + rowGap)
      );
      //   console.log(rowSpan);
      /* Set the spanning as calculated above (S) */
      imageCard.style.gridRowEnd = "span " + rowSpan;
    },
  },
};
</script>

<style scoped>
.header {
  height: 18rem;
  background-color: #dde2e8;
  display: grid;
  place-items: center;
}
.container {
  width: 65%;
  margin: -2rem auto 0;
}
.images-wrapper {
  display: grid;
  grid-gap: 15px 50px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 10px;
}
.image {
  max-width: 100%;
  border-radius: 6px;
  vertical-align: top;
  height: auto;
}
.card-content {
  position: relative;
}
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  top: 0;
  background: linear-gradient(180deg, transparent, transparent 30%, #000);
  z-index: 1;
}
/* .card-content:after {
  content: "\A";
  position: absolute;
  width: 100%;
  height: 90%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  opacity: 1;
  border-radius: 6px;
} */
.image-card {
  position: relative;
}
/* .image {
  width: 100%;
  height: auto;
  vertical-align: top;
  border-radius: 6px;
}
.card-content:after {
  content: "\A";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  opacity: 1;
  border-radius: 6px;
}
.image-description {
  position: absolute;
  color: #fff;
  bottom: 1rem;
  left: 1rem;
  z-index: 2;
} */
.image-description {
  position: absolute;
  color: #fff;
  bottom: 2rem;
  left: 1rem;
  z-index: 2;
}
.image-description p {
  margin-bottom: 0;
}
.location {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  text-align: left;
}
</style>
