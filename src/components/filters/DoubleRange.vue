<template lang="html">
	<div class="double-range">
		<div class="range-container">
			<transition name="slide-fade">
				<div v-if="disabled">
					<div class="range-slider">
						<a-input placeholder="Min" :disabled="!disabled" size="small" v-model="value[0]"/>
						<a-slider range :default-value="defaultValue" v-model="value" :disabled="!disabled" :min="min" :max="max" :step="step"  @change="handleSliderChange"/>
						<a-input placeholder="Max" :disabled="!disabled" size="small" v-model="value[1]"/>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
/** Component */
export default {
	props: {
		name: String,
		defaultValue: Array,
		min: Number,
		max: Number,
		step: Number,
		disabled: Boolean
	},
	components: {
	},
	computed: {
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
		handleDisabledChange: function (disabled) {
			this.$store.commit('setDisabled', {name:this.name, disabled: disabled});
		},
		handleSliderChange: function () {
		}
	}

};

</script>

<style lang="scss" scoped>
.range-container{
	display: flex;
	flex-direction: column;
}

.range-switch{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}

.range-slider{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	margin: 10px 5px;
}
.ant-slider{
	flex: 1 1 0%;
	margin: auto 20px;
}
.ant-input{
	width: 50px;
}
</style>
