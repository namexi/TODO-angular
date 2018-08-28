(function (angular) {
	'use strict'

	/**
	* todoApp Module
	*
	* Description
	*/
	// 定义模块、主控
	angular.module('todoApp', []).controller('MianController', ['$scope', function($scope){
		// 初始化 页面成员
		$scope.input = ''
		$scope.todoList = [
		// { id : 1, text : 1, state : false},
		// { id : 2, text : 2, state : false},
		// { id : 3, text : 3, state : false}
		]
		// 初始化 成员行为
		$scope.doen = ($event) => {
			let idx = 3
			//TODO: 按回车键添加到任务列表中 
			if($event.keyCode === 13  && $scope.input) {
				let todo = {id : idx++, text : $scope.input, state : false}
				$scope.todoList.push(todo)
				$scope.input = ''
			}
		}
		$scope.dele = () => {
		
			// TODO: 点击删除当前列表行
			
		}
		$scope.eidi = () => {
			// TODO: 双击弹出input 文本框
		}

	}])

})(angular)

