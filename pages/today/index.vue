<template name="today">
	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/index.jpg"
			 mode="widthFix" class="response"></image>
			<view class="nav-list" style="padding: 0rpx;">
				<view class="cu-bar search bg-white" style="width: 100%;">
					<view class="search-form round">
						<text class="cuIcon-read"></text>
						<input :adjust-position="false" type="text" placeholder="记录今天的输入、输出、体能" confirm-type="search"></input>
					</view>
				</view>
				<view class="cu-list menu" style="width: 100%;">
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> 今天
						</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in events" :key="index"
						 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
							<view class="cu-avatar round lg " 
							:class="item.classify == 'INPUT'?'cuIcon-read':'cuIcon-write'"
							:style="{backgroundColor:item.status == 'TODO'?'orange':'gray'}"></view>
							<view class="content">
								<view :class="item.status == 'TODO'?'text-orange':'text-gray'">
									<view class="text-cut">{{item.name}}</view>
									<view class="cu-tag round bg-orange sm">{{listItemType(item.type)}}</view>
								</view>
								<view class="text-gray text-sm flex"> 
									<view class="text-cut" >{{item.text}}</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">{{item.timeDo}}</view>
								<checkbox class="round" :class="item.status == 'TODO'?'':'checked'" :checked="item.status == 'TODO'?false:true"></checkbox>
							</view>
							<view class="move">
								<view class="bg-grey">置顶</view>
								<view class="bg-red">删除</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				events: [{
					name: "英语单词",
					text: "使用扇贝记单词记30个单词",
					classify: "INPUT",
					type: "EVERYDAY",
					status: "TODO",
				},{
					name: "英语口语",
					classify: "INPUT",
					type: "EVERYDAY",
					status: "TODO"
				},{
					name: "公众号文章",
					text: "在我的公众号是输出高质量文章",
					classify: "OUTPUT",
					type: "WEEKLY",
					status: "fulfill",
					timeDo: "8:30"
				}],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
			};
		},
		computed: {
			
		},
		methods:{
			listItemType(type){
				let result;
				if (type == "EVERYDAY") {
					result = "每日必做"
				}else if (type == "WEEKLY"){
					result = "每周必做"
				}else{
					result = "今日计划"
				}
				return result
			},
			
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
		
	}
</script>

<style>
</style>
