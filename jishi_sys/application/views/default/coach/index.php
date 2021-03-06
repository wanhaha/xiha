<div id="app" v-cloak>
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页
		<span class="c-gray en">&gt;</span> 教练员管理
		<span class="c-gray en">&gt;</span> 教练员列表
		<a class="btn btn-success radius r" id="refresh" style="line-height:1.6em;margin-top:3px" v-on:click="showContent" _href="javascript:location.replace(location.href);" title="刷新" >
			<i class="Hui-iconfont">&#xe68f;</i>
		</a>
	</nav>
	<div class="page-container">
		<table class="table table-border table-bordered">
			<tr>
				<td class="va-m">
					<label for="inscode">是否通过检测：</label>
					<span class="select-box inline">
						<select name="" class="select">
							<option value="0">通过</option>
							<option value="1">未通过</option>
						</select>
					</span>
				</td>
				<td class="va-m">
					<label for="inscode">编号：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
				<td class="va-m">
					<label for="inscode">姓名：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
				<td class="va-m">
					<label for="inscode">手机号：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
				<td class="va-m">
					<label for="inscode">驾驶证号：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
			</tr>
			<tr v-show="searchseen">
				<td class="va-m">
					<label for="inscode">身份证号：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
				<td class="va-m">
					<label for="inscode">身份证号：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
				<td class="va-m">
					<label for="inscode">身份证号：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
				<td class="va-m">
					<label for="inscode">身份证号：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
				<td class="va-m">
					<label for="inscode">身份证号：</label>
					<input type="text" name="inscode" id="logmin" class="input-text Wdate" style="width:160px;">
				</td>
			</tr>
			<tr class="text-c">
				<td class="va-m" colspan="5">
					<div style="margin-top:10px;">
						<button class="btn btn-success radius" style="width: 100px;" type="button"><i class="Hui-iconfont">&#xe665;</i> 搜索</button>
						<div class="text-r c-primary" @click="searchseen = !searchseen" style="cursor: pointer;">高级搜索 <i class="Hui-iconfont">&#xe6d5;</i></div>
					</div>
				</td>
			</tr>
		</table>
		<div class="cl pd-5 bg-1 bk-gray mt-20"> <span class="l"><a href="javascript:;" @click="delcheckAll" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
		<a class="btn btn-primary radius" data-title="教练员" data-href="article-add.html" id="add" @click="addinfo" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 教练员</a></span>
		<span class="r">共{{ pagenum }}页 共有数据：<strong>{{ count }}</strong> 条</span> </div>
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-hover table-sort">
				<thead>
					<tr class="text-c">
						<th width="25"><input type="checkbox" v-model="checked" @click="checkAll" name="" value=""></th>
						<th width="80">ID</th>
						<th>培训机构编号</th>
						<th>姓名</th>
						<th width="80">性别</th>
						<th width="80">身份证号</th>
						<th width="80">手机号</th>
						<th width="80">地址</th>
						<th width="80">驾驶证号</th>
						<th width="80">驾驶证初领日期</th>
						<th width="80">准驾车型</th>
						<th width="80">准教车型</th>
						<th width="120">供职状态</th>
						<th width="75">入职日期</th>
						<th width="60">教练员编号</th>
						<th width="60">发布状态</th>
						<th width="120">操作</th>
					</tr>
				</thead>
				<tbody>
					<template  v-if="seen">
						<tr class="text-c" v-for="item in list">
							<td><input type="checkbox" :value="item.coachid" v-model="choosechecked" name=""></td>
							<td>{{ item.coachid }}</td>
							<td>
								<u v-if="item.inscode == ''"><button class="btn btn-success size-S radius">获取</button></u>
								<u v-else style="cursor:pointer" v-bind:id="['coachid'+item.coachid]" class="text-primary" @click="showinfo(item.coachid)" @mouseover="hoverinfo(item.coachid)" @mouseleave="closeinfo(item.coachid)" title="查看"> {{ item.inscode }}</u>
							</td>
							<td>{{ item.name }}</td>
							<td v-if="item.sex == 1">男</td>
							<td v-else-if="item.sex == 2">女</td>
							<td v-else>未知</td>
							<td>{{ item.idcard }}</td>
							<td>{{ item.mobile }}</td>
							<td>{{ item.address }}</td>
							<td>{{ item.drilicence }}</td>
							<td>{{ item.fstdrilicdate }}</td>
							<td>{{ item.dripermitted }}</td>
							<td>{{ item.teachpermitted }}</td>
							<td v-if="item.employstatus == 0">在职</td>
							<td v-else>离职</td>
							<td>{{ item.hiredate }}</td>
							<td v-if="item.coachnum == ''"><button class="btn btn-success size-S radius">获取</button></td>
							<td v-else>{{ item.coachnum }}</td>
							<td class="c-error">未通过</td>
							<td class="f-14 td-manage">
								<template >
									<a style="text-decoration:none" href="javascript:;" title="审核">审核</a>
									<a style="text-decoration:none" class="ml-5" @click="editinfo(item.coachid)" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
									<a style="text-decoration:none" class="ml-5" @click="delinfo(item.coachid)" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
								</template>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr class="text-c">
							<td v-bind:colspan="llen">
								{{ notice }}
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>

		<div id="pagination" class="page">
			<!--分页-->
		</div>
	</div>
</div>

<script>
	var vm = new Vue({
		el:"#app",
		data: {
			notice: '',
			seen: true,
			list: [],
			base_url: "<?php echo base_url('coach/listajax'); ?>",
			del_url: "<?php echo base_url('coach/delajax'); ?>",
			add_url: "<?php echo base_url('coach/add'); ?>",
			edit_url: "<?php echo base_url('coach/edit'); ?>",
			page: "<?php echo $p; ?>",
			pagenum: "<?php echo $pagenum; ?>",
			count: "<?php echo $count; ?>",
			llen:document.getElementsByTagName('th').length,
			choosechecked:[],
			checked: '',
			searchseen: false,
		},
		methods: {
			checkAll: function() {
				this.choosechecked = [];
				if(this.checked) {
					this.list.forEach(function(item) {
						vm.choosechecked.push(item.coachid);
					});
				}
			},
			delcheckAll: function() {
				console.log(this.choosechecked);
				if(this.choosechecked.length == 0) {
					this.showResult(0, '请选择需要删除的教练');
					return false;
				}
			},
			showlist: function(page) {
				layer.msg('加载中', {
					icon: 16,
					shade: 0.01,
					offset: '0%',
					// time:100000
				});
				$.ajax({
					type: 'post',
					url: this.base_url,
					data:{p: page},
					dataType:"json",
					async: false,
					success: function(data) {
						layer.closeAll();
                        if(data.code == 200) {
                            vm.list = data.data.list;
							vm.pagenum = data.data.pagenum;
							vm.count = data.data.count;
                            if(data.data.list.length === 0 ) {
                                vm.notice = '暂无列表信息';
                                vm.seen = false;
                            } else {
                                vm.seen = true;
                                vm.notice = '获取失败';
                            }
                        } else {

                        }
					},
					error: function() {
						layer.closeAll();
						vm.seen = false;
						vm.notice = '网络错误！找不到结果。';
					}
				});
			},
			showinfo: function(id) {
				layer.closeAll();
				layer.open({
					type: 2,
					area: ['700px', '530px'],
					fixed: false, //不固定
					maxmin: true,
					content: 'test'
				});
			},
			hoverinfo: function(id) {
				var index = layer.tips('我是另外一个tips，只不过我长得跟之前那位稍有些不一样。', '#cityid'+id, {
					tips: [1, '#5a98de'],
					time:0,
					area: '500px'
				});
			},
			closeinfo: function(id) {
				var index = layer.tips();
				layer.close(index);
			},
			addinfo: function() {
				this.showLayer('rb', this.add_url);
			},
			editinfo: function(id) {
				this.showLayer('lb', this.edit_url+'?id='+id);
			},
			delinfo: function(id) {
				layer.confirm('确认要删除吗？',function(index){
					$.ajax({
						type: 'post',
						url: vm.del_url,
						data: {id: id},
						dataType:'json',
						async: false,
						success: function(data) {
							if(data.code == 200) {
								vm.showResult(1, data.msg);
								vm.showContent();
							} else {
								vm.showResult(2, data.msg);
							}
						},
						error: function() {
							vm.showResult(0, '网络错误，请检查网络');
						}
					});
				});
			},
			showResult: function(icon_no, msg) {
                parent.layer.msg(msg, {
                    icon: icon_no,
                    offset: '0%',
                });
            },
			showContent: function() {
				this.showlist(this.page);
				laypage({
					cont: document.getElementById('pagination'), //容器。值支持id名、原生dom对象，jquery对象,
					pages: vm.pagenum, //总页数
					skip: true, //是否开启跳页
					skin: '#dd514c',
					groups: 7, //连续显示分页数
					curr: vm.page > vm.pagenum ? vm.pagenum : vm.page,
					jump: function(obj, first) {
						console.log(page);
						var page = obj.curr > vm.pagenum ? vm.pagenum : obj.curr;
						window.history.pushState(null, null, '?p='+page);
						vm.page = obj.curr;
						if(!first) {
							vm.showlist(obj.curr);
						}

					}
				});
			},
			showLayer: function(offset, content) {
				layer.closeAll();
				layer.open({
					title: document.getElementById('add').getAttribute('data-title')
					,offset: offset //具体配置参考：offset参数项
					,anim: -1
					,type: 2
					,area: ['60%','100%']
					,content: content
					,btn: '关闭'
					,btnAlign: 'c' //按钮居中
					,shade: 0.4 //不显示遮罩
					,shadeClose: true //不显示遮罩
					,maxmin: true
					,move: false
					,yes: function(){
						layer.closeAll();
					}
				});
			}
		}
	});
	vm.showContent();

</script>
