<template lang="html">
	<div class="auto-complete">
    <div v-if="!category">
      <a-auto-complete
        v-model="value"
        :dataSource="dataSource"
        :filter-option="filterOption"
        @select="handleSelect"
        style="width: 100%"
        dropdown-class-name="certain-category-search-dropdown"
        class="certain-category-search"
        size="large"
       />
     </div>
     <div v-else>
       <a-auto-complete
          class="certain-category-search"
          dropdown-class-name="certain-category-search-dropdown"
          :dropdown-match-select-width="false"
          :dropdown-style="{ width: '300px' }"
          size="large"
          style="width: 100%"
          placeholder="input here"
          option-label-prop="value"
          v-model="value"
        >
          <template slot="dataSource">
            <a-select-opt-group v-for="group in dataSource" :key="group.name">
              <span slot="label">
                {{ group.name }}
              </span>
              <a-select-option v-for="opt in group.subcat" :key="opt.name" :value="opt.name">
                {{ opt.name }}
                <span class="certain-search-item-count">{{ opt.count }}</span>
              </a-select-option>
            </a-select-opt-group>
            <a-select-option key="all" disabled class="show-all">
                View all results
            </a-select-option>
          </template>
          <a-input>
            <a-icon slot="suffix" type="search" class="certain-category-icon" />
          </a-input>
        </a-auto-complete>
     </div>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
/** Component */

export default {
	props: {
		name: String,
    dataSourceName: String,
    onSelect: String,
    category: Boolean
	},
  data () {
    return {
      dataSource: this.$store.getters[this.dataSourceName]
    }
  },
	components: {
	},
	computed: {
    // Getter and Setter for v-model value
    ...mapState(['sidebar']),
		value: {
			set (value) {
				this.$store.commit('setFilterValue', {name:this.name, value: value})
			},
			get () {
				const val = this.$store.getters['getFilterValue'](this.name);
				return val
			}
		},
    ...mapGetters([
      'getAddresses',
      'getCategories'
    ]),
	},
	methods: {
    // Case insensitive settings
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      );
    },
    // Handle actions when selected
    handleSelect (value) {
      this.$store.dispatch(this.onSelect, {'value': value});
    }
	}
};

</script>

<style lang="scss" scoped>
.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}
.certain-category-search-wrapper
  >>> .certain-category-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 12px;
}
.certain-category-search-wrapper >>> .certain-search-item-count {
  position: absolute;
  color: #999;
  right: 16px;
}
.certain-category-search-wrapper
  >>> .certain-category-search.ant-select-focused
  .certain-category-icon {
  color: #108ee9;
}
.certain-category-search-wrapper >>> .certain-category-icon {
  color: #6e6e6e;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 16px;
}
</style>
