<template>
  <router-link 
    :to="{name: 'gallery_detail', params: {id: image.id}}" 
    class="gallery-item"
  >
    <img 
      v-if="isImage(imgObject)" 
      class="gallery-item__img" 
      v-lazy="`https://i.imgur.com/${imgObject.id}_d.jpg?maxwidth=520&shape=thumb&fidelity=low`"
      :alt="image.decription || image.title"
    />
    <LazyVideo 
      v-else-if="isVideo(imgObject)"
      :src="`https://i.imgur.com/${imgObject.id}_lq.mp4`"
      class="gallery-item__video"
      draggable="false" 
      :attrs="{
        controls: true,
        playsinline: true,
        loop: true,
        autoplay: false,
        muted: true
      }"
      :poster="`https://i.imgur.com/${imgObject.id}_d.jpg?maxwidth=520&shape=thumb&fidelity=high`" 
    />
    <span class="gallery-item__desc-block">
      {{ image.title }}
    </span>
  </router-link>
</template>

<script>
export default {
  name: "GalleryItem",
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  computed: {
    isSingleImage() {
      return this.image.type;
    },
    imgObject() {
      return this.isSingleImage ? this.image : this.image.images[0];
    }
  },
  methods: {
    isVideo(image) {
      return image.type === "video/mp4";
    },
    isImage(image) {
      return (
        image.type === "image/jpeg" ||
        image.type === "image/gif" ||
        image.type === "image/png"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery-item {
  display: block;
  line-height: 0;
  box-shadow: 0px 8px 20px rgba(0, 118, 203, 0.15);
  overflow: hidden;
  border-radius: 6px;
  text-decoration: none;
  &__img {
    width: 100%;
    height: auto;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    transition: all 0.3s ease-in-out;
  }
  &__video {
    width: 100%;
    height: auto;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &__desc-block {
    display: block;
    color: #004876;
    background-color: #c7e6f6;
    padding: 30px 20px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
  }
  &:hover &__img {
    transform: scale(1.1);
  }
}
</style>
