<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">时间</block></cu-custom>


		<view class="cu-timeline" v-for="(item,index) in data" :key="index">
			<view class="cu-time" :class="item[0].current?'current':''">{{item[0].time1}}</view>
			<view class="cu-item" 
			:class="subitem.classify == 'INPUT'?'text-orange':(subitem.classify == 'OUTPUT'?'text-green':'text-red')"
			v-for="(subitem,subindex) in item" :key="subindex">
				<view class="content" style="background-color: #f4f8f9;">
					<view class="flex solid-bottom justify-between">
						<view class="nav-title">{{subitem.subject}}</view>
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">{{subitem.updateTime | fomate3}}</view>
							<view class="cu-tag line-cyan">{{subitem.updateTime | fomate2}}</view>
						</view>
					</view>
					<view class="desc">
						<view class="text-content"> {{subitem.text || ""}}</view>
						<!-- 图片 -->
						<block v-if="subitem.show2.length > 0">
							<view class="grid flex-sub col-3 grid-square" style="padding-top: 30rpx;">
								<view v-for="(ssitem,ssindex) in subitem.show2" :key="ssindex" 
								class="bg-img" 
								:style="{backgroundImage:'url(http://localhost:8080/' + ssitem.val1+ ')'}"
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
						
						<view>
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
		
		
		<view class="cu-modal" id="imgModal" :class="modalName?'show':''" @touchstart="hideModal">
			<view class="cu-dialog" >
				<image :src="'http://localhost:8080/' + bigImg.url" mode="aspectFit"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getEventTimeLine} from '../../common/api.js'
	import {dateformat} from '../../common/util.js'
	export default {
		data() {
			return {
				modalName: null,
				bigImg: {
					url:null,
					width:0,
					height:0
				},
				updatedNumber:0,
				data:[],
				currentDate: null//点击进来的时间 e.g:2020-01-01
			};
		},
		onLoad: function (option) { 
			if (option.date) {
				this.fetchData(option.date)
			}
		},
		updated: function () {
			if (this.updatedNumber == 1){
				return
			}
			var _this = this
			this.$nextTick(function () {
				uni.createSelectorQuery().select(".cu-timeline").boundingClientRect(data=>{
					uni.createSelectorQuery().select(".current").boundingClientRect((res)=>{
						uni.pageScrollTo({
							duration:2000,
							scrollTop:res.top - data.top
						})
						_this.updatedNumber = 1
					}).exec()
				}).exec();
				})
			},
		filters:{
			fomate1: function(time) {
				var date = new Date(time)
				return dateformat.all(date,"MM-dd")
			},
			fomate2: function(time) {
				var date = new Date(time)
				return dateformat.all(date,"hh:mm")
			},
			fomate3: function(time) {
				var date = new Date(time)
				var hour = date.getHours()
				var timeLabel
				if (hour>=1 && hour<5) {
					timeLabel = "凌晨"
				}else if (hour>=5 && hour<8){
					timeLabel = "清晨"
				}else if (hour>=8 && hour<11){
					timeLabel = "上午"
				}else if (hour>=11 && hour<13){
					timeLabel = "中午"
				}else if (hour>=13 && hour<18){
					timeLabel = "下午"
				}else if (hour>=18 && hour<21){
					timeLabel = "傍晚"
				}else{
					timeLabel = "深夜"
				}
				return timeLabel
			}
		},
		methods:{
			hideModal: function(e){
				if(e && e.target.id == 'imgModal'){
					this.modalName = null
				}
				
			},
			showmodel: function(data){
				this.modalName = "image"
				this.bigImg.url = data.val2
				this.bigImg.width = data.val3
				this.bigImg.height = data.val4
				console.log(this.bigImg)
			},
			fetchData: function(date) {
				this.currentDate = date
				getEventTimeLine(date).then((res) => {
					res.forEach( e => {
						let updateTime = new Date(e[0].updateTime || e[0].createTime)
						let fdate = dateformat.all(updateTime,"yyyy-MM-dd hh:mm")
						let fdateArr = fdate.split(" ")
						e[0].time1 = fdateArr[0].substr(5)
						//e[0].time2 = fdateArr[1]
						e[0].current = fdateArr[0] == this.currentDate
					})
					this.data = res
				})
			}
		}
	}
</script>

<style>
.cu-dialog {
	position: relative;
	display: inline-block;
	vertical-align: middle;
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	max-width: 100%;
	background-color:transparent;
	border-radius: 10upx;
	overflow: hidden;
}
</style>
