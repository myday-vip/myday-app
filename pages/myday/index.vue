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
		
		<view class="bg-img flex align-center" :class="lifeProgress.v1>0?'':'bg-mask'" style="height: 454upx;"
		:style="{backgroundImage: 'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg)'}">
			<view class="padding-xl text-white" style="width: 100%;">
				<block v-if="lifeProgress.v1>0">
					<view class="cu-progress round" style="height: 55rpx;">
						<view class="bg-red" :style="[{ width:lifeProgress.v2+'%'}]">人生已走完{{lifeProgress.v2}}%</view>
					</view>
				</block>
				<block v-if="lifeProgress.v1<0">
					<button class="cu-btn bg-green margin-tb-sm" style="font-size: 32rpx;height: 60rpx;width: 100%;">设置生日，进入倒计时时代</button>
				</block>
				<view class="text-df" style="padding-top: 30upx;">
					光阴似箭，日月如梭。
				</view>
				<view class="text-df" style="padding: 10upx 0;">
					人生短短数十载，忽然而已。生命剩余 {{lifeProgress.v1>0?lifeProgress.v1:'xxxxxx'}} 天
				</view>
			</view>

		</view>
		
		<view class="bg-white padding" style="display: flex;">
			<view class="grid col-2 grid-square">
				<view class="bg-img"  style="background-image: url(../../static/svg/undraw_check_boxes_m3d0.svg);">
					<view class=" text-green text-center stroke" style="padding:20upx 0">
						<view class="padding-xs text-xl text-bold">
							tsetset
						</view>
						<view class="padding-xs text-lg">
							陪伴<text class="text-sl text-bold padding-xs">2</text>天
						</view>
					</view>
				</view>
				<view class="bg-img" v-for="(item,index) in edata" :key="index" @tap="toDetail(item.id)"
				:style="[{ backgroundImage:'url('+ (item.classify == 'INPUT'?'/static/md-input.png':(item.classify == 'OUTPUT'?'/static/md-output.png':'/static/md-physical-agility.png')) +')' }]">
					<view class=" text-green text-center stroke" style="padding:20upx 0">
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
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getAllEventDetail} from '../../common/api.js'
	export default {
		data() {
			return {
				edata:[],
				userInfo:null,
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
					this.edata = res
				})
			},
			toDetail: function(id){
				console.log(id)
				uni.navigateTo({
				    url: '/pages/myday/detail?id=' + id,
					animationType: 'pop-in',
					animationDuration: 260
				});
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
</style>
