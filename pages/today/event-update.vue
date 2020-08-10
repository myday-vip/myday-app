<template>
	
		<view class="cu-modal" :class="showMain?'show':''">
			<view class="cu-dialog" style="text-align: left;">
				<view class="bg-img" :class="addStyle?'height_small':'height_big'" 
				style="background-image: url('https://myday.vip/v1/bg/bing/newest.jpg');">
					<view v-show="!addStyle" class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal(false)">
							<text class="cuIcon-close "></text>
						</view>
					</view>
					<view class="margin-lr-xl text-white" style="padding-bottom: 25upx;">
						<view class="padding-xs text-xxl text-bold">
							{{currentModel.title}}
						</view>
						<view class="padding-xs text-lg" @tap="addStyle?addStyle=false:addStyle=true">
							{{currentModel.subtitle}}
						</view>
					</view>
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="addStyle?addStyle=false:addStyle=true">
							<text class="cuIcon-more "></text>
						</view>
					</view>
				</view>
				
				
				
				<form v-show="addStyle" class="animation-slide-bottom" style="animation: show 1.2s;">
					<view class="animation-slide-bottom" style="animation: show 1.2s;">
						<view class="cu-form-group">
							<view class="title">笔笔</view>
							<textarea v-model="eventStone.text" :style="{height:(eventStone.text.length >5?'130rpx':'45rpx')}"  maxlength="200"  placeholder="这一刻的想法心得……"></textarea>
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
					</view>
				</form>
				
				
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal(false)" v-if="currentModel.showCancel">取消</view>
					<view class="action margin-0 flex-sub  solid-left bg-green" 
					style="min-height: 100rpx;margin: 0;" 
					@tap="hideModal(true)"
					>{{currentModel.ok}}</view>
				</view>
			</view>
			
			<view class="cu-modal" :class="modalName=='modalLink'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">超链接</view>
						<view class="action" @tap="hideLinkModal">
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
						<view class="action margin-0 flex-sub solid-left" @tap="hideLinkModal(false)">取消</view>
						<view class="action margin-0 flex-sub text-green solid-left" @tap="hideLinkModal(true)">确定</view>
					</view>
				</view>
			</view>
			
			
		</view>
		

</template>

<script>
	import {addEvent,getAllEvent, updateStatusCompleted} from '../../common/api.js'
	import {upload} from '../../common/request.js'
	export default{
		props:{
			modelData: {
			    type: Object,
			    default(){
					return {ok:"我已完成",showCancel:true}
				}
			},
			showMain: {
				type: Boolean,
				default(){
					return false
				}
			}
		},
		data(){
			return {
				currentModel:this.modelData,
				eventStone: {
					text: "",
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
		watch:{
			modelData: function(val){
				this.currentModel = val
			}
		},
		onLoad() {
			
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
			hideModal(ok){
				if (ok=== true && this.currentModel.ok !== "知道了"){
					
					var push = () => {
						if (this.addStyle){
							this.eventStone.imgList = null
							if (this.eventStone.location){
								this.eventStone.show.push({type:"LOCATION",value:JSON.stringify(this.eventStone.location)})
								this.eventStone.location = null
							}
							if (this.linkValue){
								this.eventStone.show.push({type:"LINK",value: this.linkValue})
							}
						}else {
							this.defaultEventStone()
						}
						
						console.log(this.currentModel.id)
						console.log(this.eventStone)
						updateStatusCompleted(this.currentModel.id,this.eventStone).then((data) => {
							uni.showToast({
								title:"加油"
							})
							uni.$emit('event:updated',null)
							this.$emit('hide',null)
							this.addStyle = false
							this.defaultEventStone()
							this.linkValue = null
						}).catch((e) => {
							console.error(e)
						})
					}
					
					if (this.addStyle && this.eventStone.imgList.length >0){
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
								uni.hideLoading()
							});
						})
						
					}else {
						push()
					}
					
				}else {
					this.defaultEventStone()
					this.addStyle = false
					this.$emit('hide',null)
				}
				
			},
			hideLinkModal(tf){
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

			defaultEventStone(){
				this.eventStone = {
					text: "",
					type: this.$store.state.constants.event.type.GENERIC,
					status: "FULFILL",
					show: [],
					location: {},
					imgList:[]
				}
				this.linkValue = null
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

		}
		
	}
</script>

<style>
	.height_small{
		height: 80px;
	}
	.height_big{
		height: 200px;
	}
</style>
