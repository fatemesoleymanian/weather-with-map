<template>
    <div v-for="city in savedCities" :key="city.id">
      <!-- <p class="text-center">{{ city.weather }}</p><br><br><br>mmmmmmmmmmmmmm -->
      <CityCard :city="city" :temp="city.temp" :temp_min="city.temp_min" :temp_max="city.temp_max"
       @click="goToCityView(city)" />
    </div>
  
    <p v-if="savedCities.length === 0">
      No locations added. To start tracking a location, search in
      the field above.
    </p>
  </template>
  <script>
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import CityCard from "./CityCard.vue";
  
  export default {
    components: {
      CityCard,
    },
  
    setup() {
      const savedCities = ref([]);
      const router = useRouter();
      const api_key = process.env.VUE_APP_OPENWEATHER_API_KEY
  
      const getCities = async () => {
        if (localStorage.getItem("savedCities")) {
          savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  
          const requests = [];
          savedCities.value.forEach((city) => {
            requests.push(
              axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${api_key}&units=imperial`
              )
            );
          });
  
          const weatherData = await Promise.all(requests);
  
          weatherData.forEach((value, index) => {
            savedCities.value[index].temp = value.data.main.temp;
            savedCities.value[index].temp_min = value.data.main.temp_min;
            savedCities.value[index].temp_max = value.data.main.temp_max;
          });
        }
      };
  
      getCities();

      const goToCityView = (city) => {
        router.push({
          name: "cityView",
          params: { state: city.state, city: city.city },
          query: {
            id: city.id,
            lat: city.coords.lat,
            lng: city.coords.lng,
          },
        });
      };
  
  
      return {
        savedCities,
        goToCityView,
      };
    },
  };
  </script>
  
  
  
  