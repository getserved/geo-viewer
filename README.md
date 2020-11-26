# geo-viewer
> geo-viewer is building a root view for rendering map from a geoJSON file. User could search for precise address and filtering by different controllers

## Table of contents
* [Components](#components)
* [MapBox GL](#mapbox-gl)
* [Technologies](#technologies)
* [Setup](#setup)

# Components
> Double Range Input allows user to slide from min to max values
> Range Picker allows user to select start date and end date 
> Checkbox allows user to swtich filter on/off
> AutoComplete has two modes:
>> 1. Search from addresses
>> 2. Search from categories with sub categories

# MapBox GL
> Mapbox uses JSON Web Tokens (JWT) as the token format. Each token is a string delimited by dots into three parts: header, payload, and signature as described in the Tokens API documentation. Every token has a metadata object that contains properties with information about the token, like id (unique identifier) ,note (human readable name),scopes (capabilities), allowedURLs (URLs that token is authorized for), and timestamps for created and modified (last modification).

Access tokens can be created, deleted, and managed on your Access Tokens page. Note that deleting a token is an action that cannot be reversed - token deletion is permanent. Deleted tokens or the timestamp corresponding to their deletion are not available on the Access Tokes page.

## Technologies
Vue 2.6.12
vuex 3.5.1
vue-mapbox 0.4.1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
