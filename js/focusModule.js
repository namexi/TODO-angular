(function (angular) {
	'user strict'
	// 获取主控制器并注册自定义指令
	angular.module('todoApp').directive('autoFocus',[function () {
		return {
			// restrict: 'C',
			link:function (scope,element,attributes) {
				element.on('dblclick',()=>{
					element.find('input')[1].focus()
				})
			}
		}
	}])
})(angular)