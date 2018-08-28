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
		$scope.todoList = ['1','2','3']
		// 初始化 成员行为
		$scope.doen =($event) => {
			//TODO: 按回车键添加到任务列表中 
		}
		$scope.dele =() => {
			// TODO: 点击删除当前列表行
		}
		$scope.eidi = () => {
			// TODO: 双击弹出input 文本框
		}
	}])

})(angular);
