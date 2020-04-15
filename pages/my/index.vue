<template>
	<view>
		<view class="bg-img bg-mask flex align-center" style="height: 454upx;"
		:style="{backgroundImage: 'url('+photo+')'}"
		@tap="showMenu">
<!-- 			<block v-if="isLogin === true">
				<view class="padding-xl text-white">
					<view class="padding-xs text-xxl text-bold">
						<view class="cu-avatar xl round margin-right" style="background-image:url(../../static/logo.png);"></view>
						未来编写者
					</view>
					<view class="padding-xs text-lg">
						Focus on what matters. 专注于重要的事情
					</view>
				</view>
			</block> -->
			
			
			<block>
				<view class="padding-xl text-white">
					<view class="padding-xs text-xxl text-bold">
						<open-data class="cu-avatar xl round margin-right" type="userAvatarUrl"></open-data>
						<open-data type="userNickName"></open-data>
					</view>
					<view class="padding-xs text-lg">
						
					</view>
				</view>
			</block>
		</view>
		
		<block v-if="isLogin === false">
			<view class="cu-list menu sm-border margin-top " >
				<view class="cu-item" >
					<view class="content flex flex-direction">
						<!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
						<button @click="tologin" class="cu-btn bg-red margin-tb-sm lg">登录</button>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ -->
						<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotWXUserInfo" class="cu-btn bg-red margin-tb-sm lg">登录</button>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</block>
		
<!-- 		<view class="cu-list menu sm-border margin-top" >
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-global text-grey"></text>
					<text class="text-grey">世界</text>
				</view>
			</view>
			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">朋友</text>
				</view>
			</view>
		</view> -->
		<view class="cu-list menu sm-border margin-top" >
			<view class="cu-item arrow" @tap="toMyday">
				<view class="content">
					<text class="cuIcon-footprint text-grey"></text>
					<text class="text-grey">我的天啊</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="toTimeline">
				<view class="content">
					<text class="cuIcon-timefill text-grey"></text>
					<text class="text-grey">时间</text>
				</view>
			</view>
<!-- 			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-ellipse text-grey"></text>
					<text class="text-grey">工具</text>
				</view>
			</view> -->
		</view>
		<view class="cu-list menu sm-border margin-top" >
			<view class="cu-item arrow" @tap="showMenu">
				<view class="content">
					<text class="cuIcon-settingsfill text-grey"></text>
					<text class="text-grey">设置</text>
				</view>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='setMenu'?'show':''" @tap="modalName=null">
			<view class="cu-dialog">

				<view class="cu-list menu text-center text-xl">
					<view class="cu-item" @tap="changePhoto">
						<label class="flex justify-between align-center flex-sub">
							<view class="flex-sub">更换封面</view>
						</label>
					</view>
					<view class="cu-item">
						<label class="flex justify-between align-center flex-sub">
							<view class="flex-sub">取消</view>
						</label>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {login,updatePhoto} from '../../common/api.js'
	import {setToken,getToken,baseUrlOss} from '../../common/request.js'
	import {dateformat} from '../../common/util.js'
	
	export default{
		data(){
			return {
				isLogin: false,
				userInfo: {},//wx
				userInfo2: {},//myday
				photo:'../../static/index.jpg',
				modalName: null,
			}
		},
		
		onReady(){
			var _this = this
			if (getToken()){
				this.isLogin = true
			}
			uni.getStorage({
				key: 'MYDAY-USER',
				success: function (res) {
					if(res && res.data){
						_this.userInfo2 = JSON.parse(res.data);
						_this.photo = baseUrlOss(_this.userInfo2.photo)
					}
					
				}
			});
		},
		methods:{
			toMyday(){
				uni.navigateTo({
					url:'/pages/myday/index'
				})
			},
			changePhoto(){
				var _this = this
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    success: function (res) {
						//_this.photo = res.tempFilePaths[0]
						updatePhoto(res.tempFilePaths[0],function(ud){
							_this.userInfo2.photo = ud.photo
							_this.photo = baseUrlOss(ud.photo)
							uni.setStorage({
							    key: 'MYDAY-USER',
							    data: JSON.stringify(_this.userInfo2)
							});
						})
				    }
				});
			},
			showMenu(){
				this.modalName = "setMenu"
			},
			toTimeline(){
				let date = dateformat.all(new Date(),"yyyy-MM-dd")
				uni.navigateTo({
				    url: '/pages/life/timeline?date=' + date,
					animationType: 'pop-in',
					animationDuration: 260
				});
			},
			onGotWXUserInfo(msg){
				if (msg.detail.errMsg === "getUserInfo:ok") {
					this.userInfo = msg.detail.userInfo
					this.tologin("weixin")
				}else {
					uni.showToast({
						title: "授权失败",
						icon: "none",
						duration: 2000
					})
				}
			},
			tologin(provider) {
			    uni.login({
			        provider: provider,
			        // #ifdef MP-ALIPAY
			        scopes: 'auth_user', //支付宝小程序需设置授权类型
			        // #endif
			        success: (res) => {
			            console.log('login success:', res);
						login(res.code,this.userInfo).then((res) => {
							setToken(res.auth.access_token)
							this.isLogin = true
							this.userInfo2 = res.info
							if (res.info.photo){
								this.photo = baseUrlOss(this.userInfo2.photo)
							}
							uni.setStorage({
							    key: 'MYDAY-USER',
							    data: JSON.stringify(res.info)
							});
						})
			        },
			        fail: (err) => {
			            console.log('login fail:', err);
			        }
			    });
			}
		}
	}
</script>

<style>
</style>
