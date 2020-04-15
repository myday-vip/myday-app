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
		
		<view class="bg-img flex align-center" style="height: 454upx;"
		:style="{backgroundImage: 'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg)'}">
			<view class="padding-xl text-white" style="width: 100%;">
				<view class="cu-progress round" style="height: 55rpx;">
					<view class="bg-red" :style="[{ width:true?'31.8%':''}]">人生已走完31.8%</view>
				</view>
				<view class="text-df" style="padding-top: 30upx;">
					光阴似箭，日月如梭。
				</view>
				<view class="text-df" style="padding: 10upx 0;">
					人生短短数十载，忽然而已。生命剩余 19231 天
				</view>
			</view>

		</view>
		
		<view class="bg-white padding" style="display: flex;">
			<view class="grid col-2 grid-square">
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
				edata:[]
			}
		},
		onLoad: function(data){
			this.fetchData()
		},
		methods: {
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
