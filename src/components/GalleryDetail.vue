<template>
  <section v-if="imageData" class="gallery-detail">
    <a class="back-btn" href="/">Back to home page</a>
    <h1 class="gallery-detail__title">{{ imageData.title }}</h1>
    <div class="gallery-detail__stats">
      <span 
        v-if="typeof imageData.ups === 'number'" 
        class="gallery-detail__stat gallery-detail__stat--upvotes"
      >
        Upvotes: {{ imageData.ups }}
      </span>
    <span 
        v-if="typeof imageData.downs === 'number'" 
        class="gallery-detail__stat gallery-detail__stat--downvotes"
      >
        Downvotes: {{ imageData.downs }}
      </span>
      <span 
        v-if="typeof imageData.score === 'number'" 
        class="gallery-detail__stat gallery-detail__stat--score"
      >
        Score: {{ imageData.score }}
      </span>
    </div>
    <div class="gallery-detail__container">
      <div class="gallery-detail__img-wrapper" v-for="image in imageData.images" :key="image.id">
        <img 
          v-if="isImage(image)" 
          class="gallery-detail__image" 
          :src="image.link"/>
        <video 
          v-else-if="isVideo(image)" 
          draggable="false" 
          playsinline 
          loop 
          :poster="`https://i.imgur.com/${image.id}_d.jpg?maxwidth=520&amp;shape=thumb&amp;fidelity=high`" 
          autoplay>
            <source type="video/mp4" :src="image.mp4">
        </video>
      </div>
    </div>
    <div v-if="imageData.description">{{ imageData.description }}</div>
  </section>
</template>

<script>
import { getImage } from "./../api/gallery";

export default {
  name: "GalleryDetail",
  data: () => ({
    imageData: null,
    loading: false
  }),
  async created() {
    try {
      this.loading = true;
      this.imageData = await getImage(this.$route.params.id);
    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
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
.back-btn {
  display: block;
  text-align: left;
}
.gallery-detail {
  background-color: #fbfcff;
  color: #323232;
  padding: 30px 20px;
  position: relative;
  &__title {
    font-size: 30px;
    line-height: 1.2;
    font-weight: bold;
    text-transform: uppercase;
  }
  &__stats {
    max-width: 400px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 0;
  }
  &__img-wrapper {
    flex: 0 1 calc(33.3% - 20px);
    padding: 10px;
  }
  &__image {
    width: 100%;
    border-radius: 6px;
    box-shadow: 0px 8px 20px rgba(0, 118, 203, 0.05);
  }
}

/* mobile styles */
@media only screen and (max-width: 520px) {
  .gallery-detail {
    &__container {
      display: block;
    }
  }
}
</style>
