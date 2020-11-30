<template>
  <transition name="modal">
    <div
      class="image-modal"
      id="modal"
      @click="handleOutsideClick"
      v-if="showModal"
    >
      <div class="close-modal-icon" @click="$emit('close-modal')">
        <modal-close-svg />
      </div>
      <transition name="modal-content">
        <div class="image-modal-content">
          <div class="image-wrapper">
            <img
              :src="`${image.urls.raw}&w=800&h=420&fit=crop`"
              :alt="image.alt_description"
              class="img-fluid img"
            />
          </div>
          <div class="img-meta">
            <p>{{ image.user.first_name }} {{ image.user.last_name }}</p>
            <small>{{
              image.user.location ? image.user.location : "No Location"
            }}</small>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import ModalCloseSvg from "./ModalCloseSvg";
export default {
  components: {
    ModalCloseSvg,
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    handleOutsideClick() {
      let modal = document.getElementById("modal");
      if (event.target == modal) {
        this.$emit("close-modal");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-modal {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease 0.5s;

  @media screen and (max-width: 900px) {
    .image-modal-content {
      width: 90% !important;
    }
  }
}
.close-modal-icon {
  position: absolute;
  cursor: pointer;
  right: 1rem;
  top: 1rem;
}
/* Modal Content/Box */
.image-modal-content {
  background-color: #ffffff;
  border: 1px solid #888;
  width: 70%;
  height: 90%;
  border-radius: 8px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 60%;
  }
  @media screen and (max-height: 400px) {
    width: 100%;
    height: 90%;
  }
}
.image-wrapper {
  width: 100%;
  height: 100%;
}
.img-fluid {
  width: 100%;
  height: 100%;
}
.img-meta {
  padding: 1rem 2rem 1.5rem;
  p {
    color: #454f62;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  small {
    color: #bbc2cc;
  }
}
.modal-enter,
.modal-enter-to {
  animation: popIn 0.5s;
}

.modal-leave,
.modal-leave-to {
  animation: popOut 0.5s;
}

.modal-enter-active,
.modal-leave-active {
  transition: all ease 0.1s;
}

@keyframes popIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
@keyframes popOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
</style>
