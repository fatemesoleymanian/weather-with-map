<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <Navigation />
    <RouterView />
  </div>
</template>

<script>
// import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue'
export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 30px;
  width: 100%;
}

.search-box .search-bar {
  border-radius: 0 15px 0 15px;
  display: block;
  padding: 15px;
  width: 100%;
  font-size: 20px;
  border: none;
  background: none;
  appearance: none;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  transition: 0.4s;
}

.search-box .search-bar:focus {
  outline: none;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
  border-radius: 15px 0px 15px 0px;
}
</style>
