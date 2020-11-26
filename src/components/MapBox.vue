<template>
  <MglMap
    :accessToken="getAccessToken"
    :mapStyle.sync="getMapStyle"
    :zoom="getZoom"
    :center="getCenter"
    @load="handleOnLoad"
  >
    <MglNavigationControl position="top-right"/>
    <MglGeolocateControl position="top-right" />
    <MglMarker :coordinates="popupCoordinates" color="blue" />
    <MglGeojsonLayer
      sourceId="test"
      :source="geoJsonData"
      layerId="myLayer"
      :layer="geoJsonLayer"
    />
  </MglMap>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglNavigationControl, MglGeolocateControl, MglMarker, MglGeojsonLayer } from "vue-mapbox";
import { mapGetters } from 'vuex'

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglMarker,
    MglGeojsonLayer
  },
  data() {
    return {
      popupCoordinates: [150.209155, -33.875305],

    }
  },
  computed: {
    ...mapGetters([
      'getAccessToken',
      'getMapStyle',
      'getCenter',
      'getMarkerCoordinates',
      'getZoom'
    ]),
    geoJsonData () {
      return {"type": "geojson", "data":this.$store.state.geoviewer.geoJSON};
    },
    geoJsonLayer() {
      return {
        type: "circle",
        paint: {
          'circle-radius': {
            'base': 1.75,
            'stops': [
            [12, 2],
            [22, 180]
            ]
            },
           "circle-color": ['get', 'color']
        },
        filter: this.$store.state.geoviewer.filterExp
      }
    }
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    handleOnLoad: function () {
      console.log('mapLoaded');
      this.$store.commit('setMapLoaded', true);
    }
  }
};
</script>
