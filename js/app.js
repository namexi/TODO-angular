
(function (angular) {
	'use strict'
	// 获取唯一ID
	 function getIdx() {
	 	return Math.random()*100
	 }
	 //读取本地储存数据
	function getStorage() {
		return JSON.parse(localStorage.getItem('pagecount'))
	}
	//持久化到本地
	function setStorage(data) {
		localStorage.setItem('pagecount',JSON.stringify(data))
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
		$scope.handover = {} // 设置切换值
		$scope.location = $location // 将location对象暴露给$scope

		// 读取本地储存数据
		if (localStorage.pagecount) {
		 	let todo = getStorage()
			 // 将本地数据给 todolist 成员
			 todo.forEach((element) => {
			 	$scope.todoList.push(element)
			})
		 }
	
 		// 初始化 成员行为
 		
 		$scope.click = (that) =>{

 			//TODO: 持久化选择状态
			let idx = $scope.todoList.indexOf(that)
			$scope.todoList[idx].state = that.state
			setStorage($scope.todoList)
		}
		
		$scope.doen = ($event) => {
			
			//TODO: 按回车键添加到任务列表中 
			if($event.keyCode === 13  && $scope.input) {
				let todos = {id : getIdx(), text : $scope.input, state : false }
				//持久化
				$scope.todoList.push(todos)
				// 将数据添加到本地储存
				setStorage($scope.todoList)
				//==> [{}]
				
				$scope.input = ''
			}
		}

	 	$scope.dele = (that) => {
		
			// TODO: 点击删除当前列表行
			let id = $scope.todoList.indexOf(that)
			let dele = $scope.todoList.splice(id,1)
			if (dele) setStorage($scope.todoList)				
		}

		$scope.eidi = (that) => {

			// TODO: 双击弹出input 文本框	
			$scope.editedTodo = that.id //设置排他ID
		}

		$scope.save = () => {

			// TODO: 数据保存完毕后恢复原样
			$scope.editedTodo = 0
		}

		// TODO: 显示清空按钮
		$scope.show = () =>  $scope.todoList.some(element => element.state)
		
		$scope.clearCompleted = () => {

			//TODO: 清空已完成事项
			let idx = []
			$scope.todoList.forEach((element) => {
				if(!element.state) {
					idx.push(element)		 
				}
			})
			$scope.todoList = idx
			//持久化
			setStorage($scope.todoList)
		}

		$scope.checkCompleted = () => {

			// TODO: 全选功能
			$scope.todoList.forEach(element => {
				element.state = !$scope.checkAll
				//if(element.state) idx++
			})
		}

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

