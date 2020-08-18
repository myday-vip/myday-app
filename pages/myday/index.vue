<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">我的每一天</block>
			</cu-custom>
		</view>
<!-- 		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper> -->
		
		<view class="bg-img flex align-center"  style="height: 454upx;background-image: url(https://myday.vip/v1/bg/bing/newest.jpg);">
			<view class="padding-xl text-white" style="width: 100%;">
				<block v-if="lifeProgress.v1>0">
					<view class="cu-progress round" style="height: 55rpx;">
						<view class="bg-red" :style="[{ width:lifeProgress.v2+'%'}]">人生已走完{{lifeProgress.v2}}%</view>
					</view>
				</block>
				<block v-if="lifeProgress.v1<0">
					<navigator class="action" open-type="navigateBack" delta="1">
						<button class="cu-btn bg-green margin-tb-sm" style="font-size: 32rpx;height: 60rpx;width: 100%;">设置生日，进入倒计时时代</button>
					</navigator>
				</block>
				<view class="text-df" style="padding-top: 30upx;">
					光阴似箭，日月如梭。
				</view>
				<view class="text-df" style="padding: 10upx 0;">
					人生短短数十载，忽然而已。生命剩余 {{lifeProgress.v1>0?lifeProgress.v1:'xxxxxx'}} 天
				</view>
			</view>

		</view>
		
		<!--
		:style="[{ backgroundImage:'url('+ (item.classify == 'INPUT'?'/static/md-input.png':(item.classify == 'OUTPUT'?'/static/md-output.png':'/static/md-physical-agility.png')) +')' }]"
		
		-->
		
		<view class=" padding" style="display: flex;">
			<view class="grid col-2 grid-square">
				<view class="bg-img shadow-blur shadow-lg" v-for="(item,index) in edata" :key="index" @tap="toDetail(item)"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				:class="item.classify == 'INPUT'?'bg-gradual-orange':(item.classify == 'OUTPUT'?'bg-gradual-green':(item.classify == 'NONE'?'bg-none':'bg-orange'))">
					<block v-if="item.classify == 'NONE'">
						<view class="bg-img padding-top-xl flex align-end" style="background-image:url(https://oss.lc.myday.vip/afeade1256dc5942dc2c/md-input.png);height: 180px;">
							<view class="bg-shadeBottom padding padding-top-xl flex-sub">
								输入、输出、体能
							</view>
						</view>
					</block>
					<block v-else>
						<view class=" text-white text-center " style="padding:20upx 0">
								<view v-if="item.planStatus==='FINAL'" class="cu-tag"
								>完结</view>
								<view v-else class="cu-tag" style="background-color: rgba(0, 0, 0, 0.3);" 
								@tap="showMenu(item)"
								@tap.stop.prevent="showMenu">&nbsp;&nbsp;...&nbsp;&nbsp;</view>
								
								<view v-if="item.type == 'EVERYDAY'" class="cu-tag bg-orange sm" style="background-color: #f37b1d;left: 0;right: unset;margin-left: 0;">每日必做</view>
								<view v-else-if="item.type == 'WEEKLY'" class="cu-tag bg-green sm" style="background-color: #39b54a ;left: 0;right: unset;margin-left: 0;">每周必做</view>
								<view v-else-if="item.type == 'MONTHLY'" class="cu-tag bg-gradual-green sm" style="left: 0;right: unset;margin-left: 0;">每月必做</view>
								<view v-else class="cu-tag bg-blue sm" style="left: 0;right: unset;margin-left: 0;">今日计划</view>
								
								<view class="padding-xs text-xl text-bold">
									{{item.subject}}
								</view>
								<view class="padding-xs text-lg">
									陪伴<text class="text-sl text-bold padding-xs">{{item.intervalDay}}</text>天
								</view>
								<view class=" text-sm" style="padding:10upx 0;">
									{{item.createTimeChineseDay}}
								</view>
								<view class="text-sm" style="padding:10upx 0;">
									{{item.updateTimeChineseDay}}
								</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		
		<!-- 底部菜单 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomMenu'?'show':''">
			<view class="cu-dialog">
		
				<view class="cu-list menu text-center text-xl">
					<view class="cu-item" style="color: #FFFFFF;background-color: #39b54a;" 
					@tap="modalName='updateSubject'">
						<label class="flex justify-between align-center flex-sub">
							<view class="flex-sub">修改主题</view>
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
		<!-- 底部修改主题 -->
		<view class="cu-modal bottom-modal" :class="modalName=='updateSubject'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改主题</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<input v-model="selectedEvent.subject"></input>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="saveSubject()">确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getAllEventDetail,updateSubject} from '../../common/api.js'
	export default {
		data() {
			return {
				edata:[],
				userInfo:null,
				modalName: null,
				selectedEvent: {},
				lifeProgress:{
					v1:-1,//剩余天数
					v2:0//已过去百分比
				}
			}
		},
		onLoad: function(data){
			this.fetchData()
			this.getUserDetail()
		},
		methods: {
			getUserDetail: function(){
				var _this = this
				uni.getStorage({
					key: 'MYDAY-USER',
					success: function (res) {
						if(res && res.data){
							_this.userInfo = JSON.parse(res.data);
							_this.calcLifeProgress()
						}
						
					}
				});
			},
			calcLifeProgress: function(){
				if (this.userInfo && this.userInfo.birthday) {
					var d1 = new Date().getTime(),d2 = Date.parse(this.userInfo.birthday)
					this.lifeProgress.v1 = Math.floor(Math.abs(d1-d2) / (24 * 3600 * 1000))
					this.lifeProgress.v2 = (this.lifeProgress.v1/29200*100).toFixed(2)
				}
			},
			fetchData: function(){
				getAllEventDetail().then((res) => {
					if (res == null){
						res = []
						
					}
					if (res.length<4){
						for (var i=res.length;i<4;i++) {
							res.push({id:0,classify:"NONE"})
						}
					}
					this.edata = res
				})
			},
			toDetail: function(obj){
				if (obj === null || obj.id <=0){
					return
				}
				uni.navigateTo({
				    url: '/pages/myday/detail?id=' + obj.id+ '&intervalDay=' + obj.intervalDay,
					animationType: 'pop-in',
					animationDuration: 260
				});
			},
			showMenu: function(model){
				if (model.target){
					return
				}
				this.selectedEvent = model
				this.modalName = 'bottomMenu'
				//event.preventDefault();
				//event.stopPropagation();
			},
			hideModal: function(){
				this.modalName = null
			},
			saveSubject: function(){
				if (this.selectedEvent !== null){
					updateSubject(this.selectedEvent).then((res) => {
						//this.fetchData()
						this.modalName = null
						uni.showToast({
							title:'完成'
						})
					})
				}
			}
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
	.grid.grid-square>view {
		margin-right: 35upx;
		margin-bottom: 35upx;
		border-radius: 6upx;
		position: relative;
		overflow: hidden;
	}
	.grid.col-2.grid-square>view {
		padding-bottom: calc((100% - 35upx)/2);
		height: 0;
		width: calc((100% - 35upx)/2);
	}
	.stroke {
		text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;

	}
	.bg-none {
		color: #333333;
		background-color: #ccc7d0;
	}
	.desc{
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		display: '-webkit-box';
		display: '-webkit-flex';
		display: 'flex';
		-webkit-box-orient: 'vertical';
		-webkit-box-direction: 'normal';
		-webkit-flex-direction: 'column';
		flex-direction: 'column';
		-webkit-box-pack: 'justify';
		-webkit-justify-content: 'space-between';
		justify-content: 'space-between';
	}

</style>
