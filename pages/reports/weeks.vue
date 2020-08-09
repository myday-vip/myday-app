<template>
	<view class="bg-white">
		<view class="fixed">
			<cu-custom bgColor="bg-shadeTop text-white" :isBack="true"><block slot="backText">返回</block><block slot="content">我的周啊</block></cu-custom>
		</view>
		<image src="/static/bannerBG.png"
		 mode="widthFix" class="response"></image>
		 <view class="padding-xl text-white" style="position: absolute;top: 50rpx;">
			<view class="padding-xs text-xxl text-bold">
				<!-- <view class="cu-avatar xl round margin-right" style="background-image:url(../../static/logo.png);"></view> -->
				我的周啊 myday.vip
			</view>
			<view class="padding-xs text-lg">
				Focus on what matters. 专注于重要的事情
			</view>
		 </view>
		 <view class="cu-bar bg-white solid-bottom">
		 	<view class="action">
		 		<button class="cu-btn round shadow margin-right" :class="limitFlag==-1?'lines-blue':'lines-gray'" @click="changeLimit(-1)">上周</button>
		 		<button class="cu-btn round shadow" :class="limitFlag==0?'lines-blue':'lines-gray'" @click="changeLimit(0)">本周</button>
		 	</view>
		 	<view class="action">
		 	</view>
		 </view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 一天中效率最高的时候
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-card case no-card" >
			<view class="cu-item shadow">
				<view class="image" style="min-height: 500rpx;">
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts"  @touchstart="touchPie"></canvas>
				</view>

			</view>

		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 完成最多的Flag
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-card case no-card" >
			<view class="cu-item shadow">
				<view class="image" style="min-height: 500rpx;">
					<canvas canvas-id="canvasFunnel" id="canvasFunnel" class="charts"  @touchstart="touchFunnel"></canvas>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 办事高效在哪天
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-card case no-card" style="padding-bottom: 50rpx;">
			<view class="cu-item shadow">
				<view class="image" style="min-height: 500rpx;">
					<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"  @touchstart="touchColumn"></canvas>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {getReportWeeks} from '../../common/api.js'
	var _self=null;
	var canvaPie=null;
	var canvasFunnel=null;
	var canvasColumn=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
				limitFlag:0
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.fetchData();
		},
		methods: {
			fetchData(){
				getReportWeeks(this.limitFlag).then((res) => {
					let Pie={series:res.data1};
					_self.showPie("canvasPie",Pie);
					let Funnel={series:res.data2};
					_self.showFunnel("canvasFunnel",Funnel);
					let ColumnStack={categories:[],series:[]};
					ColumnStack.categories=["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
					ColumnStack.series=res.data3;
					_self.showColumn("canvasColumn",ColumnStack);
				})
				
				

			},
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  lableWidth:15
						}
					},
				});
			},
			touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data + "次" 
					}
				});
			},
			showFunnel(canvasId,chartData){
				canvasFunnel=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'funnel',
					fontSize:11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					//animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						funnel: {
							border:true,
							borderWidth:2,
							borderColor:'#FFFFFF'
						}
					},
				});
			},
			touchFunnel(e){
				canvasFunnel.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data + "次" 
					}
				});
				canvasFunnel.touchLegend(e,{animation:true});
			},
			showColumn(canvasId,chartData){
				canvasColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					dataLabel:false,
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					//animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//splitNumber:4,
						//format:(val)=>{return val.toFixed(1)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'stack',
							//width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
						}
					  }
				});
			},
			touchColumn(e){
				canvasColumn.touchLegend(e);
				canvasColumn.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data + "次" 
					}
				});
			},
			changeLimit(flag){
				this.limitFlag = flag
				this.fetchData();
			}
			
			
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
	.charts{
		min-height: 500rpx;
		width: 100%;
	}
</style>
