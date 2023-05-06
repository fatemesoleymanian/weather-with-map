<template>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark">
      <img src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo" /></a>
    <div class="map" ref="mapContainer"></div>
    <button @click="locateMe">Find My Location</button>

  </div>
</template>


<script>
import { Map, NavigationControl, Marker, GeolocateControl } from 'maplibre-gl';
import { shallowRef, onMounted, onUnmounted, markRaw, toRefs } from 'vue';

export default {
  name: "MapComponent",
  emits: ['find-my-loc'],
  props: {
    lng: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { lng, lat } = toRefs(props);
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);

    onMounted(() => {
      const apiKey = process.env.VUE_APP_API_KEY;
      if (apiKey == null) {
        throw new Error("You need to configure env VUE_APP_API_KEY first, see README");
      }

      const initialState = { lng: lng.value, lat: lat.value, zoom: 14 };

      map.value = markRaw(new Map({
        container: mapContainer.value,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      }));
      
      const navControl = new NavigationControl();
      map.value.addControl(navControl, 'top-right');
      
      const geoControl = new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        fitBoundsOptions: {
          maxZoom: 14
        },
        trackUserLocation: true,
        showAccuracyCircle: false,
        showUserLocation: false
      });
      map.value.addControl(geoControl, 'top-right');

      new Marker({ color: "#FF0000" })
        .setLngLat([lng.value, lat.value])
        .addTo(map.value);
    });

    onUnmounted(() => {
      map.value?.remove();
    });

    function locateMe() {
      console.log('call current cityy1')
      this.$emit('find-my-loc')
      console.log('call current cityy2')
      map.value?.trigger('geolocate');
      console.log('call current cityy3')

    }

    return {
      map, 
      mapContainer,
      locateMe
    };
  }
};
</script>

  
<style scoped>
@import '~maplibre-gl/dist/maplibre-gl.css';

.map-wrap {
  z-index: 10;
  position: relative;
  width: 100%;
  height: calc(100vh - 77px);
  /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>