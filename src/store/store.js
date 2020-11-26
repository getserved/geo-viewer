/* Store management of shared states and mutations among all the components */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 *obj@params Object: a nested object waiting for flatten
 *parent@params Object: object's parent object to concat to
 * this method is used to flatten a nested object into a one-level object
*/
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
      isLandscape: false,
      accessToken: ``,  // access token from mapbox's account
      mapStyle: `mapbox://styles/mapbox/streets-v11`, // style file name from mapbox
      sourceId: `archistar`,                          // Source ID for geoJSON
      layerId: `points`,                              // Layer ID for geoJSON
      markerCoordinates: [50, 50],                    // Marker's coordinates when displayed
      center: [151.209152, -33.875305],               // Map's center when displayeed
      zoom: 15,                                       // Zoom value for zoom control
      doFilter: false,
      geoJSON: null,                                  // GeoJSON json object loaded when map initating
      flattenJSON: null,                              // For flatten data search
      filtered: null,
      filterExp: ['all'],                             // Filter expression generetaed for mapbox's layer filter
      filterCount: 0,                                 // Count of filters applied
      mapLoaded: false                                // True when map is fully loaded
    },
    // Sidebar manage all the function buttons and controllers
    sidebar: {
      tabs: [ // Tabs are for navigation controls
        {
          title: `Search`,  // Display title for Tab Panel
          icon: `pushpin`,  // Display icon for navigator
          controllers: [    // Controllers manage dynamic controller used in different tabs
            {
              type: `AutoComplete`,               // @Mandatory Component type equals to Component's class name
              props: {                            // @Mandatory Properties for dynamic component generagor
                name: `Address`,                  // @Mandatory Display of Controller's name
                dataSourceName: `getAddresses`,   // datasourceName ia assigned to datasource in real-time
                onSelect: `gotoAddress`           // Bind callback function name when select
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
                type: `category`,                  // Iindicates how to generate filter expression in doFilterExp()
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
                defaultValue: [0, 20000000],
                isDefaultDisabled: false,
                description: ``,
                min: 0.000,                         // Min value for range input
                max: 20000000.000,                  // Max value for range input
                step: 10.000,                       // Step value for range input
                value: [0,20000000],                // @Array(2) [min, max] value for range input
                disabled: false
              }
            },
            {
              type: `DoubleRange`,
              filter: true,
              props: {
                name: `Floor Area`,
                type: `number`,
                defaultValue: [0, 100000],
                isDefaultDisabled: false,
                description: ``,
                min: 0.000,
                max: 100000.000,
                step: 100.000,
                value: [0, 100000],
                disabled: false
              }
            },
            {
              type: `DoubleRange`,
              filter: true,
              props: {
                name: `Storeys`,
                type: `number`,
                defaultValue: [0, 100],
                isDefaultDisabled: false,
                description: ``,
                min: 0.000,
                max: 100.000,
                step: 5.000,
                value: [0, 100],
                disabled: false
              }
            },
            {
              type: `DoubleRange`,
              filter: true,
              props: {
                name: `Value`,
                type: `number`,
                defaultValue: [0, 1000000],
                isDefaultDisabled: false,
                description: ``,
                min: 0.000,
                max: 1000000.000,
                step: 100.000,
                value: [0, 1000000],
                disabled: false
              }
            },
            {
              type: `RangePicker`,                    // RangePicker component acquires input [startDate, endDate]
              filter: true,
              props: {
                name: `Commence Date`,
                type: `date`,
                description: ``,
                value: [],                            // @Array(2) [startDate, endDate] value for RangePicker
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
              type: `CheckBox`,                       // CheckBox component acquires multiple inputs in an Array
              filter: true,
              props: {
                name: `Ownership`,
                type: `check`,
                description: ``,
                plainOptions: ['PRIVATE', 'LOCAL GOVT', 'STATE'],   // @Mandatory options in checkbox group display
                value: ['PRIVATE', 'LOCAL GOVT', 'STATE'],          // Default value for checkbox group
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
    getIsLandscape (state) {
      return state.geoviewer.isLandscape
    },
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
    // Get all filters from mutated sidebar
    getFilters (state) {
      let filters = [];
      // Iterate all controllers in all tabs to find all mutated props
      state.sidebar.tabs.forEach((tab) => {
          const obj = tab.controllers.filter((controller) => {
            return controller.filter && controller.props.disabled
          })
          if(obj && obj.length > 0){
            filters = [...filters, ...obj]
          }
      })

      // Iterate all mutated props to generate filters
      filters = filters.map((obj) => {
        return {'name': obj.props.filterName ? obj.props.filterName : obj.props.name, 'value': obj.props.value, 'type': obj.props.type}
      })

      return filters;

    },
    getFiltered (state) {
      return state.geoviewer.filtered
    },
    // Get Filter's value by its name
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
    // Get Disabled component by its name
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
    // Get all address properties from json object
    getAddresses (state) {
      return state.geoviewer.geoJSON.features.map((geo) => {
         return geo.properties.project.Address;
      })
    },
    // Get all category properties from json object
    getCategories (state) {
      let rs = {};
      let arr = [];

      // Iterate all features data to count different categories and sub categories
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

      // Transform object data into array for dataSource
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
    setIsLandscape (state, val) {
      state.geoviewer.isLandscape = val;
    },
    setAccessToken (state, val) {
      state.geoviewer.accessToken = val;
    },
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
    // Dynamic Setter of value by component's name
    setFilterValue (state, obj) {
      state.sidebar.tabs.forEach( (el) => {
        el.controllers.forEach( (controller) => {
          if(controller.props.name === obj.name){
            controller.props.value = obj.value;
          }
        })
      })
    },
    // Dynamic Setter of disabled by component's name
    setDisabled (state, obj) {
      state.sidebar.tabs.forEach( (el) => {
        el.controllers.forEach( (controller) => {
          if(controller.props.name === obj.name){
            controller.props.disabled = obj.disabled;
          }
        })
      })
    },
    // Set GeoJSON file data
    SET_GEOJSON: (state, data) => {
      state.geoviewer.geoJSON = data;
    }
  },
  actions: {
    // Reset center to a precise address
    gotoAddress (context, obj) {
      const geoJSON = context.state.geoviewer.geoJSON.features;
      geoJSON.filter((geo) => {
        if(geo.properties.project.Address === obj.value){
          context.commit('setCenter', geo.geometry.coordinates);
        }
      })
    },
    // Generate mapbox gl expression for layer's filtering
    doFilterExp (context) {
      // Get all filters by mutated sidebar states
      const filters = context.getters.getFilters;

      /* Init expression to 'all'
       * 'all': return true when all criteria matches
       * 'any': return true when any of the criteria matches
      */
      let exp = ['all'];
      // Set filter count for watchers
      context.commit('setFilterCount', filters.length);

      /* Iterate to hanlde criteria in array
       * name@Param String: criteria's property name
       * value@Param : criteria's property value, could be in many forms
       * type@Param String: indicates how expressions are generated
      */
      filters.forEach((filter) => {
        const name = filter.name;
        const value = filter.value;
        const type = filter.type;

        // Generate expressions if value is an array
        if(Array.isArray(value)){
          // Array handler for range of numbers
          if(type === "number"){
            if(value.length > 0){
              const props = ['>=', ['to-number',['get', name, ['get', 'project']]], value[0]];
              const props2 = ['<=', ['to-number',['get', name, ['get', 'project']]], value[1]];
              exp.push(props, props2);
            }
          // Array handler for multiple selections of strings
          }else if(type === "check"){
            const props = ['in', ['get', name, ['get', 'project']], ['literal', value]];
            exp.push(props);
          // Array handler for date range
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
        // String handler if string appears in value
        }else if(typeof(value) === "string"){
          const props = ['in',['get', name, ['get', 'project']], value];
          exp.push(props);
        }
      })

      // Commit mutation to set filter's expressions
      context.commit('setFilterExp', exp);
    },
    /* NOT USING
     * Off map filter handler to search in  flatten json
    */
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
