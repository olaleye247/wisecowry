<template>
  <div class="image-card">
    <img class="image" :src="src" :alt="alt" />
  </div>
</template>

<script>
export default {
  props: ["src", "alt"],
};
</script>

<style scoped>
.image-card {
  /* position: relative; */

  width: 100%;
  height: 100%;
}
.image {
  width: 100%;
  height: auto;
  border-radius: 6px;
}
/* .image-wrapper:after {
  content: "\A";
  position: absolute;
  width: 100%;
  height: 90%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
} */
</style>
