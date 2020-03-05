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
	export default {
		created() {
			this.fetchEvent()
			uni.$on('event:created',this.fetchEvent)
		},
		data() {
			return {
				events: [{
					subject: "英语单词",
					text: "使用扇贝记单词记30个单词",
					classify: "INPUT",
					type: "EVERYDAY",
					status: "TODO",
				},{
					subject: "英语口语",
					classify: "INPUT",
					type: "MONTHLY",
					status: "TODO"
				},{
					subject: "跑步五公里",
					classify: "INPUT",
					type: "PHYSICAL_AGILITY",
					status: "FULFILL"
				},{
					subject: "公众号文章",
					text: "在我的公众号是输出高质量文章",
					classify: "OUTPUT",
					type: "WEEKLY",
					status: "FULFILL",
					timeDo: "8:30"
				},{
					subject: "读《人类简史》",
					text: "才读了2章，感觉还不错。过几天写个读后感",
					classify: "INPUT",
					type: "GENERIC",
					status: "FULFILL",
					timeDo: "9:30"
				}],
							
				
				
			};
		},
		
		watch:{
		},
		methods:{
			fetchEvent(){
				getEvent().then((res) => {
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
