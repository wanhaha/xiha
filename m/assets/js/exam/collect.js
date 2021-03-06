(function($,doc) {
    var param = {
        'ctype':ctype,
        'stype':stype
    }
    var limit = 1;
    var qid = 1;
    var page = 1;
    page = page == 0 ? 1 : page;
    page = isNaN(page) ? 1 : page;
	var errq = localStorage.getItem('errq_'+ctype+'_'+stype) ? JSON.parse(localStorage.getItem('errq_'+ctype+'_'+stype)) : [];
	var trueq = localStorage.getItem('trueq_'+ctype+'_'+stype) ? JSON.parse(localStorage.getItem('trueq_'+ctype+'_'+stype)) : [];
	var colle = localStorage.getItem('colle') ? JSON.parse(localStorage.getItem('colle')) : [];
	if(colle.length == 0) {
		doc.getElementById('question').innerHTML = '<div class="" style="background: #f5f5f5; text-align:center; padding-top:70px; margin:0px auto;"><span class="iconfont" style="color:#E4E4E4; font-size:5rem;">&#xe63b;</span><br/><p style="text-align: center; margin-top:25px;">你还没有收藏题目哦！快快做题吧</p></div>';
		return false;
	}
	var choose_list = [];
	
    // 获取题号
  	localStorage.setItem('qtotal', colle.length);
  	
    // 获取分页的题目号
    var _question_list = getQuestionIdsByColle(page, limit, colle);
    var _question_ids = _question_list.join(',');
    var question_list = localStorage.getItem('question_list') ? JSON.parse(localStorage.getItem('question_list')) : [];

    //初始化
    localStorage.setItem('temporary_page', page);
	getPractises(_question_ids, 'v2', 'exam', 'question_list.php');
	question_list = JSON.parse(localStorage.getItem('question_list'));
    question_list.page = page;
    question_list.qtotal = colle.length;
    doc.getElementById('qtotal').innerHTML = colle.length;
    doc.getElementById('qid').innerHTML = page;
	var colle = localStorage.getItem('colle') ? JSON.parse(localStorage.getItem('colle')) : [];
	var curr_id = question_list['question_list'][0]['id'];
    template_render(colle, curr_id, question_list, 'question', 'question_temp');
  	
  	//上一页 下一页
	var prev = doc.getElementById('prev');
	var next = doc.getElementById('next');

	prev.addEventListener('tap', function() {
		choose_list.length = 0;
		var colle = localStorage.getItem('colle') ? JSON.parse(localStorage.getItem('colle')) : [];
		doc.getElementById('showexplain').style.display = 'none';
		var page = localStorage.getItem('temporary_page');
		page--;
		next.style.color = '#5c5c5c';
		if(page == 0) {
			this.style.color = '#999';
			return false;
		}
        localStorage.setItem('temporary_page', page);
		var _question_list = getQuestionIdsByColle(page, limit, colle);
	    var _question_ids = _question_list.join(',');
	    var question_list = localStorage.getItem('question_list') ? JSON.parse(localStorage.getItem('question_list')) : [];
    	getPractises(_question_ids, 'v2', 'exam', 'question_list.php');
	    question_list = JSON.parse(localStorage.getItem('question_list'));
	    question_list.page = page;
	    question_list.qtotal = colle.length;
	    doc.getElementById('qtotal').innerHTML = colle.length;
    	doc.getElementById('qid').innerHTML = page;
		var curr_id = question_list['question_list'][0]['id'];
	    template_render(colle, curr_id, question_list, 'question', 'question_temp');
	})

	next.addEventListener('tap', function() {
		choose_list.length = 0;
		var colle = localStorage.getItem('colle') ? JSON.parse(localStorage.getItem('colle')) : [];
		doc.getElementById('showexplain').style.display = 'none';
		var page = localStorage.getItem('temporary_page');
		page++;
		prev.style.color = '#5c5c5c';
		if(page > colle.length) {
			this.style.color = '#999';
			return false;
		}
        localStorage.setItem('temporary_page', page);
		var _question_list = getQuestionIdsByColle(page, limit, colle);
	    var _question_ids = _question_list.join(',');
	    var question_list = localStorage.getItem('question_list') ? JSON.parse(localStorage.getItem('question_list')) : [];
    	getPractises(_question_ids, 'v2', 'exam', 'question_list.php');
	    question_list = JSON.parse(localStorage.getItem('question_list'));
	    question_list.page = page;
	    question_list.qtotal = colle.length;
	    doc.getElementById('qtotal').innerHTML = colle.length;
    	doc.getElementById('qid').innerHTML = page;
		var curr_id = question_list['question_list'][0]['id'];
	    template_render(colle, curr_id, question_list, 'question', 'question_temp');
	})
	
	// 点击弹出题目列表
	var temporary_trueq = [];
	var questions_no_list = doc.getElementById('questions_no_list');
	questions_no_list.addEventListener('tap', function() {
	    var question_list = localStorage.getItem('question_list') ? JSON.parse(localStorage.getItem('question_list')) : [];
		var errq_id_list = localStorage.getItem('errq_'+ctype+'_'+stype) ? JSON.parse(localStorage.getItem('errq_'+ctype+'_'+stype)) : [];
		var trueq_id_list = localStorage.getItem('trueq_'+ctype+'_'+stype) ? JSON.parse(localStorage.getItem('trueq_'+ctype+'_'+stype)) : [];
		var qtotal = localStorage.getItem('qtotal') ? parseInt(localStorage.getItem('qtotal')) : 0;
		var curr_qid = question_list['question_list'][0]['id'];
		var colle = localStorage.getItem('colle') ? JSON.parse(localStorage.getItem('colle')) : [];
    	var html = "<div style='width:100%; text-align:center; margin:0px; padding:0px;' id='choosequestion'>";
    	var list = [];
    	$.each(colle, function(k, v) {
    		list[k] = {
    			'id':v
    		};
    	});
    	var true_q = err_q = 0;
		$.each(list, function(k, v) {
			if(curr_qid == v.id) {
				list[k]['status'] = '2'; // 当前题目
    		} else {
				list[k]['status'] = '1'; // 无任何选择
		    }
    		if(-1 != errq_id_list.indexOf(parseInt(v.id))) { // 错题
				list[k]['status'] = '4';
				err_q++;
    		}
			if(-1 != trueq_id_list.indexOf(parseInt(v.id))) { // 正确
				list[k]['status'] = '3';
				true_q++;
    		}
		});
		$.each(list, function(k, v) {
			switch(v.status) {
				case '1':
		    		html += '<a data-id="'+v.id+'" class="choosequestion" style="">'+(k+1)+'</a>';
					break;
				case '2':
					html += '<a data-id="'+v.id+'" class="choosequestion" style="background:#666; border-color:#666;">'+(k+1)+'</a>';
					break;
				case '3':
    				html += '<a data-id="'+v.id+'" class="choosequestion" style="background:#18B4ED; border-color:#18B4ED;">'+(k+1)+'</a>';
					break;
				case '4':
					html += '<a data-id="'+v.id+'" class="choosequestion" style="background:#F25E5E; border-color:#F25E5E;">'+(k+1)+'</a>';
					break;
				default:
		    		html += '<a data-id="'+v.id+'" class="choosequestion" style="">'+(k+1)+'</a>';
    				break;
			}
		});
		var title = '<span class="dadui" style="color:#555;">正确：<b id="dadui_num" style="color:#18b4ed;">'+true_q+'</b> </span>&nbsp;&nbsp;<span class="dacuo">错误：<b id="dacuo_num" style="color:#f25e5e;">'+err_q+'</b></span>&nbsp;&nbsp;<span class="weida" style="color:#555;">总数：<b id="weida_num" style="color:#999">'+qtotal+'</b></span>';
    	html += '</div>';
	 	layer.open({
            type: 1,
            content: html,
            anim: 0.2,
            title: title,
            style: 'position:fixed; bottom:0; left:0; width:100%; height:400px; overflow-y:scroll; border:none;'
       });
       
		//选择题目
		$('#choosequestion').on('tap', '.choosequestion', function(e) {
			choose_list.length = 0;
			var colle = localStorage.getItem('colle') ? JSON.parse(localStorage.getItem('colle')) : [];
			var showexplain = doc.getElementById('showexplain');
			showexplain.style.display = 'none';
			var data_id = this.getAttribute('data-id');
			var page = this.innerText;
			layer.closeAll();
			localStorage.setItem('temporary_page', page);
    		getPractises(this.getAttribute('data-id'), 'v2', 'exam', 'question_list.php');
	    	var question_list = JSON.parse(localStorage.getItem('question_list'));
			question_list.page = page;
		    question_list.qtotal = colle.length;
		    doc.getElementById('qtotal').innerHTML = colle.length;
	    	doc.getElementById('qid').innerHTML = page;
			var curr_id = question_list['question_list'][0]['id'];
		    template_render(colle, curr_id, question_list, 'question', 'question_temp');
		})
	});
	
	// 单选题和判断题
	$('#question').on('tap', '.mui-ul-click .mui-single', function() {
		
		var question_list = localStorage.getItem('question_list') ? JSON.parse(localStorage.getItem('question_list')) : '';
		if(typeof question_list != 'object' || question_list == '' || question_list == false || question_list['question_list'].length == 0) {
			location.reload();
			return false;	
		}
		var answertrue = question_list['question_list'][0]['answertrue'];
		var qid = question_list['question_list'][0]['id'];
		var answer_id = this.getAttribute('title');
		if(-1 != choose_list.indexOf('checked')) {
			return false;	
		}
		$.each(this.parentNode.querySelectorAll('li'), function(k, v) {
			if (v.getAttribute('title') == answer_id) {
				choose_list.push('checked');
			} else {
				choose_list.push('unchecked');
			}
		});
		
		if(answer_id == answertrue) {
			if(this.querySelector('span').className == 'xuanze_no') {
				this.querySelector('.xuanze_no').innerHTML = '&#xe639;';
				this.querySelector('.xuanze_no').style.fontSize = '2.1rem';
				this.querySelector('.xuanze_no').className = 'iconfont';
				this.style.color = '#18b4ed';
				recordErrTrueQuestions(errq, trueq, qid, '2', ctype, stype); //记录正确
			} else {
				this.disabled = true;
			}
		} else {
			$.each(this.parentNode.querySelectorAll('li'), function(k, v) {
				if(v.getAttribute('title') == answertrue) {
					if(this.querySelector('span').className == 'xuanze_no') {
						this.querySelector('.xuanze_no').innerHTML = '&#xe639;';
						this.querySelector('.xuanze_no').style.fontSize = '2.1rem';
						this.querySelector('.xuanze_no').className = 'iconfont';
						this.style.color = '#18b4ed';		
					} else {
						this.disabled = true;
					}
				} else {
					this.disabled = true;
				}
			});
			if(this.querySelector('span').className == 'xuanze_no') {
				this.querySelector('.xuanze_no').innerHTML = '&#xe63a;';
				this.querySelector('.xuanze_no').style.fontSize = '2.1rem';
				this.querySelector('.xuanze_no').className = 'iconfont';
				this.style.color = '#f25e5e';
				recordErrTrueQuestions(errq, trueq, qid, '1', ctype, stype); //记录错题
			} else {
				this.disabled = true;
			}
		}
		doc.getElementById('showexplain').style.display = 'block';
		doc.getElementById('explain').innerHTML = '<span style="font-weight:bold; display:block; margin-top:10px; ">试题详解：</span><br />'+question_list['question_list'][0]['explain'];
		doc.getElementById('explain').style.color = '#8e734d';
	});
	
	// 多选题
	$('#question').on('tap', '.mui-ul-click .mui-multi', function() {
		var exam_btn = doc.getElementById('exam-btn');
		if(exam_btn == 'null') {
			return false;
		}
		var xuanze_no_list = [];
		if(this.querySelector('span').className != 'iconfont') {
			var flag = this.querySelector('.xuanze_no').getAttribute('data-id') ? this.querySelector('.xuanze_no').getAttribute('data-id') : 1;
			if(flag == 1) {
				this.querySelector('.xuanze_no').className += ' xuanze_checked';  
				this.querySelector('.xuanze_no').setAttribute('data-id', '2');
			} else {
				this.querySelector('.xuanze_no').className = 'xuanze_no';  
				this.querySelector('.xuanze_no').setAttribute('data-id', 1);
			}
			$.each(this.parentNode.querySelectorAll('.xuanze_no'), function(e) {
				if(this.getAttribute('data-id') == 2) {
					xuanze_no_list.push(this.getAttribute('data-id'));
				}		
			});
		}
		if(exam_btn) {
			if(xuanze_no_list.length > 1) {
				exam_btn.style.backgroundColor = '#18b4ed';			
				exam_btn.disabled = false;
			} else {
				exam_btn.style.backgroundColor = '#999';			
				exam_btn.disabled = true;
			}
		} else {
			return false;
		}
		
		//多选题确定
		exam_btn.addEventListener('tap', function() {
			this.parentNode.removeChild(exam_btn);
			var xuanze_no_list = [];
			var question_list = localStorage.getItem('question_list') ? JSON.parse(localStorage.getItem('question_list')) : '';
			if(typeof question_list != 'object' || question_list == '' || question_list == false || question_list['question_list'].length == 0) {
				location.reload();
				return false;	
			}
			var answertrue = question_list['question_list'][0]['answertrue'];
			var qid = question_list['question_list'][0]['id'];
			
			$.each(document.querySelectorAll('.xuanze_no'), function(e) {
				if(this.getAttribute('data-id') == 2) {
					xuanze_no_list.push(this.parentNode.getAttribute('title'));
				}			
			});
			if(xuanze_no_list.length == 1) {
				layer.open({
				    content: '这是一道多选题，请至少选择2个答案！',
				    time: 2 //2秒后自动关闭
				});
				return false;
			}
			var xuanze_no_str = xuanze_no_list.join('');
			if(answertrue == xuanze_no_str) {
				recordErrTrueQuestions(errq, trueq, qid, '2', ctype, stype); //记录正确
			} else {
				recordErrTrueQuestions(errq, trueq, qid, '1', ctype, stype); //记录错题
			}
			
			$.each(document.querySelectorAll('.xuanze_no'), function(e) {
				if(answertrue == xuanze_no_str) {
					if(-1 != answertrue.indexOf(this.parentNode.getAttribute('title'))) {
						this.innerHTML = '&#xe639;';
						this.style.fontSize = '2.1rem';
						this.className = 'iconfont';
						this.style.color = '#18b4ed';
					}
				} else {
					if(-1 != answertrue.indexOf(this.parentNode.getAttribute('title'))) {
						this.innerHTML = '&#xe639;';
						this.style.fontSize = '2.1rem';
						this.className = 'iconfont';
						this.style.color = '#18b4ed';
					} else {
						this.innerHTML = '&#xe63a;';
						this.style.fontSize = '2.1rem';
						this.className = 'iconfont';
						this.style.color = '#f25e5e';
					}
				}
			});
			doc.getElementById('showexplain').style.display = 'block';
			doc.getElementById('explain').innerHTML = '<span style="font-weight:bold; display:block; margin-top:10px; ">试题详解：</span><br />'+question_list['question_list'][0]['explain'];
			doc.getElementById('explain').style.color = '#8e734d';
		})
	});
	
	// 收藏
	var is_colle = 1;
	var collection = doc.getElementById('collection');
	collection.addEventListener('tap', function() {
		var colle = localStorage.getItem('colle') ? JSON.parse(localStorage.getItem('colle')) : [];
		var question_list = localStorage.getItem('question_list') ? JSON.parse(localStorage.getItem('question_list')) : [];
		var curr_id = question_list['question_list'][0]['id'];
		if(is_colle == 2) {
			if(-1 == colle.indexOf(parseInt(curr_id))) {
				colle.push(curr_id);
			}
			this.style.color = '#ea8010';
			this.querySelector('.iconfont').innerHTML = '&#xe635;';
			is_colle = 1;
			
		} else {
			if(-1 != colle.indexOf(parseInt(curr_id))) {
				colle.remove(curr_id);
			}
			this.style.color = '#5c5c5c';
			this.querySelector('.iconfont').innerHTML = '&#xe636;';
			is_colle = 2;
		}
		localStorage.setItem('colle', JSON.stringify(colle));
			
	});
	
	// 从错题中获取题目ID
	function getQuestionIdsByColle(page, limit, colle) {
	    if(typeof colle != 'object' || colle.length == 0) {
	        return false;
	    }
	   	var p = page <= 0 ? 1 : page;
	    var start = (p - 1) * limit;
	    var list = [];
	    for(var i = start; i < limit * p; i++) {
	        list.push(colle[i]);
	    }
	    return list;
	}
	
})(mui,document);
