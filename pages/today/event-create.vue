<template>
	<form  class="animation-slide-bottom" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]">
		<view class="cu-form-group">
			<button class="margin-sm basis-sm shadow cu-btn bg-gradual-orange" 
			:style="{backgroundImage:eventStone.classify == 'INPUT'?'url(/static/index.jpg)':''}"
			 @click="selectClassify($store.state.constants.event.classify.INPUT)">
			 输入
			 </button>
			<button class="margin-sm basis-sm shadow cu-btn bg-gradual-green" 
			:style="{backgroundImage:eventStone.classify == 'OUTPUT'?'url(/static/index.jpg)':''}"
			@click="selectClassify($store.state.constants.event.classify.OUTPUT)" >输出</button>
			<button class="margin-sm basis-sm shadow cu-btn bg-orange" 
			:style="{backgroundImage:eventStone.classify == 'PHYSICAL_AGILITY'?'url(/static/index.jpg)':''}"
			@click="selectClassify($store.state.constants.event.classify.PA)" >体能</button>
		</view>
		<view v-show="showall" class="animation-slide-bottom" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]">
			<view class="cu-form-group">
				<view class="title">主题</view>
				<input :placeholder="eventSubjectPlaceholder" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">小记</view>
				<input placeholder="小记记 , 小感感 , 小小得" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view>
					<view v-show="eventType">
						<view class="cu-tag round lg" :class="eventStone.type == 'EVERYDAY'?'bg-orange':'bg-gray'" @click="eventStone.type = 'EVERYDAY'">每日</view>
						<view class="cu-tag round lg" :class="eventStone.type == 'WEEKLY'?'bg-orange':'bg-gray'" @click="eventStone.type = 'WEEKLY'">每周</view>
						<view class="cu-tag round lg" :class="eventStone.type == 'MONTHLY'?'bg-orange':'bg-gray'" @click="eventStone.type = 'MONTHLY'">每月</view>
					</view>
				</view>
				<view>
					<switch class='orange radius margin-sm' 
					:checked="eventStatus"
					@change="switchStatus"></switch>&nbsp;&nbsp;{{eventStatusLabel}}
					<switch class='orange radius margin-sm switch-day'
					:checked="eventType"
					@change="switchType"></switch>&nbsp;&nbsp;{{eventTypeLabel}}
				</view>
			</view>
			<view class="cu-bar bg-white" style="border-top: 1rpx solid #eee;">
				<view class="action">
					时光上传
				</view>
				<view class="action">
					{{eventStone.imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group" style="border-top: 0;">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in eventStone.imgList" :key="index" @tap="viewImage" :data-url="eventStone.imgList[index]">
					 <image :src="eventStone.imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="chooseImage" v-if="eventStone.imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group" style="border-top: 0;">
				<view class="title">
					<text class="cuIcon-location margin-right-xs"></text>
					<text>所在位置</text>
				</view>
				<view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group" style="border-top: 0;">
				<view class="title">
					<text class="cuIcon-link margin-right-xs"></text>
					<text>链接</text>
				</view>
				<view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-form-group">
				<view>
				</view>
				<view>
					<button class="margin-sm basis-sm shadow cu-btn bg-green" style="padding: 0 50upx;">
					保&nbsp;&nbsp;&nbsp;&nbsp;存
					</button>
				</view>
			</view>
		</view>
	</form>
</template>

<script>
	export default{
		props:{
			showAll: {
				default: false,
				type: Boolean
			}
		},
		data(){
			return {
				eventSubjectPlaceholder: "记录今天的输入、输出、体能",
				eventStone: {
					classify: null,//this.$store.state.constants.event.classify.INPUT,
					type: this.$store.state.constants.event.type.GENERIC,
					status: "FULFILL",
					imgList:[]
				},
				addStyle: false
			}
		},
		computed: {
			
			eventStatusLabel(){
				return this.eventStone.status == 'FULFILL'?'完成':'待办'
			},
			eventStatus(){
				return this.eventStone.status == 'FULFILL'?true:false
			},
			eventTypeLabel(){
				return this.eventStone.type == 'GENERIC'?'今日':'必做'
			},
			eventType(){
				return this.eventStone.type == 'GENERIC'?false:true
			},
			showall(){
				return this.showAll || this.addStyle
			}
			
		},
		methods:{
			chooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.eventStone.imgList.length != 0) {
							this.eventStone.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.eventStone.imgList = res.tempFilePaths
						}
					}
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.eventStone.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			delImg(e) {
				uni.showModal({
					title: '我的天啊',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.eventStone.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			switchStatus(e){
				if (e.detail.value) {
					this.eventStone.status = "FULFILL"
				}else {
					this.eventStone.status = "TODO"
				}
			},
			switchType(e){
				if (e.detail.value) {
					this.eventStone.type = 'EVERYDAY'
				}else {
					this.eventStone.type = 'GENERIC'
				}
			},
			selectClassify(classify){
				if (classify){
					this.toggleAddStone()
				}
				if(classify == this.$store.state.constants.event.classify.INPUT) {
					this.eventSubjectPlaceholder = "读《自控力》"
				}else if(classify == this.$store.state.constants.event.classify.OUTPUT) {
					this.eventSubjectPlaceholder = "写博客《自控力》读后感"
				}else if(classify == this.$store.state.constants.event.classify.PA) {
					this.eventSubjectPlaceholder = "跑步五公里"
				}else{
					this.eventSubjectPlaceholder = "记录今天的输入、输出、体能"
				}
				this.eventStone.classify = classify
			},
			//打开添加事件界面
			toggleAddStone(){
				if (!this.addStyle) {
					this.addStyle = true
					this.selectClassify(this.$store.state.constants.event.classify.INPUT)
				}
			}
		}
		
	}
</script>

<style>
</style>
