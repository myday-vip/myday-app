<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">我的天啊</block></cu-custom>
		
		<view class="bg-white padding">
			<view class="grid col-2 grid-square">
				<view class="bg-img" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]">
					<view class=" text-white text-center" style="padding:20upx 0;">
						<view class="padding-xs text-xl text-bold">
							读《未来简史》
						</view>
						<view class="padding-xs text-lg">
							陪伴<text class="text-sl text-bold padding-xs">32</text>天
						</view>
						<view class=" text-sm" style="padding:10upx 0;">
							2020/01/01 正月初五 周五
						</view>
						<view class="text-sm" style="padding:10upx 0;">
							2020/02/28 三月二十 周日
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'],
				edata:[{
					
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
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
</style>
