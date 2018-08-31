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
		$scope.idx = 0  // 计数功能
		$scope.editedTodo = 0 //排他思想的ID
 		// 初始化 成员行为
		$scope.doen = ($event) => {
			
			//TODO: 按回车键添加到任务列表中 
			if($event.keyCode === 13  && $scope.input) {
				$scope.idx++
				let todos = {id:$scope.idx, text : $scope.input, state : false}
				//持久化
				$scope.todoList.push(todos)
				// 将数据添加到本地储存
				localStorage.setItem('pagecount',JSON.stringify($scope.todoList))
				//==> [{}]
				
				$scope.input = ''
			}
		}
		// 读取本地储存数据
		if (localStorage.pagecount) {
			let todo = localStorage.getItem('pagecount')
			todo = JSON.parse(todo)
			todo.forEach((element,index) => {
				$scope.todoList.push(element)
				$scope.idx = index + 1
			})
		}
	 	$scope.dele = () => {
			
			// TODO: 点击删除当前列表行
			let idx = $scope.todoList.length
			let dele = $scope.todoList.splice(idx-1,1)
			if (dele.length !== 0) {
				$scope.idx--
			}
			localStorage.setItem('pagecount',JSON.stringify($scope.todoList))	
		}
		$scope.eidi = (that) => {

		// TODO: 双击弹出input 文本框			
			//设置排他ID
			$scope.editedTodo = that.id
		}

	}])

})(angular)

