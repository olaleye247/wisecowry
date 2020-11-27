<template>
  <div>
    <div class="container">
      <loader v-if="loading" />
      <div class="images-wrapper">
        <div
          class="image-card"
          :style="{ opacity: loading ? 0 : 1 }"
          v-for="image in images"
          :key="image.id"
        >
          <div class="card-content" @click="showImage(image)">
            <div class="overlay"></div>
            <img
              class="image"
              :src="image.urls.regular"
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
    <image-modal
      :showModal="showImageModal"
      @close-modal="showImageModal = false"
      :image="selectedImage"
    />
  </div>
</template>

<script>
import ImageModal from "./ImageModal";
import Loader from "../Partials/Loader";

export default {
  components: {
    ImageModal,
    Loader,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      imageCount: 0,
      selectedImage: {},
      showImageModal: false,
      loading: true,
      countImagesResized: 0,
    };
  },
  watch: {
    imageCount() {
      if (this.imageCount == 8) {
        this.resizeAllGridItems();
      }
    },
  },
  mounted() {
    window.onload = this.resizeAllGridItems();
    window.addEventListener("load", this.resizeAllGridItems);
    window.addEventListener("resize", this.resizeAllGridItems);
  },
  methods: {
    resizeAllGridItems() {
      let imageCards = document.getElementsByClassName("image-card");
      for (let i = 0; i < imageCards.length; i++) {
        this.resizeImageCard(imageCards[i]);
      }
      if (this.imageCount == 8) {
        this.loading = false;
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
      let rowSpan = Math.ceil(
        (imageCard.querySelector(".card-content").getBoundingClientRect()
          .height +
          rowGap) /
          (rowHeight + rowGap)
      );
      imageCard.style.gridRowEnd = "span " + rowSpan;
    },
    showImage(image) {
      this.selectedImage = image;
      this.showImageModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  cursor: zoom-in;
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
.image-card {
  position: relative;
}
.image-description {
  position: absolute;
  color: var(--white);
  bottom: 2rem;
  left: 1rem;
  z-index: 2;
  p {
    margin-bottom: 0;
  }
}
.location {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  text-align: left;
}
</style>
