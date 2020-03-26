<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">我的天啊</block></cu-custom>
		
		<view class="bg-white padding">
			<view class="grid col-2 grid-square">
				<view class="bg-img" v-for="(item,index) in edata" :key="index" 
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
			}
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
.stroke {
	text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;

}
</style>
