<template>
	<view>
		<view class="bg-img bg-mask flex align-center" style="background-image: url(../../static/index.jpg);height: 454upx;">
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
		
		<view class="cu-list menu sm-border margin-top" >
			<view class="cu-item arrow" >
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
		</view>
		<view class="cu-list menu sm-border margin-top" >
			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-timefill text-grey"></text>
					<text class="text-grey">时间</text>
				</view>
			</view>
			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-ellipse text-grey"></text>
					<text class="text-grey">工具</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border margin-top" >
			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-settingsfill text-grey"></text>
					<text class="text-grey">设置</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				isLogin: false,
				userInfo: {}
			}
		},
		onLoad() {
			console.log("onload")
		},
		onReady(){
			console.log("onReady")
		},
		methods:{
			onGotWXUserInfo(msg){
				console.log(msg)
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
