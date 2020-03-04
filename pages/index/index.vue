<template>
	<view>
		<mainToday v-if="PageCur == 'today'"></mainToday>
		<life v-if="PageCur == 'analysis'"></life>
		<my v-if="PageCur == 'about'"></my>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="today">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur == 'today'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='today'?'text-green':'text-gray'">今天</view>
			</view>
			<view class="action" @click="NavChange" data-cur="analysis">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='analysis'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='analysis'?'text-green':'text-gray'">生命</view>
			</view>
			<view class="action" @click="NavChange" data-cur="about">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/about' + [PageCur == 'about'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='about'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'today'
			}
		},
		onLoad(option) {
			uni.$on('updatePageCur',this.NavChange2)
			
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			NavChange2: function(e) {
				this.PageCur = e.cur
			}
		}
	}
</script>

<style>

</style>