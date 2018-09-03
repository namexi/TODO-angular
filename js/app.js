
(function (angular) {
	'use strict'
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
		$scope.checkAll  //全选状态
		$scope.handover = {} // 设置切换值
		$scope.location = $location // 将location对象暴露给$scope
		$scope.index = 0  //选择计数

		// 读取本地储存数据
		if (localStorage.pagecount) {
		 	let todo = getStorage('pagecount')
			 // 将本地数据给 todolist 成员
			 todo.forEach((element) => {
			 	$scope.todoList.push(element)
			})
		}
		// 读取 状态 数
		if (localStorage.checkAll) setState($scope,localStorage.checkAll)
	
 		let folag = false //数据状态开关

		// 初始化 成员行为
		$scope.doen = ($event) => {
			
			//TODO: 按回车键添加到任务列表中 
			if($event.keyCode === 13  && $scope.input) {
				// 获取输入数据
				$scope.todoList = setDate($scope.input,$scope.todoList)
				$scope.input = ''
				// 将数据添加到本地储存
				setStorage('pagecount',$scope.todoList)		
				// 读取数据前 防止$scope.index叠加
				if (!localStorage.checkAll) setStorage('checkAll',0)	
				// 敲定回车后，重新判断全选与不全选状态
		 		if (localStorage.checkAll) setState($scope,localStorage.checkAll)
			}
		}

		$scope.click = (that) =>{	
 			//TODO: 持久化选择状态
 			// 不全选
 			$scope.index = checkedAllOrNone($scope,that)
 		 	// 持久化选择状态
			setStorage('checkAll',$scope.index)
		 // 根据选择数设置全选状态
			let todo = getStorage('pagecount')
			$scope.index  == todo.length? $scope.checkAll = true : $scope.checkAll = false		
		}

	 	$scope.dele = (that) => {
			
			// TODO: 点击删除当前列表行 及 持久化
			// 删除有状态的数据
			if(that.state) {
				let dele = deleData($scope,that)
				// 删除成功持久化数据
				if (dele) setStorage('pagecount',$scope.todoList)
				// 持久化状态数
				$scope.index =localStorage.checkAll
				$scope.index--	
				setStorage('checkAll',$scope.index)				
			}

			// 删除无状态的数据
			if (!that.state) {
				let dele = deleData($scope,that)
				// 删除成功持久化数据
				if (dele) setStorage('pagecount',$scope.todoList)
				//删除无状态 需要重新获取状态
				if (localStorage.checkAll) setState($scope,localStorage.checkAll)				
			}

			// 全部清空即清空本地储存
			if ( getStorage('pagecount').length === 0) {
				$scope.checkAll = false
				emptyStorage('pagecount')
			 	emptyStorage('checkAll')
			}		
		}

		$scope.eidi = (that) => {

			// TODO: 双击显示input 文本框	
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
			$scope.todoList.forEach(element => {
				if(!element.state) {
					idx.push(element)
					folag = true		 
				}
			})
				$scope.todoList = idx  //无状态数据
			// 数据持久化
				setStorage('pagecount',$scope.todoList)

			// 全选不全选状态持久化
				if ( getStorage('pagecount').length === 0 ) {
					$scope.checkAll = false
					emptyStorage('pagecount')
					emptyStorage('checkAll')
				}

			// 有状态数据被删 即 没有 状态数
				if(folag) {
					emptyStorage('checkAll')
				}
		}

		$scope.checkCompleted = () => {

			// TODO: 全选功能 与 持久化
			$scope.todoList.forEach(element => {
				element.state = !$scope.checkAll
			})
			setStorage('pagecount',$scope.todoList)

			// 不全选 与 持久化
			let todo = getStorage('pagecount')
			$scope.checkAll? $scope.index = 0 : $scope.index = todo.length
			setStorage('checkAll',$scope.index)  
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