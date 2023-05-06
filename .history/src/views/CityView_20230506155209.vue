<template>
    <div>
      <Suspense>
        <template #default>
          <AsyncCityView />
        </template>
        <template #fallback>
          <CityViewSkeleton />
        </template>
      </Suspense>
    </div>
  </template>
  
  <script>
  import AsyncCityView from "../components/AsyncCityView.vue";
  import CityViewSkeleton from "../components/CityViewSkeleton.vue";

  export default{
    components:{
        AsyncCityView,
        CityViewSkeleton
    }
  }
  </script>