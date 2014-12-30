
(function(){

	// dom ready
	$(function(){
		// ajaxUrl配置
		var AjaxUrl = {
			'baseUrl' : 'http://115.29.243.103:8092',
			'choose' : '/api/jiujie/choose/',
			'addComment' : '/api/jiujie/comment/add/'
		},
			global = {
				'jiujieId': $('html').data('id')
			};		
		// 设置图片框架最大高度
		var width = getContentImgFrameWidth() - 2;
		$('.contentImg').css('height', width);
		
		$('body').on('click', '#showCommetPopup', function() {
			//弹窗显示事件绑定
			$('#mask, #popup').show();
		}).on('click', '#popup .closeBtn', function(){
			// 关闭弹窗
			$('#mask, #popup').hide();
		}).on('click', '#choice1, #choice2', function() {
			// 观点点击事件绑定
			var $dom = $(this),
				uri = AjaxUrl.baseUrl + AjaxUrl.choose + global.jiujieId + '/' + $dom.data('value') + '/';
			console.log('投票url : ' + uri);
			$.post(uri, function (response) {
				var jsonResponse = $.parseJSON(response);
				if(jsonResponse.code == 200){
					var $count = $dom.children('em');
					console.log($count.text());
					$count.text(parseInt($count.text()) + 1).show();
				}else{
					console.log(response);
				}	
			});
		}).on('click', '#submitComment', function(event){
			// 添加评论
			var $popup = $('#popup'),
				$form = $popup.children('form'),
				$nickName = $form.children('input'),
				$content = $form.children('textarea'),
				$submitBtn = $form.children('button'),
				uri;
			if(!$nickName.val()){
				$nickName.addClass('input--error');
				return false;
			}
			if(!$content.val()) {
				$content.addClass('input--error');
				return false;
			}
			$submitBtn.text("正在提交...");			
			uri = AjaxUrl.baseUrl + AjaxUrl.addComment + global.jiujieId + '/';
			console.log('提交评论url : ' + uri);
			$.post(uri, $form.serialize(), function(response){
				var jsonResponse = $.parseJSON(response);
				$('#popup .closeBtn').trigger('click');
				$submitBtn.text("确 定");
				if(jsonResponse.code == 200){
					var $comment = $('#comment'),
						$label = $comment.children("dt"),
						$count = $label.children('em'),
						commentCount = parseInt($count.text()) ? parseInt($count.text()) : 0;

					console.log(commentCount + 1);
					$comment.append('<dd>' + $nickName.val() + '：' + $content.val() + '</dd>').show();
					$count.text(commentCount + 1);
					$form[0].reset();
				}else{
					console.log(response);
				}
			})
			event.preventDefault();
		}).on("focus", "input, textarea", function(){
			$(this).removeClass('input--error');
		});




	});

	// 获取内容图片框架宽度
	function getContentImgFrameWidth(){
		return $('.contentImg').eq(0).width();
	}

	//提交数据
	function sumitCommit(){ 
		$.getJSON('', function(data){

		});
	}
	

})();
