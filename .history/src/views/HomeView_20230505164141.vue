<template>
  <main class="container text-white">


    <div class="search-box pt-10  mb-8 relative px-12 md:px-14 lg:px-32">
      <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a city or state"
        class="search-bar py-2 px-1  bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
      <i class="fas fa-dot-circle absolute right-36 top-16" @click="currentCity"></i>
      <ul class="absolute bg-weather-secondary w-3/4 md:w-100 text-white shadow-md py-2 px-1 top-[102px]"
        v-if="mapboxSearchResults">
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p class="py-2" v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer"
            @click="previewCity(searchResult)">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>

      <!-- Map -->
      <!-- <div>
        <MglMap mapStyle="https://api.maptiler.com/maps/streets/style.json?key=tZVs0ZFomP3biIShjxuD" 
          :zoom=zoom
          :center="[lon, lat]">
          <MglNavigationControl position="top-left" />
        </MglMap>
      </div> -->
      <!-- map -->
    </div>

    <div class="flex flex-col gap-4">
      <!-- <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense> -->
    </div>
  </main>
</template>

<script >

import axios from "axios";
import { useRouter } from "vue-router";

// import { MglMap, MglNavigationControl } from 'vue-maplibre-gl';

export default {
  components: {
    // MglMap, MglNavigationControl
  },

  data() {
    return {
      router: useRouter(),
      mapboxAPIKey: 'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q',
      mapBoxBaseUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
      searchQuery: "",
      queryTimeout: null,
      mapboxSearchResults: null,
      searchError: null,
      lon: 16,
      lat: 49,
      zoom:14
    }
  },



  methods: {
    previewCity(searchResult) {
      const [city, state] = searchResult.place_name.split(",");
      this.router.push({
        name: "cityView",
        params: { state: state.replaceAll(" ", ""), city: city },
        query: {
          lat: searchResult.geometry.coordinates[1],
          lng: searchResult.geometry.coordinates[0],
          preview: true,
        },
      });
    },

    currentCity() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            this.lon = position.coords.longitude;
            this.lat = position.coords.latitude;

            try {
              const city = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${this.lat}&lon=${this.lon}&limit=1&appid=eb0ed08b5e5fa33a9c9cc66ad7e2f028`)
              this.searchQuery = city.data[0].name;

            } catch (err) {
              console.log('error in fetch weather of your location' + err)

            }

          },
          (err) => {
            //TODO***************
            alert(err + ' i should be a noification i say this service is not supported in your country.')

          }, { enableHighAccuracy: true }
        );
      }
      else {
        console.log('sth went wrong')
      }
    },

    getSearchResults() {
      clearTimeout(this.queryTimeout);
      this.queryTimeout = setTimeout(async () => {
        // console.log(import.meta.env.VUE_APP_MAP_BOX_KEY)
        if (this.searchQuery !== "") {
          try {
            const result = await axios.get(
              `${this.mapBoxBaseUrl}${this.searchQuery}.json?access_token=${this.mapboxAPIKey}&types=place`
            );
            this.mapboxSearchResults = result.data.features;
          } catch {
            this.searchError = true;
            console.log('Unauthorized')
          }

          return;
        }
        this.mapboxSearchResults = null;
      }, 300);

    }
  },


}


</script>
<style >

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
