<template lang="html">
	<div ref="sideBar" class="sideBar">
		<a-layout style="min-height: 100vh">
			<a-layout-header>{{title}}</a-layout-header>
      <a-layout-content>
				<a-row :key="k" v-for="(controller, k) in controllers">
					<a-col>
						<keep-alive>
							<div class="component-wrapper">
								<SwtichOption v-if='controller.filter' :name="controller.props.name" :type="controller.type" :controller="controller" />
								<component v-else :is="controller.type" v-bind="controller.props" />
							</div>
						</keep-alive>
					</a-col>
				</a-row>
			</a-layout-content>
      <a-layout-footer></a-layout-footer>
		</a-layout>
	</div>
</template>

<script>
import DoubleRange from './filters/DoubleRange.vue'
import AutoComplete from './filters/AutoComplete.vue'
import RangePicker from './filters/RangePicker.vue'
import SwtichOption from './SwtichOption.vue'

/** Component */
export default {
	components: {
		DoubleRange,
		AutoComplete,
		RangePicker,
		SwtichOption
	},
	props:{
		title: String,
		controllers: Array
	},
	computed: {
	},
	mounted: function () {

	}
};

</script>

<style lang="scss" scoped>
.sideBar{
	padding: pxToRem(12);
}
.ant-layout-header{
	background-color: #fff
}
.ant-layout-content{
	background-color: #fff;
}
.ant-layout-footer{
	background-color: #fff;
}
.component-wrapper{
	margin: pxToRem(12);

	&:after{
		content: "";
		position: absolute;
		height: 1px;
		width: 100%;
		background-color: $colorGrey;
		bottom: 0;
		left: 50%;
		margin-bottom: pxToRem(-12);
		transform: translateX(-50%);
	}
}
.ant-layout-header{
	font-size: pxToRem(24);
	font-weight: bold;
}
</style>
