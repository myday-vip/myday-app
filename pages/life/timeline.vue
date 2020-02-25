<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">时间</block></cu-custom>


		<view class="cu-timeline" v-for="(item,index) in data" :key="index">
			<view class="cu-time">{{item[0].createTime}}</view>
			<view class="cu-item" 
			:class="subitem.classify == 'INPUT'?'text-orange':(subitem.classify == 'OUTPUT'?'text-green':'text-red')"
			v-for="(subitem,subindex) in item" :key="subindex">
				<view class="content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-cyan">上午</view>
						<view class="cu-tag line-cyan">{{subitem.createTime}}</view>
					</view>
					<view class="margin-top">{{subitem.subject}}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					data:[
						[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-1-6 21:21:21"}, 
							{"subject": "英语口语", "classify": "INPUT", "createTime":"2020-1-6 21:21:21"}, 
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-1-6 21:21:21"}],
						[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-1-21 21:21:21"},
							{"subject": "写读后感", "classify": "OUTPUT", "createTime":"2020-1-21 21:21:21"},
							{"subject": "跑步5公里", "classify": "PHYSICAL_AGILITY", "createTime":"2020-1-21 21:21:21"}],
						[
							{"subject": "写读后感", "classify": "OUTPUT", "createTime":"2020-2-1 21:21:21"},
							{"subject": "跑步5公里", "classify": "PHYSICAL_AGILITY", "createTime":"2020-2-1 21:21:21"}],
						[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-2-22 21:21:21"}, 
							{"subject": "英语口语", "classify": "INPUT", "createTime":"2020-2-22 21:21:21"}, 
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-2-22 21:21:21"},
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-2-22 21:21:21"}],
					]
			};
		},
		onLoad: function (option) { 
					console.log(option); 
				}
	}
</script>

<style>

</style>
