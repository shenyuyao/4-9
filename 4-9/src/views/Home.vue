<template>
	<div class="home">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="学号" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="xb" label="性别">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="mini" @click="ajouter">添加</el-button>
					<div v-show='isShow'>
						<input type="text" placeholder="姓名" v-model='arr.name'><input type="text" placeholder="性别" v-model='arr.xb'>
						<input type="text" placeholder="fenlei" v-model='arr.fenlei'></div>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				arr:{},
                isShow:false
			}
		},
		methods: {
			embal:function(){
                this.$http.post('http://localhost:3000/',{fenlei:this.$route.params.id},{emulateJSON:true}).then(e=>this.tableData=e.body)
            },
            handleDelete(row) {
                console.log(row);
                this.$http.post('http://localhost:3000/del',{id:row.id},{emulateJSON:true}).then(e=>row.id=e.body)
                var _index = this.tableData.indexOf(row)
                this.tableData.splice(_index,1)
                
            },
            ajouter(){
                this.$http.post('http://localhost:3000/add',this.arr,{emulateJSON:true})
                .then(()=>{})
                this.isShow=!this.isShow
            }
		},
		created() {
			this.embal()
		},
		watch: {
			'$route': function() {
				this.embal()
			}
		}
	}
</script>