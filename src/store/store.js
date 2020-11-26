import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const flattenObj = function (obj, parent, res = {}){
  for(let key in obj){
      let propName = key;
      if(typeof obj[key] == 'object'){
          flattenObj(obj[key], propName, res);
      } else {
          res[propName] = obj[key];
      }
  }
  return res;
}

export const store = new Vuex.Store({
  state: {
    geoviewer: {
      accessToken: `pk.eyJ1IjoiZ2V0c2VydmVkMDYiLCJhIjoiY2todmUzOWpwMTRwMzJ1cGdlYnQ2dXVmZyJ9.tpYmHGiXb8DYPfih1dReHw`,
      mapStyle: `mapbox://styles/mapbox/streets-v11`,
      sourceId: `firstSource`,
      layerId: `firstLayer`,
      markerCoordinates: [50, 50],
      center: [151.209152, -33.875305],
      zoom: 15,
      doFilter: false,
      geoJSON: null,
      flattenJSON: null,
      filtered: null,
      filterExp: ['all'],
      filterCount: 0,
      mapLoaded: false
    },
    sidebar: {
      tabs: [
        {
          title: `Search`,
          icon: `pushpin`,
          controllers: [
            {
              type: `AutoComplete`,
              props: {
                name: `Address`,
                dataSourceName: `getAddresses`,
                onSelect: `gotoAddress`
              }
            }
          ]
        },
        {
          title: `Filters`,
          icon: `control`,
          filterBadge: true,
          controllers: [
            {
              type: `AutoComplete`,
              filter: true,
              category: true,
              props: {
                name: `Category`,
                filterName: 'SubCategory',
                type: `category`,
                dataSourceName: `getCategories`,
                onSelect: ``,
                value: ``,
                disabled: false
              }
            },
            {
              type: `DoubleRange`,
              filter: true,
              props: {
                name: `Site Area`,
                type: `number`,
                defaultValue: [0, 500],
                isDefaultDisabled: false,
                description: ``,
                min: 0.000,
                max: 5000.000,
                step: 10.000,
                value: [0,500],
                disabled: false
              }
            },
            {
              type: `DoubleRange`,
              filter: true,
              props: {
                name: `Floor Area`,
                type: `number`,
                defaultValue: [0, 500],
                isDefaultDisabled: false,
                description: ``,
                min: 0.000,
                max: 5000.000,
                step: 10.000,
                value: [0, 500],
                disabled: false
              }
            },
            {
              type: `DoubleRange`,
              filter: true,
              props: {
                name: `Storeys`,
                type: `number`,
                defaultValue: [0, 500],
                isDefaultDisabled: false,
                description: ``,
                min: 0.000,
                max: 5000.000,
                step: 10.000,
                value: [0, 500],
                disabled: false
              }
            },
            {
              type: `DoubleRange`,
              filter: true,
              props: {
                name: `Value`,
                type: `number`,
                defaultValue: [0, 500],
                isDefaultDisabled: false,
                description: ``,
                min: 0.000,
                max: 100000.000,
                step: 100.000,
                value: [0, 500],
                disabled: false
              }
            },
            {
              type: `RangePicker`,
              filter: true,
              props: {
                name: `Commence Date`,
                type: `date`,
                description: ``,
                value: [],
                disabled: false
              }
            },
            {
              type: `RangePicker`,
              filter: true,
              props: {
                name: `Completion Date`,
                type: `date`,
                description: ``,
                value: [],
                disabled: false
              }
            },
            {
              type: `RangePicker`,
              filter: true,
              props: {
                name: `Last Updated`,
                type: `date`,
                description: ``,
                value: [],
                disabled: false
              }
            },
            {
              type: `CheckBox`,
              filter: true,
              props: {
                name: `Ownership`,
                type: `check`,
                description: ``,
                plainOptions: ['PRIVATE', 'LOCAL GOVT', 'STATE'],
                value: ['PRIVATE', 'LOCAL GOVT', 'STATE'],
                disabled: false
              }
            },
            {
              type: `CheckBox`,
              filter: true,
              props: {
                name: `Dev. Type`,
                type: `check`,
                description: ``,
                plainOptions: ['New', 'Addition', 'Renovation', 'DO NOT USE – Refurbishment'],
                value: ['New', 'Addition', 'Renovation', 'DO NOT USE – Refurbishment'],
                disabled: false
              }
            },
            {
              type: `CheckBox`,
              filter: true,
              props: {
                name: `Stage`,
                type: `check`,
                description: ``,
                plainOptions: ['DA Approved', 'Construction', 'DA Pending', 'DA Refused', 'Other'],
                value: ['DA Approved', 'Construction', 'DA Pending', 'DA Refused', 'Other'],
                disabled: false
              }
            },
          ]
        }
      ]
    }
  },
  getters: {
    getAccessToken (state) {
      return state.geoviewer.accessToken
    },
    getMapStyle (state) {
      return state.geoviewer.mapStyle
    },
    getSourceId (state) {
      return state.geoviewer.sourceId
    },
    getLayerId (state) {
      return state.geoviewer.layerId
    },
    getMarkerCoordinates (state) {
      return state.geoviewer.markerCoordinates
    },
    getCenter (state) {
      return state.geoviewer.center
    },
    getZoom (state) {
      return state.geoviewer.zoom
    },
    getGeoJSON (state) {
      return state.geoviewer.geoJSON
    },
    getFilters (state) {
      let filters = [];
      state.sidebar.tabs.forEach((tab) => {
          const obj = tab.controllers.filter((controller) => {
            return controller.filter && controller.props.disabled
          })
          if(obj && obj.length > 0){
            filters = [...filters, ...obj]
          }
      })

      filters = filters.map((obj) => {
        return {'name': obj.props.filterName ? obj.props.filterName : obj.props.name, 'value': obj.props.value, 'type': obj.props.type}
      })

      return filters;

    },
    getFiltered (state) {
      return state.geoviewer.filtered
    },
    getFilterValue: (state) => (name) => {
      let value;
      state.sidebar.tabs.forEach( (el) => {
        el.controllers.forEach( (controller) => {
          if(controller.props.name === name){
            value = controller.props.value;
            return
          }
        })
        return
      })
      return value;
    },
    getDisabled: (state) => (name) => {
      let disabled;
      state.sidebar.tabs.forEach( (el) => {
        el.controllers.forEach( (controller) => {
          if(controller.props.name === name){
            disabled = controller.props.disabled;
            return
          }
        })
        return
      })
      return disabled;
    },
    getFlattenData (state) {
      return state.geoviewer.geoJSON.features.reduce((a, b) => {
        return a.concat(b)
      }, [])
    },
    getAddresses (state) {
      return state.geoviewer.geoJSON.features.map((geo) => {
         return geo.properties.project.Address;
      })
    },
    getCategories (state) {
      let rs = {};
      let arr = [];
      state.geoviewer.geoJSON.features.forEach((geo) => {
        const cat = geo.properties.project['Category'];
        const subcat = geo.properties.project['SubCategory'];

        if(cat in rs){
          if(subcat in rs[cat]){
            rs[cat][subcat]++;
          }else{
            rs[cat][subcat] = 1;
          }
        }else{
          rs[cat] = {};
        }
      })

      Object.entries(rs).forEach((cat) => {
        let subarr = [];
        Object.entries(cat[1]).forEach((subname) => {
          subarr.push({name: subname[0], count: subname[1]});
        });
        arr.push({name: cat[0], subcat: subarr});
      });

      return arr;
    }
  },
  mutations: {
    setMapLoaded (state, val) {
      state.geoviewer.mapLoaded = val;
    },
    setFilterCount (state, val) {
      state.geoviewer.filterCount = val;
    },
    setCenter (state, val) {
      state.geoviewer.center = val;
    },
    setFilterExp (state, exp) {
      state.geoviewer.filterExp = exp;
    },
    setFiltered (state, data) {
      state.geoviewer.filtered = data;
    },
    setFilterValue (state, obj) {
      state.sidebar.tabs.forEach( (el) => {
        el.controllers.forEach( (controller) => {
          if(controller.props.name === obj.name){
            controller.props.value = obj.value;
          }
        })
      })
    },
    setDisabled (state, obj) {
      state.sidebar.tabs.forEach( (el) => {
        el.controllers.forEach( (controller) => {
          if(controller.props.name === obj.name){
            controller.props.disabled = obj.disabled;
          }
        })
      })
    },
    SET_GEOJSON: (state, data) => {
      state.geoviewer.geoJSON = data;
    }
  },
  actions: {
    gotoAddress (context, obj) {
      const geoJSON = context.state.geoviewer.geoJSON.features;
      geoJSON.filter((geo) => {
        if(geo.properties.project.Address === obj.value){
          context.commit('setCenter', geo.geometry.coordinates);
        }
      })
    },
    doFilterExp (context) {
      let filters = context.getters.getFilters;

      let exp = ['all'];
/*
      let rs = {}
      context.state.geoviewer.geoJSON.features.forEach((geo) => {
        const val = geo.properties.project['Stage'];
        if(val in rs){
          rs[val]++;
        }else{
          rs[val] = 0;
        }
      })
      console.log(rs);
*/
      context.commit('setFilterCount', filters.length);

      filters.forEach((filter) => {
        const name = filter.name;
        const value = filter.value;
        const type = filter.type;

        if(Array.isArray(value)){
          if(type === "number"){
            if(value.length > 0){
              const props = ['>=', ['to-number',['get', name, ['get', 'project']]], value[0]];
              const props2 = ['<=', ['to-number',['get', name, ['get', 'project']]], value[1]];
              exp.push(props, props2);
            }
          }else if(type === "category"){
            return;
          }else if(type === "check"){
            const props = ['in', ['get', name, ['get', 'project']], ['literal', value]];
            exp.push(props);
          }else if(type === "date"){
            if(value.length > 0){
              if(value[0]){
                const start = value[0].toDate();
                const startYear = start.getUTCFullYear().toString();
                const startMonth = (start.getUTCMonth()+1).toString().padStart(2, '0');
                const startDay = start.getUTCDate().toString().padStart(2, '0');
                const startDate = startYear+startMonth+startDay
                const props = ['>=',['to-number', ['concat', '20', ['slice',['get', name, ['get', 'project']], 6, 8], ['slice',['get', name, ['get', 'project']], 3, 5], ['slice',['get', name, ['get', 'project']], 0, 2]]], ["to-number",startDate]];
                exp.push(props);
              }
              if(value[1]){
                const end = value[1].toDate();
                const endYear = end.getUTCFullYear().toString();
                const endMonth = (end.getUTCMonth()+1).toString().padStart(2, '0');
                const endDay = end.getUTCDate().toString().padStart(2, '0');
                const endDate = endYear+endMonth+endDay
                const props = ['<=',['to-number', ['concat', '20', ['slice',['get', name, ['get', 'project']], 6, 8], ['slice',['get', name, ['get', 'project']], 3, 5], ['slice',['get', name, ['get', 'project']], 0, 2]]], ["to-number",endDate]];
                exp.push(props);
              }
            }
          }
        }else if(typeof(value) === "string"){
          const props = ['in',['get', name, ['get', 'project']], value];
          exp.push(props);
        }
      })
      console.log(exp);
      context.commit('setFilterExp', exp);
    },
    doFilter (context) {
      let filtered = context.state.geoviewer.geoJSON.features

      let filters = context.getters.getFilters;

      filters.forEach((filter) => {
        const name = filter.name;
        const value = filter.value;

        filtered = filtered.filter((el) => {
          const flatten = flattenObj(el);
          if(flatten[name]){
            if(Array.isArray(value)){
              return flatten[name] >= value[0] && flatten[name] <= value[1]
            }else if(typeof(value) === "string"){
              return false;
            }else if(typeof(vavlue) === "number"){
              return false;
            }
          }
        })
      })

      context.commit('setFiltered', filtered);

      return filtered;
    }
  }
})
