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
	}])

})(angular);
