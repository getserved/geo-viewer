<template lang="html">
	<div class="range-picker">
		<a-range-picker v-model="value">
      <template slot="dateRender" slot-scope="current">
        <div class="ant-calendar-date" :style="getCurrentStyle(current)">
          {{ current.date() }}
        </div>
      </template>
    </a-range-picker>
	</div>
</template>

<script>
import { mapState } from 'vuex'
/** Component */
export default {
	props: {
		name: String
	},
  data () {
    return {

    }
  },
	components: {
	},
	computed: {
    ...mapState(['sidebar']),
		value: {
			set (value) {
				this.$store.commit('setFilterValue', {name:this.name, value: value})
				console.log(this.$store.state.sidebar.tabs[1].controllers[4].props);
			},
			get () {
				const val = this.$store.getters['getFilterValue'](this.name);
				return val
			}
		}
	},
	methods: {
		getCurrentStyle(current) {
      const style = {};
      if (current.date() === 1) {
        style.border = '1px solid #1890ff';
        style.borderRadius = '50%';
      }
      return style;
    },
	}
};

</script>

<style lang="scss" scoped>
</style>
