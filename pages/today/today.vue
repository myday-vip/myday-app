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
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null
			}
		},
		methods:{
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
