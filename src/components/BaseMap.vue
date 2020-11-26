<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'BaseMap',
  data () {
    return {
      accessToken: 'pk.eyJ1IjoiZ2V0c2VydmVkMDYiLCJhIjoiY2todmUzOWpwMTRwMzJ1cGdlYnQ2dXVmZyJ9.tpYmHGiXb8DYPfih1dReHw'
    };
  },
  watch:{
    '$store.state.geoviewer.filtered': {
      deep: true,
      handler () {
        //const newVal = this.$store.getters['getFiltered'];
      }
    }
  },
  mounted () {
    mapboxgl.accessToken = this.accessToken;

    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [150.000000, -30.000000],
      zoom: 5
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    new mapboxgl.Marker()
      .setLngLat([150.000000, -30.000000])
      .addTo(map);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map.addControl(geolocate, 'top-right')
  }
};
</script>
<style lang="scss" scoped>
.basemap {
  width: 100vw;
  height: 100vh;
}
</style>
