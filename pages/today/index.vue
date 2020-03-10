<template name="mainToday">
	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/myday-banner2.png"
			 mode="widthFix" class="response"></image>
			<view class="nav-list" style="padding: 0rpx;">
				<view class="cu-bar bg-white solid-bottom" style="width: 100%;">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 记录
					</view>
				</view>
				
				<event-create ref="eventCreate" style="width: 100%;"></event-create>
				<today :events="events" @touchstart="this.$refs.eventCreate.addStyle=false" style="width: 100%;"></today>

			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import {getEvent} from '../../common/api.js'
	import {dateUtils} from '../../common/util.js'
	export default {
		created() {
			this.fetchEvent()
			uni.$on('event:created',this.fetchEvent)
			uni.$on('event:updated',this.fetchEvent)
		},
		data() {
			return {
				events: []
			};
		},
		
		watch:{
		},
		methods:{
			fetchEvent(){
				getEvent().then((res) => {
					var now = new Date().getTime();
					res.forEach(e => {
						e.updateTimeLabel = dateUtils.humanize(now-e.updateTime)
					})
					this.events = res;
				})
			}
			

		}
		
	}
</script>

<style>
.switch-day::after {
	content: "\e7b4";
}

.switch-day::before {
	content: "\e7b5";
}

.switch-day .wx-switch-input,
.switch-day .uni-switch-input {
	color: #e54d42;
	background: #e54d42;
	border-color: #e54d42;
}

.switch-day[checked] .wx-switch-input,
.switch-day.checked .uni-switch-input {
	color: #39b54a;
	background: #39b54a;
	border-color: #39b54a;
}
</style>
