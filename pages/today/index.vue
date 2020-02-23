<template name="today">
	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/myday-banner2.png"
			 mode="widthFix" class="response"></image>
			<view class="nav-list" style="padding: 0rpx;">
				<view class="cu-bar search bg-white" style="width: 100%;">
					<view class="search-form round">
						<text class="cuIcon-read"></text>
						<input :adjust-position="false" type="text" placeholder="记录今天的输入、输出、体能" @focus="toggleAddStone"></input>
					</view>
				</view>
				<view v-show="addStyle">
					add event
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
									<view v-if="item.type == 'EVERYDAY'" class="cu-tag round bg-orange sm">每日必做</view>
									<view v-else-if="item.type == 'WEEKLY'" class="cu-tag round bg-green sm">每周必做</view>
									<view v-else-if="item.type == 'MONTHLY'" class="cu-tag round bg-gradual-green sm">每月必做</view>
									<view v-else class="cu-tag round bg-blue sm">今日计划</view>
								</view>
								<view class="text-gray text-sm flex"> 
									<view class="text-cut" >{{item.text}}</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">{{item.timeDo}}</view>
								<view class="flex solid-bottom justify-end">
									<view v-if="item.status == 'FULFILL'" class="padding-xs margin-xs radius cuIcon-favorfill text-green text-sl"></view>
									<view v-if="item.status == 'FULFILL'" class="padding-xs margin-xs radius cuIcon-favorfill text-green text-sl"></view>
									<view v-else class=" padding-sm margin-xs radius cuIcon-favor"></view>
								</view>
								
							</view>
							<view class="move">
								<view class="bg-grey">置顶</view>
								<view class="bg-gradual-orange">完成</view>
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
					type: "MONTHLY",
					status: "TODO"
				},{
					name: "公众号文章",
					text: "在我的公众号是输出高质量文章",
					classify: "OUTPUT",
					type: "WEEKLY",
					status: "FULFILL",
					timeDo: "8:30"
				},{
					name: "读《人类简史》",
					text: "才读了2章，感觉还不错。过几天写个读后感",
					classify: "INPUT",
					type: "GENERIC",
					status: "FULFILL",
					timeDo: "9:30"
				}],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				addStyle: false
				
			};
		},
		computed: {
			
		},
		watch:{
		},
		methods:{
			//打开添加事件界面
			toggleAddStone(e){
				this.addStyle = true
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
