
(function (angular) {
	'use strict'
	// 获取唯一ID
	 function getIdx() {
	 	return Math.random()*100
	 }
	 //读取本地储存数据
	function getStorage(name) {
		return JSON.parse(localStorage.getItem(name))
	}
	//持久化到本地
	function setStorage(name,data) {
		localStorage.setItem(name,JSON.stringify(data))
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
		$scope.checkAll  //全选状态
		$scope.handover = {} // 设置切换值
		$scope.location = $location // 将location对象暴露给$scope
		$scope.index = 0  //不全选数
		// 读取本地储存数据
		if (localStorage.pagecount) {
		 	let todo = getStorage('pagecount')
			 // 将本地数据给 todolist 成员
			 todo.forEach((element) => {
			 	$scope.todoList.push(element)
			})
		 }
		 // 读取 状态 数
		 if (localStorage.checkAll) {
		 	let i = localStorage.checkAll
			i == $scope.todoList.length? $scope.checkAll = true : $scope.checkAll = false
		} 
	
 		// 初始化 成员行为
				//$scope.checkAll = false
		$scope.doen = ($event) => {
			
			//TODO: 按回车键添加到任务列表中 
			if($event.keyCode === 13  && $scope.input) {
				let todos = {id : getIdx(), text : $scope.input, state : false }
				//持久化
				$scope.todoList.push(todos)
				// 将数据添加到本地储存
				setStorage('pagecount',$scope.todoList)
				//==> [{}]			
				$scope.input = '' // 清空输入框

				// 读取数据前 防止$scope.index叠加
				if (!localStorage.checkAll) {
					setStorage('checkAll',0)
				}
				
				// 敲定回车后，重新判断全选与不全选状态
		 		if (localStorage.checkAll) {
		 			let i = localStorage.checkAll
					i == $scope.todoList.length? $scope.checkAll = true : $scope.checkAll = false
				} 
			}
		}

		$scope.click = (that) =>{
 			
 			//TODO: 持久化选择状态
 			$scope.index = localStorage.checkAll? localStorage.checkAll : 0
			let idx = $scope.todoList.indexOf(that)
			$scope.todoList[idx].state = that.state
			setStorage('pagecount',$scope.todoList)

			// 不全选
			if (that.state) {	
				// $scope.index =localStorage.checkAll? Number(localStorage.checkAll):$scope.index
				$scope.index++	
			}else if(localStorage.checkAll > 0) {
				// $scope.index =localStorage.checkAll? Number(localStorage.checkAll):$scope.index
				$scope.index--
			}
			setStorage('checkAll',$scope.index)
			let todo = getStorage('pagecount')
			 $scope.index  == todo.length? $scope.checkAll = true : $scope.checkAll = false
				
		}

	 	$scope.dele = (that) => {
			
			// TODO: 点击删除当前列表行
			// 删除有状态的数据
			if(that.state) {
				let id = $scope.todoList.indexOf(that)
				let dele = $scope.todoList.splice(id,1)
				if (dele) setStorage('pagecount',$scope.todoList)
				$scope.index =localStorage.checkAll
				$scope.index--	
				setStorage('checkAll',$scope.index)
				
			}
			// 删除无状态的数据
			if (!that.state) {
				let id = $scope.todoList.indexOf(that)
				let dele = $scope.todoList.splice(id,1)
				if (dele) setStorage('pagecount',$scope.todoList)

				//删除无状态 需要重新获取状态
				if (localStorage.checkAll) {
		  			let i = localStorage.checkAll
					i == $scope.todoList.length? $scope.checkAll = true : $scope.checkAll = false
		 		}				
			}
		
		
		// 全部清空即清空本地储存
			if ( getStorage('pagecount').length === 0) {
		 		$scope.checkAll = false
		 		localStorage.removeItem('pagecount')
				localStorage.removeItem('checkAll')
				//setStorage('checkAll',$scope.index)
			}		
			 
			// let id = $scope.todoList.indexOf(that)
			// let dele = $scope.todoList.splice(id,1)
			// if (dele) {
			// 	setStorage('pagecount',$scope.todoList)

   //      // 删除成功后 重新读取数据 让全选、不全选状态显示出来
			// 	if (localStorage.checkAll) {
		 // 			let i = localStorage.checkAll
			// 		i == $scope.todoList.length? $scope.checkAll = true : $scope.checkAll = false
			// 	} 
			// // 在删除成功中的数据中判断被删除的状态
			// 	if(dele.state){
			// 		$scope.index =localStorage.checkAll? localStorage.checkAll:$scope.index
			// 		$scope.index--	
			// 		setStorage('checkAll',$scope.index)
			// 	}
						
			// }
			// // 全部清空即清空本地储存
			// if ( getStorage('pagecount').length === 0) {
			// 	localStorage.checkAll = 0
			// 	$scope.checkAll = false
			// 	localStorage.removeItem('pagecount')
			// 	localStorage.removeItem('checkAll')
			// 	//setStorage('checkAll',$scope.index)
			// }		
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
		

		let folag = false //数据状态开关
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
				localStorage.removeItem('pagecount')
				localStorage.removeItem('checkAll')
			}

			// 有状态数据被删 即 没有 状态数
			if(folag) {
				localStorage.removeItem('checkAll')
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

