<template name="today">
	<view class="cu-list menu" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]" >
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
						<view class="text-cut">{{item.subject}}</view>
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
					<view v-show="item.status == 'FULFILL'" class="text-grey text-xs">{{item.updateTimeLabel}}</view>
					<view class="flex solid-bottom justify-end">
						<block v-if="item.status == 'FULFILL'">
							<view v-for="(tt,ti) in item.frequency" :key="ti" class="padding-xs margin-xs radius cuIcon-favorfill text-green text-sl"></view>
						</block>
						<view v-else class=" padding-sm margin-xs radius cuIcon-favor"></view>
					</view>
					
				</view>
				<view class="move">
					<!-- <view class="bg-red">删除</view> -->
					<view class="bg-orange" @click="showCompletedModal(item)">完成</view>
				</view>
			</view>
		</view>
		
		<event-update :showMain="modalName == 'confirmComplete'" 
		:modelData="currentModel" 
		@hide="modalName = null"
		 style="width: 100%;height: 100%;"></event-update>
		
	</view>
</template>

<script>
	
	export default {
		props:{
			events: {
			    type: Array,
			    default(){
					return []
				}
			},
		},
		data(){
			return {
				currentModel: {ok:"我已完成",showCancel:true},
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null
			}
		},
		methods:{

			showCompletedModal(data){
				this.modalName = "confirmComplete"
				this.currentModel.id = data.id
				this.currentModel.title = data.subject
				this.currentModel.subtitle = "每天的点滴积累，必定迎来某天的大海"
				if (data.status === 'FULFILL') {
					this.currentModel.ok = "确定 +1"
					if (data.type === 'EVERYDAY' ) {
						this.currentModel.subtitle = "「每日必做」今天已经完成" + data.frequency + "次"
					}else if (data.type === 'WEEKLY' ) {
						this.currentModel.subtitle = "「每周必做」本周已经完成" + data.frequency + "次"
					}else if (data.type === 'MONTHLY' ) {
						this.currentModel.subtitle = "「每月必做」本月已经完成" + data.frequency + "次"
					}else {
						this.currentModel.subtitle = "非「每X必做」不能再「完成」了"
						this.currentModel.ok = "知道了"
						this.currentModel.showCancel = false
					}
				}else {
					this.currentModel.ok = "我已完成"
				
				}
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
