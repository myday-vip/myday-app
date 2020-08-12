<template>
	<view class="bg-white">
		<view class="fixed">
			<cu-custom bgColor="bg-shadeTop text-white" :isBack="true"><block slot="backText">返回</block><block slot="content">{{event.subject}}</block></cu-custom>
		</view>
		<image src="/static/bannerBG.png"
		 mode="widthFix" class="response"></image>
		 <view class="padding-xl text-white" style="position: absolute;top: 50rpx;">
			<view class="padding-xs text-xxl text-bold">
				<!-- <view class="cu-avatar xl round margin-right" style="background-image:url(../../static/logo.png);"></view> -->
				我的天啊 myday.vip
			</view>
			<view class="padding-xs text-lg">
				{{event.subject}} 已历经 {{intervalDay}}天 完成 {{countAll}} 次 本年 {{count}} 次
			</view>
		 </view>
		 
		 <view class="cu-bar bg-white solid-bottom">
		 	<view class="action">
		 		<button class="cu-btn round shadow lines-blue">{{years}}年</button>
		 	</view>
		 	<view class="action">
		 	</view>
		 </view>
		 
		 <view class="cu-bar bg-white solid-bottom">
		 	<view class="action">
		 		<text class="cuIcon-titles text-orange"></text> 总是完成在什么时候
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
		 		<text class="cuIcon-titles text-orange"></text> 总是完成在周几
		 	</view>
		 	<view class="action">
		 	</view>
		 </view>
		 <view class="cu-card case no-card" style="padding-bottom: 50rpx;">
		 	<view class="cu-item shadow">
		 		<view class="image" style="min-height: 500rpx;">
		 			<canvas canvas-id="canvasColumn1" id="canvasColumn1" class="charts"  @touchstart="touchColumn1"></canvas>
		 		</view>
		 	</view>
		 </view>
		 <view class="cu-bar bg-white solid-bottom">
		 	<view class="action">
		 		<text class="cuIcon-titles text-orange"></text> 几月完成最多
		 	</view>
		 	<view class="action">
		 	</view>
		 </view>
		 <view class="cu-card case no-card" style="padding-bottom: 50rpx;">
		 	<view class="cu-item shadow">
		 		<view class="image" style="min-height: 500rpx;">
		 			<canvas canvas-id="canvasColumn2" id="canvasColumn2" class="charts"  @touchstart="touchColumn2"></canvas>
		 		</view>
		 	</view>
		 </view>

		<view class="cu-timeline" v-for="(item,index) in data" :key="index">
			<view class="cu-time" :class="item[0].current?'current':''">{{item[0].time1}}</view>
			<view class="cu-item" 
			:class="subitem.classify == 'INPUT'?'text-orange':(subitem.classify == 'OUTPUT'?'text-green':'text-red')"
			v-for="(subitem,subindex) in item" :key="subindex">
				<view class="content" style="background-color: #fafafa;">
					<view class="flex solid-bottom justify-between">
						<view class="nav-title">{{subitem.subject}}</view>
						<view class="cu-capsule radius">
							<view class="cu-tag" :class="subitem.timeColorDay">{{subitem.timeDay}}</view>
							<view class="cu-tag" :class="subitem.timeColor1">{{subitem.timeLabel1}}</view>
							<view class="cu-tag" :class="subitem.timeColor2">{{subitem.timeLabel2}}</view>
						</view>
					</view>
					<view class="desc">
						<view v-if="subitem.text" class="text-content" style="white-space: pre-wrap;padding: 30upx 0;"> {{subitem.text}}</view>
						<!-- 图片 -->
						<block v-if="subitem.show2.length > 0">
							<view class="grid flex-sub col-3 grid-square">
								<view v-for="(ssitem,ssindex) in subitem.show2" :key="ssindex" 
								class="bg-img" 
								:style="{backgroundImage:'url(' + baseUrlOss(ssitem.val1)+ ')'}"
								@tap="showmodel(ssitem)">
								</view>
							</view>
						</block>
						<!-- 位置 链接-->
						<block v-if="subitem.show.length > 0">
							<view v-for="(ssitem,ssindex) in subitem.show" :key="ssindex">
								<view v-if="ssitem.type == 'LOCATION'">
									<text class="margin-right-xs cuIcon-locationfill"></text>
									<text>{{ssitem.val1}}</text>
								</view>
								<view v-if="ssitem.type == 'LINK'">
									<text class="margin-right-xs cuIcon-link"></text>
									<text>{{ssitem.value}}</text>
								</view>
							</view>
						</block>
						
						<view style="padding-top: 18upx;">
							<view v-if="subitem.classify == 'INPUT'" class="cu-tag bg-red light sm round">输入</view>
							<view v-if="subitem.classify == 'OUTPUT'" class="cu-tag bg-green light sm round">输出</view>
							<view v-if="subitem.classify == 'PHYSICAL_AGILITY'" class="cu-tag bg-gradual-orange light sm round">体能</view>
							<view v-if="subitem.type == 'EVERYDAY'" class="cu-tag bg-green light sm round">每日必做</view>
							<view v-if="subitem.type == 'WEEKLY'" class="cu-tag bg-green light sm round">每周必做</view>
							<view v-if="subitem.type == 'MONTHLY'" class="cu-tag bg-green light sm round">每月必做</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		
		
		<view class="cu-modal" id="imgModal" :class="modalName?'show':''" @click="hideModal">
			<view class="cu-dialog" >
				<movable-area scale-area>
					<movable-view direction="all" @scale="onScale" scale="true" scale-min="0.5" scale-max="4" >
						<image v-if="bigImg.url" :src="baseUrlOss(bigImg.url)" mode="widthFix" ></image>
					</movable-view>
				</movable-area>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getEventDetail} from '../../common/api.js'
	import {dateformat} from '../../common/util.js'
	import {baseUrlOss} from '../../common/request.js'
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self=null;
	var canvaPie,canvasColumn1,canvasColumn2;
	
	export default {
		data() {
			return {
				modalName: null,
				bigImg: {
					url:null,
					width:0,
					height:0
				},
				event:{subject:"myday.vip"},
				data:[],
				intervalDay:0,
				count: 0,
				countAll: 0,
				charts: null,
				years:0,
				hasPage:{next:true,prev:true},//是否可以翻页
				currentDate: null,//点击进来的时间 e.g:2020-01-01
				cWidth:'',
				cHeight:'',
				pixelRatio:1
			};
		},
		onLoad: function (option) {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			if (option.id) {
				this.intervalDay = option.intervalDay
				this.fetchData(option.id)
			}
		},

		methods:{
			baseUrlOss: function(d){
				return baseUrlOss(d)
			},
			hideModal: function(e){
				// if(e && e.target.id == 'imgModal'){
				// 	this.modalName = null
				// }
				this.modalName = null
			},
			showmodel: function(data){
				this.modalName = "image"
				this.bigImg.url = data.val2
				this.bigImg.width = data.val3
				this.bigImg.height = data.val4
			},
			fetchData: function(id) {
				getEventDetail(id).then((res) => {
					this.event = res.event
					this.count = res.count
					this.countAll = res.count_all
					res.days.forEach( e => {
						let updateTime = new Date(e[0].updateTime || e[0].createTime)
						let fdate = dateformat.all(updateTime,"yyyy-MM-dd hh:mm")
						let fdateArr = fdate.split(" ")
						e[0].ftime = fdateArr[0]
						e[0].time1 = fdateArr[0].substr(5)
					})
					
					res.days.forEach( e => {
						let updateTime = new Date(e[0].updateTime || e[0].createTime)
						let fdate = dateformat.all(updateTime,"yyyy-MM-dd hh:mm")
						let fdateArr = fdate.split(" ")
						e[0].ftime = fdateArr[0]
						e[0].time1 = fdateArr[0].substr(5)
						if (_self.years <=0){
							_self.years = fdateArr[0].substr(0,4)
						}
						e.forEach(sube => {
							var date = new Date(sube.updateTime)
							var hour = date.getHours()
							var days = date.getDay()
							var timeLabel,timeColor1,timeColor2,timeColorDay
							if (hour>=1 && hour<5) {
								timeLabel = "凌晨"
								timeColor1 = "bg-cyan"
								timeColor2 = "line-cyan"
							}else if (hour>=5 && hour<8){
								timeLabel = "清晨"
								timeColor1 = "bg-blue"
								timeColor2 = "line-blue"
							}else if (hour>=8 && hour<11){
								timeLabel = "上午"
								timeColor1 = "bg-green"
								timeColor2 = "line-green"
							}else if (hour>=11 && hour<13){
								timeLabel = "中午"
								timeColor1 = "bg-red"
								timeColor2 = "line-red"
							}else if (hour>=13 && hour<18){
								timeLabel = "下午"
								timeColor1 = "bg-orange"
								timeColor2 = "line-orange"
							}else if (hour>=18 && hour<21){
								timeLabel = "傍晚"
								timeColor1 = "bg-pink"
								timeColor2 = "line-pink"
							}else{
								timeLabel = "深夜"
								timeColor1 = "bg-purple"
								timeColor2 = "line-purple"
							}
							
							switch(days) {
								case 1:
									  days = '星期一';
									  timeColorDay = 'bg-gradual-red'
									  break;
								case 2:
									  days = '星期二';
									  timeColorDay = 'bg-gradual-orange'
									  break;
								case 3:
									  days = '星期三';
									  timeColorDay = 'bg-gradual-pink'
									  break;
								case 4:
									  days = '星期四';
									  timeColorDay = 'bg-gradual-purple'
									  break;
								case 5:
									  days = '星期五';
									  timeColorDay = 'bg-gradual-blue'
									  break;
								case 6:
									  days = '星期六';
									  timeColorDay = 'bg-gradual-green'
									  break;
								case 0:
									  days = '星期日';
									  timeColorDay = 'bg-gradual-green'
									  break;
							}
							sube.timeDay = days
							sube.timeLabel1 = timeLabel
							sube.timeColor1 = timeColor1
							sube.timeColor2 = timeColor2
							sube.timeColorDay = timeColorDay
							sube.timeLabel2 = dateformat.all(date,"hh:mm")
						})
					})
					
					this.data = res.days
					
					let Pie={series:res.charts.data1};
					this.showPie("canvasPie",Pie);
					let ColumnStack1={categories:[],series:[]};
					ColumnStack1.categories=["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
					ColumnStack1.series=[{name:"",data:res.charts.data2}];
					this.showColumn1("canvasColumn1",ColumnStack1);
					let ColumnStack2={categories:[],series:[]};
					ColumnStack2.categories=[1,2,3,4,5,6,7,8,9,10,11,12];
					ColumnStack2.series=[{name:"",data:res.charts.data3}];
					this.showColumn2("canvasColumn2",ColumnStack2);
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
			showColumn1(canvasId,chartData){
				canvasColumn1=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					padding:[15,15,0,15],
					legend:{
						show:false,
					},
					dataLabel:false,
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'stack',
							width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
						}
					  }
				});
			},
			touchColumn1(e){
				canvasColumn1.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.data + "次" 
					}
				});
			},
			showColumn2(canvasId,chartData){
				canvasColumn2=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					padding:[15,20,0,10],
					legend:{
						show:false,
					},
					dataLabel:false,
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'stack',
							width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
						}
					  }
				});
			},
			touchColumn2(e){
				canvasColumn2.showToolTip(e, {
					format: function (item, category) {
						return category + '月' + item.data + "次" 
					}
				});
			},

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
.cu-dialog {
	position: absolute;
	display: inline-block;
	vertical-align: middle;
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	max-width: 100%;
	background-color:transparent;
	border-radius: 10upx;
	overflow: hidden;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}
movable-view {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height:100%;
}

movable-area {
	height: 100%;
	width: 100%;
	position:fixed;
	overflow: hidden;
}
	
movable-view image{
	width:100%;
}
</style>
