<template>
  <section class="gallery" :class="{'gallery--loading': loading}">
    <header class="gallery__header">
      <h1 class="gallery__title">Gallery Application</h1>
      <div class="filters">
        <SelectFilter 
          class="filter"
          v-model="filterData.section" 
          :options="sectionOptions" 
          id="section"
          label="Select section"
        />
        <SelectFilter 
          class="filter"
          v-model="filterData.showViral"
          :options="viralOptions"
          v-if="filterData.section === 'user'"
          id="viral"
          label="Show viral"
        />
        <SelectFilter 
          class="filter"
          v-model="filterData.window"
          :options="windowOptions"
          v-if="filterData.section === 'top'"
          id="period"
          label="Select period"
        />
        <SelectFilter 
          class="filter"
          v-model="filterData.sort"
          :options="sortOptions"
          id="sort"
          label="Sorting"
        />
      </div>
    </header>
    <masonry
      class="gallery__grid"
      :cols="columnsNumber"
      :gutter="30"
    >
      <GalleryItem 
        v-for="image in images" 
        :key="image.id" 
        :image="image"
        class="block"
      />
    </masonry>
  </section>
</template>

<script>
import GalleryItem from "./elements/GalleryItem";
import SelectFilter from "./elements/SelectFilter";

import { getImages } from "./../api/gallery";

export default {
  name: "ImageGallery",
  components: { SelectFilter, GalleryItem },
  data: () => ({
    loading: false,
    images: [],
    filterData: {
      section: "hot",
      showViral: true,
      window: "day",
      sort: "viral"
    }
  }),
  watch: {
    filterData: {
      async handler(value) {
        this.loading = true;
        try {
          this.images = await getImages(value);
        } catch (error) {
          throw error;
        } finally {
          this.loading = false;
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    columnsNumber() {
      return Math.floor(window.innerWidth / 300);
    },
    sectionOptions() {
      return [
        { id: "hot", label: "Most viral" },
        { id: "top", label: "Highest scoring" },
        { id: "user", label: "User submitted" }
      ];
    },
    viralOptions() {
      return [
        { id: true, label: "Show viral" },
        { id: false, label: "Hide viral" }
      ];
    },
    windowOptions() {
      return [
        { id: "day", label: "Day" },
        { id: "week", label: "Week" },
        { id: "month", label: "Month" },
        { id: "year", label: "Year" },
        { id: "all", label: "All" }
      ];
    },
    sortOptions() {
      return [
        { id: "viral", label: "Popular" },
        { id: "top", label: "Best" },
        { id: "time", label: "Newest" },
        ...(this.filterData.section === "user"
          ? [{ id: "rising", label: "Rising" }]
          : [])
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery {
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
  &__header {
    padding: 0 20px 40px;
    position: fixed;
    width: calc(100% - 40px);
    top: 0;
    left: 0;
    z-index: 1;
    background: linear-gradient(
      to bottom,
      rgba(251, 252, 255, 1) 0%,
      rgba(251, 252, 255, 1) 75%,
      rgba(251, 252, 255, 0) 100%
    );
  }
  &__grid {
    margin-top: 160px;
  }
  &--loading::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.75;
    z-index: 2;
  }
}

.block {
  margin-bottom: 30px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

/* mobile styles */
@media only screen and (max-width: 520px) {
  .gallery {
    &__title {
      margin: 15px 0;
    }
  }
  .filters {
    display: block;
  }
  .filter {
    margin-bottom: 10px;
  }
}
</style>
