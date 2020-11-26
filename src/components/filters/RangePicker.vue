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
		}
	},
	methods: {
		// Set dynamic style when focus on picker
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
