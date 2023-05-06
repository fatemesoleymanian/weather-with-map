<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{ city.city }}</h2>
            <h3>{{ city.state }}</h3>
        </div>

        <div class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round(weather.temp) }}&deg;
            </p>
            <div class="flex gap-2">
                <span class="text-xs">
                    H:
                    {{ Math.round(weather.temp_max) }}&deg;
                </span>
                <span class="text-xs">
                    L:
                    {{ Math.round(weather.temp_min) }}&deg;
                </span>
            </div>
        </div>
    </div>
</template>
  
<script >
export default {
    props: {
        city: {
            type: String,
            default: () => { },
        },
        weather:{
            type:Object,

        }
    }
}

</script>