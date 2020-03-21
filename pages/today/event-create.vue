<template>
	<view>
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
			<view v-show="showall" class="animation-slide-bottom" style="animation: show 1.2s;">
				<view class="cu-form-group">
					<view class="title">主题</view>
					<input-autocomplete
					style="-webkit-box-flex: 1;-webkit-flex: 1;flex: 1;font-size: 30rpx;color: #555;padding-right: 20rpx;box-sizing: border-box;"
					:placeholder="eventSubjectPlaceholder"
					 v-model="eventStone.subject"
					 :value="eventStone.subject" 
					 highlightColor="#FF0000" 
					 :stringList="events" 
					 min="1"
					 v-on:selectItem="selectSubjectItem"></input-autocomplete>
				</view>
				<view class="cu-form-group">
					<view class="title">笔笔</view>
					<textarea v-model="eventStone.text" :style="{height:(eventStone.text.length >5?'130rpx':'45rpx')}"  maxlength="200"  placeholder="这一刻的想法心得……"></textarea>
					
					<!-- <input v-model="eventStone.text" placeholder="这一刻的想法心得……" ></input> -->
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
				<view class="cu-form-group" style="border-top: 0;" @click="fetchPosition">
					<view class="title">
						<text class="margin-right-xs" :class="eventStone.location.location?'cuIcon-locationfill':'cuIcon-location'"></text>
						<text>{{eventStone.location.name || "所在位置"}}</text>
					</view>
					<view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-form-group" style="border-top: 0;" @click="modalName='modalLink'">
					<view class="title">
						<text class="cuIcon-link margin-right-xs"></text>
						<text>{{linkValue || '链接'}}</text>
					</view>
					<view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-form-group">
					<view>
					</view>
					<view>
						<button @click="createEvent" class="margin-sm basis-sm shadow cu-btn bg-green" style="padding: 0 50upx;">
						保&nbsp;&nbsp;&nbsp;&nbsp;存
						</button>
					</view>
				</view>
			</view>
		</form>
		<view class="cu-modal" :class="modalName=='modalLink'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">超链接</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<textarea v-model="linkValue" style="height: 50upx;" maxlength="200"  placeholder="直接粘贴自剪切板 或 输入链接地址"></textarea>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green " @tap="fetchClipData">
						<text class="cuIcon-copy"></text>粘贴
					</view>
					<view class="action margin-0 flex-sub solid-left" @tap="hideModal(false)">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal(true)">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {addEvent,getAllEvent} from '../../common/api.js'
	import {upload} from '../../common/request.js'
	import {storage} from '../../common/storage.js'
	import inputAutocomplete from '@/components/pro/input-autocomplete.vue'
	export default{
		components: {
					inputAutocomplete
		},
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
					subject: "",
					text: "",
					classify: null,//this.$store.state.constants.event.classify.INPUT,
					type: this.$store.state.constants.event.type.GENERIC,
					status: "FULFILL",
					show: [],
					location: {},
					imgList:[]
				},
				addStyle: false,
				modalName: null,
				linkValue: null,
				events:[]
			}
		},
		onLoad() {
			uni.authorize({
			    scope: 'scope.userLocation',
			    success() {
					console.log("确定授权位置")
			        //uni.getLocation()
			    }
			})
			
		},
		mounted() {
			var temp = storage.get("storage:event:list")
			if (!temp) {
				this.eventList()
			}else {
				this.events = temp
			}
			uni.$on('event:created',this.eventList)
			

			
		},
		computed: {
			
			eventStatusLabel(){
				return this.eventStone.status == 'FULFILL'?'完成':'待办'
			},
			eventStatus(){
				return this.eventStone.status == 'FULFILL'?true:false
			},
			eventTypeLabel(){
				return this.eventStone.type == 'GENERIC'?'计划':'必做'
			},
			eventType(){
				return this.eventStone.type == 'GENERIC'?false:true
			},
			showall(){
				return this.showAll || this.addStyle
			}
			
		},
		watch:{
			
		},
		methods:{
			fetchClipData(){
				var _this = this
				uni.getClipboardData({
					success: function (res) {
						_this.linkValue = res.data
					}
				});	
			},
			hideModal(tf){
				if (tf){
					if (this.linkValue.indexOf("http") != 0){
						uni.showToast({
							image:"/static/logo.png",
							title:"不是超链接哟"
						})
						return
					}
				}else{
					this.linkValue = null
				}
				this.modalName = null
			},
			gotLocation(data){
				//console.log(data)
				if (data && data.name.length > 0){
					this.eventStone.location = {"name": data.city + " · " + data.name, "location":data.location}
				}else {
					this.eventStone.location = {}
				}
			},
			fetchPosition(){
				uni.$once('loaction:checked',this.gotLocation)
				uni.navigateTo({
				    url: '/pages/userLocation/index',
					animationType: 'slide-in-bottom',
				});
				
			},
			selectSubjectItem(data){
				if (data || data.selectItem) {
					this.eventStone.classify = data.selectItem.classify
					this.eventStone.type = data.selectItem.type
				}
			},
			eventList(){
				getAllEvent().then((data) => {
					data.forEach(e => {
						e.text = e.subject
					})
					this.events = data
					storage.put("storage:event:list",data)
				})
			},
			createEvent(){
				//FIXME 必填格式验证
				
				var push = () => {
					this.eventStone.imgList = null
					if (this.eventStone.location && this.eventStone.location.name != null){
						this.eventStone.show.push({type:"LOCATION",value:JSON.stringify(this.eventStone.location)})
						this.eventStone.location = null
					}
					if (this.linkValue){
						this.eventStone.show.push({type:"LINK",value: this.linkValue})
					}
					
					addEvent(this.eventStone).then((data) => {
						if (data.id) {
							uni.showToast({
								title:'记录点滴'
							})
							uni.$emit('event:created',null)
							this.addStyle = false
							this.eventStone= {
								subject: "",
								text: "",
								classify: null,
								type: this.$store.state.constants.event.type.GENERIC,
								status: "FULFILL",
								show: [],
								imgList:[],
								location:{}
							}
							this.linkValue = null
						}
					}).catch((e) => {
						console.error(e)
					})
				}
				
				if (this.eventStone.imgList.length >0){
					var i = 1
					var uploadCompleted = 0
					this.eventStone.imgList.forEach(async img => {
						uni.showLoading({
							title:"上传第"+(i++)+"张照片"
						})
						const uploadTask = upload(img, (res) => {
							this.eventStone.show.push({type:"PICTURE",value:res.id})
						}, (res) => {
							if (++uploadCompleted == this.eventStone.imgList.length) {
								push()
							}
						})
						uploadTask.onProgressUpdate((res) => {
							//console.log(res)
							//console.log('上传进度' + res.progress);
							//console.log('已经上传的数据长度' + res.totalBytesSent);
							//console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
							uni.hideLoading()
						});
					})
					
				}else {
					push()
				}

			},
			chooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					//sizeType: ['original', 'compressed'], 
					//sourceType: ['album','camera'], 
					success: (res) => {
						//this.eventStone.imgList.push(res.tempFilePaths)
						for (let i = 0, len = res.tempFiles.length; i < len; i++) {
							res.tempFiles[i]['upload_percent'] = 0;
							if (Math.ceil(res.tempFiles[i].size / 1024) < 5 * 1024) {
								//this.eventStone.imgList_size.push(Math.ceil(res.tempFiles[i].size / 1024));
								this.eventStone.imgList.push(res.tempFiles[i].path);
							} else {
								res.tempFilePaths.splice(i, 1);
								_self.upload_exceeded_list.push(i === 0 ? 1 : i + 1);
								uni.showModal({
									title: '提示',
									content: '照片过大不能上传哟',
									showCancel: false,
									confirmText: '确认',
									success(res) {
										console.log(res)
									}
								});
							}
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
					this.eventSubjectPlaceholder = "写《自控力》读后感"
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
