<template>
	<div class="check-box">
    <a-checkbox-group class="checkbox-group" :disabled="!disabled" v-model="value" :options="plainOptions"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	props: {
		name: String,
		plainOptions: Array,
		defaultCheckedList: Array,
		disabled: Boolean
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
  },
};
</script>
<style lang="scss" scoped>
.check-box .ant-checkbox-group{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	/deep/ .ant-checkbox-group-item{
		flex: 1 1 20%;
		margin: 0 pxToRem(6);
		margin-top: pxToRem(6);

		.ant-checkbox{
			display: none;
		}
	}

	/deep/ .ant-checkbox + span{
		display: block;
		white-space: nowrap;
	}
}

/deep/ .ant-checkbox-wrapper{
	border-radius: 10px;
	color: $colorDarkGrey;
	background: $colorGrey;

	&.ant-checkbox-wrapper-checked{
		background: $colorBlue;
		color: white;
	}
}
</style>
