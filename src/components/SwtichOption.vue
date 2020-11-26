<template lang="html">
	<div class="swtich-option">
		<div class="swtich-container">
			<div class="swtich-wrapper">
				<div class="swtich-title">{{name}}</div>
				<a-switch size="small" :checked="disabled" @change="handleDisabledChange" />
			</div>
			<transition name="slide-fade">
        <div v-if="disabled">
					<component :is="type" :category="controller.category" v-bind="controller.props"/>
        </div>
			</transition>
		</div>
	</div>
</template>

<script>
import DoubleRange from './filters/DoubleRange.vue'
import AutoComplete from './filters/AutoComplete.vue'
import RangePicker from './filters/RangePicker.vue'
import CheckBox from './filters/CheckBox.vue'
import { mapState } from 'vuex'
/** Component */
export default {
	props: {
    name: String,
    type: String,
    controller: Object
	},
	components: {
    DoubleRange,
    AutoComplete,
    RangePicker,
    CheckBox
	},
	computed: {
    ...mapState(['sidebar']),
		disabled: {
			set (disabled) {
				this.$store.commit('setDisabled', {name:this.name, disabled: disabled})
			},
			get () {
				const disabled = this.$store.getters['getDisabled'](this.name);
				return disabled
			}
		}
	},
	methods: {
		handleDisabledChange: function (disabled) {
			this.$store.commit('setDisabled', {name:this.name, disabled: disabled});
		}
	}

};

</script>

<style lang="scss" scoped>
.swtich-wrapper{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
  margin: pxToRem(6) 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
