(function (angular) {
	'use strict'
	 function getIdx() {
	 	return Math.random()*100
	 }
	/**
	* todoApp Module
	*
	* Description
	*/
	// 定义模块、主控
	angular.module('todoApp', []).controller('MianController', ['$scope','$location', function($scope,$location){
		// 初始化 页面成员
		$scope.input = ''
		$scope.todoList = [
		// { id : 1, text : 1, state : false},
		// { id : 2, text : 2, state : false},
		// { id : 3, text : 3, state : false}
		]
		$scope.editedTodo = 0 //排他思想的ID
		$scope.checkAll

 		// 初始化 成员行为
		$scope.doen = ($event) => {
			
			//TODO: 按回车键添加到任务列表中 
			if($event.keyCode === 13  && $scope.input) {
				let todos = {id : getIdx(), text : $scope.input, state : false}
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
			})
		}
	 	$scope.dele = (that) => {
		
			// TODO: 点击删除当前列表行
			let id = $scope.todoList.indexOf(that)
			let dele = $scope.todoList.splice(id,1)
			localStorage.setItem('pagecount',JSON.stringify($scope.todoList))	
		}
		$scope.eidi = (that) => {

			// TODO: 双击弹出input 文本框	
			$scope.editedTodo = that.id //设置排他ID
		}
		$scope.save = () => {

			// TODO: 数据保存完毕后恢复原样
			$scope.editedTodo = 0
		}
		$scope.show = () => {
			let folag = false	
			$scope.todoList.some(element => {
				if (element.state) {
					folag = true
				}  
			})
			return folag
		}
		
		$scope.clearCompleted = () => {
			//TODO: 清空已完成事项
			let idx = []
			$scope.todoList.forEach((element) => {
				if(!element.state) {
					idx.push(element)		 
				}
			})
			$scope.todoList = idx
			localStorage.setItem('pagecount',JSON.stringify($scope.todoList))
		}
		$scope.checkCompleted = () => {

			// TODO: 全选功能
			$scope.todoList.forEach(element => {
				element.state = !$scope.checkAll
				//if(element.state) idx++
			})
		}
		$scope.handover = {} // 设置切换值
		$scope.location = $location // 将location对象暴露给$scope
		//监听$scope中的location对象
		$scope.$watch('location.hash()',function (newVal,old) {

			// TODO: 完成 TAB 切换
			switch (newVal) {
				case '/active':
					$scope.handover = { state : false }
					break
				case '/completed':
				$scope.handover = { state : true }
					break
				default :
					$scope.handover = {}
					break
			}
		})
	}])

})(angular)

