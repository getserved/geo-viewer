<template>
  <div class="geoviewer">
    <a-layout id="components-layout-demo-side"  style="min-height: 100vh">
    <a-layout-sider ref="menu" width="400" theme="light" collapsed class="collapsed">
      <a-button class="backBtn" type="primary" shape="circle" icon="left" :class="{'show': collapsed}" @click="handleBackBtn"/>
      <a-tabs
        :ref="tabs"
        tab-position="left"
        @tabClick="callback"
        class="tabs"
        :class="{show: mapLoaded}"
      >
        <a-tab-pane key="0">
          <span slot="tab">
          </span>
        </a-tab-pane>
        <a-tab-pane :key="k+1" v-for="(tab, k) in tabs">
          <span slot="tab">
            <a-badge class="badge" :count="count" v-if="tab.filterBadge" :overflow-count="5">
              <a-icon :type="tab.icon" style="font-size:24px;min-width:36px;min-height:36px;"/>
            </a-badge>
            <a-icon v-else :type="tab.icon" style="font-size:24px;min-width:36px;min-height:36px;"/>
          </span>
          <div class="tab-pane" :class="{'show': collapsed}">
            <side-bar :title="tab.title" :controllers="tab.controllers"/>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <map-box />
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>

<script>
import MapBox from './MapBox.vue'
import SideBar from './SideBar.vue'
import geoJSON from '../assets/json/geoJson.json'

export default {
  name: 'GeoViewer',
  props: {
  },
  data () {
    //Loading geoJSON file to store
    this.$store.commit('SET_GEOJSON', geoJSON);
    return {
      collapsed: false
    }
  },
  components: {
    'map-box': MapBox,
    'side-bar': SideBar
  },
  computed: {
    tabs: function () {
			return this.$store.state.sidebar.tabs
		},
    count: function () {
        return this.$store.state.geoviewer.filterCount
    },
    mapLoaded: function () {
      return this.$store.state.geoviewer.mapLoaded
    }
  },
  watch:{
    // watch filters change recursively
    '$store.state.sidebar': {
      deep: true,
      handler () {
        this.$store.dispatch('doFilterExp');
      }
    }
  },
  mounted: function () {
    this.$store.commit('setAccessToken', process.env.VUE_APP_ACCESS_TOKEN)
  },
  methods: {
    // Collapsed the tabs when user click back btn
    handleBackBtn: function () {
      const menu = this.$refs.menu;
      if(menu.collapsed){
        this.collapsed = false;
        menu.setState({
          sCollapsed: true
        });
      }
    },
    // expand tabs when user click tab
    callback () {
      const menu = this.$refs.menu;
      if(menu.collapsed){
        this.collapsed = true;
        menu.setState({
          sCollapsed: false
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.collapsed{
  width: 80px;
}
/deep/ .ant-tabs .ant-tabs-left-content{
  padding-left: 0;
}
.tabs{
  opacity: 0;
  transition: all .5s ease-in-out;
  pointer-events: none;

  &.show{
    opacity: 1;
    pointer-events: auto;
  }
}
.backBtn{
  position: absolute;
  top:1%;
  right: 0;
  z-index: 10;
  transition: all 1s ease-in-out;
  opacity: 0;
  transform: translateX(50%);

  &.show{
    opacity: 1;
  }
}
.tab-pane{
  transition: all .5 ease-in-out;
  opacity: 0;

  &.show{
    opacity: 1;
  }
}
/deep/ .ant-tabs-bar {

}
/deep/ .ant-layout-sider-children{
  height: 100vh;
}
/deep/ .ant-tabs .ant-tabs-left-content{
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0 !important
  }
}
.badge{
  /deep/ .ant-badge-count{

  }
}
</style>
