<template name="today">
	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/myday-banner2.png"
			 mode="widthFix" class="response"></image>
			<view class="nav-list" style="padding: 0rpx;">
				<view class="cu-bar bg-white solid-bottom" style="width: 100%;">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 记录
					</view>
				</view>
				<form style="width: 100%;" class="animation-slide-bottom" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]">
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
					<view v-show="addStyle" class="animation-slide-bottom" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]">
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
								<switch class='orange radius margin-sm'
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

				<view class="cu-list menu" style="width: 100%;" :style="[{animation: 'show ' + (1*0.2+1) + 's 1'}]" @touchstart="addStyle=false;selectClassify(null)">
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> 今天
						</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in events" :key="index"
						 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
							<view class="cu-avatar round lg " 
							:class="item.classify == 'INPUT'?'cuIcon-read':'cuIcon-write'"
							:style="{backgroundColor:item.status == 'TODO'?'orange':'gray'}"></view>
							<view class="content">
								<view :class="item.status == 'TODO'?'text-orange':'text-gray'">
									<view class="text-cut">{{item.name}}</view>
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
								<view class="text-grey text-xs">{{item.timeDo}}</view>
								<view class="flex solid-bottom justify-end">
									<view v-if="item.status == 'FULFILL'" class="padding-xs margin-xs radius cuIcon-favorfill text-green text-sl"></view>
									<view v-if="item.status == 'FULFILL'" class="padding-xs margin-xs radius cuIcon-favorfill text-green text-sl"></view>
									<view v-else class=" padding-sm margin-xs radius cuIcon-favor"></view>
								</view>
								
							</view>
							<view class="move">
								<view class="bg-grey">置顶</view>
								<view class="bg-gradual-orange">完成</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				events: [{
					name: "英语单词",
					text: "使用扇贝记单词记30个单词",
					classify: "INPUT",
					type: "EVERYDAY",
					status: "TODO",
				},{
					name: "英语口语",
					classify: "INPUT",
					type: "MONTHLY",
					status: "TODO"
				},{
					name: "跑步五公里",
					classify: "INPUT",
					type: "PHYSICAL_AGILITY",
					status: "FULFILL"
				},{
					name: "公众号文章",
					text: "在我的公众号是输出高质量文章",
					classify: "OUTPUT",
					type: "WEEKLY",
					status: "FULFILL",
					timeDo: "8:30"
				},{
					name: "读《人类简史》",
					text: "才读了2章，感觉还不错。过几天写个读后感",
					classify: "INPUT",
					type: "GENERIC",
					status: "FULFILL",
					timeDo: "9:30"
				}],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				addStyle: false,
				eventSubjectPlaceholder: "记录今天的输入、输出、体能",
				eventStone: {
					classify: null,//this.$store.state.constants.event.classify.INPUT,
					type: this.$store.state.constants.event.type.GENERIC,
					status: "FULFILL",
					imgList:[]
				},
				
				
			};
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
			}
			
		},
		watch:{
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
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
		
	}
</script>

<style>
.cu-form-group.arrow {
	padding-right: 90upx
}

.cu-form-group.arrow:before {
	position: absolute;
	top: 0;
	right: 30upx;
	bottom: 0;
	display: block;
	margin: auto;
	width: 30upx;
	height: 30upx;
	color: #8799a3;
	content: "\e6a3";
	text-align: center;
	font-size: 34upx;
	font-family: cuIcon;
	line-height: 30upx
}
</style>
