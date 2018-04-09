<template>
	<div id="app">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">
				<router-link to="/">首页</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link to="/1">1705A</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link to="/2">待重修</router-link>
			</el-menu-item>
			<el-menu-item index="4">
				<router-link to="/3">已重修</router-link>
			</el-menu-item>
		</el-menu>
		<router-view/>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeIndex: ""
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		created() {
			if(this.$route.params.id == null) {
				this.activeIndex = "1"
			} else {
				this.activeIndex = parseInt(this.$route.params.id) + 1 + ""
			}
		},
		watch: {
			'$route' () {
				if(this.$route.params.id == null) {
					this.activeIndex = "1"
				} else {
					this.activeIndex = parseInt(this.$route.params.id) + 1 + ""
				}
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
	}
	
	#nav {
		padding: 30px;
	}
	
	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}
	
	#nav a.router-link-exact-active {
		color: #42b983;
	}
	
	a {
		display: block;
		text-decoration: none;
		padding: 0 20px;
	}
</style>