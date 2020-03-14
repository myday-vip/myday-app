<template name="today">
	<view class="cu-list menu" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]" >
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 今天
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in events" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
			 @longpress="showMenu(item)">
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
					<view class="bg-green" @click="showCompletedModal(item)">完成</view>
				</view>
			</view>
		</view>
		
		<!-- 完成 -->
		<event-update :showMain="modalName == 'confirmComplete'" 
		:modelData="currentModel" 
		@hide="modalName = null"
		 style="width: 100%;height: 100%;"></event-update>
		
		<!-- 终结 -->
		<view class="cu-modal" :class="modalName=='updateToFinal'?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg');height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="modalName=null">
							<text class="cuIcon-close "></text>
						</view>
					</view>
					<view class="padding-xl text-white" style="padding-top: 0;">
						<view class="padding-xs text-xxl text-bold">
							{{currentModel.title}}
						</view>
						<view class="padding-xs text-lg" @tap="addStyle=true">
							{{currentModel.subtitle}}
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green " @tap="modalName=null">
						<text class="cuIcon-footprint"></text>{{currentModel.analysis}}
					</view>
					<view class="action margin-0 flex-sub solid-left" 
					style="min-height: 100rpx;margin: 0;background-color: #E7EBED;" @tap="modalName=null">取消</view>
					<view class="action margin-0 flex-sub bg-red solid-left"
					 style="min-height: 100rpx;margin: 0;" @tap="updateToFinal">完结</view>
				</view>
			</view>
		</view>
		
		<!-- 底部菜单 -->
		<view class="cu-modal bottom-modal" :class="modalName=='menuModal'?'show':''">
			<view class="cu-dialog">
		
				<view class="cu-list menu text-center text-xl">
					<view class="cu-item" style="color: #FFFFFF;background-color: #39b54a;" @tap="showCompletedModal(currentLongPressObj)">
						<label class="flex justify-between align-center flex-sub">
							<view class="flex-sub">完&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成</view>
						</label>
					</view>
					<view v-if="currentLongPressObj.type !== 'GENERIC'" class=" cu-item" style="color: #FFFFFF;background-color: #e54d42;" @tap="showUpdateToFinalModal(currentLongPressObj)">
						<label class="flex justify-between align-center flex-sub">
							<view class="flex-sub">完&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结</view>
						</label>
					</view>
					<view class="cu-item" @tap="modalName = null">
						<label class="flex justify-between align-center flex-sub">
							<view class="flex-sub">取消</view>
						</label>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {updateStatusFinal} from '../../common/api.js'
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
				currentLongPressObj:{},
				listTouchStart: 0,
				listTouchDirection: null,
				nowTime: new Date()
			}
		},
		methods:{
			updateToFinal(){
				updateStatusFinal(this.currentModel.id).then((data) => {
					uni.showToast({
						title:"加油"
					})
					uni.$emit('event:updated',null)
					this.modalName = null
				}).catch((e) => {
					console.error(e)
				})
			},
			showMenu(data){
				this.currentLongPressObj = data
				this.modalName ='menuModal'
			},
			showUpdateToFinalModal(data){
				this.modalName ='updateToFinal'
				this.currentModel.id = data.id
				this.currentModel.title = "又是一个里程碑"
				console.log(this.nowTime)
				this.currentModel.analysis =  "陪伴" + Math.floor((this.nowTime - new Date(data.createTime)) / (24 * 3600 * 1000)) + "天"
				this.currentModel.subtitle = "你将完结「" + data.subject + "」，迎来一个全新的你自己。"
			},
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
					if (this.modalName !== 'menuModal'){
						this.modalName = null
					}
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>
</style>
