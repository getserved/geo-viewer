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
    <MglMarker :coordinates="getCenter" color="blue" />
    <MglGeojsonLayer
      :sourceId="getSourceId"
      :source="geoJsonData"
      :layerId="getLayerId"
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
  computed: {
    ...mapGetters([
      'getSourceId',
      'getLayerId',
      'getAccessToken',
      'getMapStyle',
      'getCenter',
      'getMarkerCoordinates',
      'getZoom',
      'getCenter'
    ]),
    // add source to the map
    geoJsonData () {
      return {"type": "geojson", "data":this.$store.state.geoviewer.geoJSON};
    },
    // add json layer to the map
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
    // Set true when Map loaded to initiate navigations
    handleOnLoad: function () {
      this.$store.commit('setMapLoaded', true);
    }
  }
};
</script>
