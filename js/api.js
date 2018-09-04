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
	// 根据选择数设置全选与不全选
	function setState(anScope,i) {
		i == anScope.todoList.length? anScope.checkAll = true : anScope.checkAll = false
	}
	// 清空本地储存
	function emptyStorage(storageName) {
		localStorage.removeItem(storageName)
	}
	// 删除当前数据
	function deleData(anScope,that) {
		// 获取当前数据的索引
		let id = anScope.todoList.indexOf(that)
		// 根据索引删除元素
		let dele = anScope.todoList.splice(id,1)
		// 返回被删除的元素
		return dele
	}
  	// 储存数据
	function setDate(scopeInput,data) {
		let todos = {id : getIdx(), text : scopeInput, state : false }
		// 添加给 todoList
		data.push(todos)
		return data
	}

	// 全选与不全选 （计数法）
	function checkedAllOrNone(anScope,that) {
		// 获取选择数
		anScope.index = localStorage.checkAll? localStorage.checkAll : 0
		// 获取当前元素的索引
		let idx = anScope.todoList.indexOf(that)
		// 设置当前元素选择状态为当前元素绑定的状态
		anScope.todoList[idx].state = that.state
		// 将数据持久化
		setStorage('pagecount',anScope.todoList)
		// 让选择数根据选择状态变化
		if (that.state) {
			anScope.index++
		}else if(localStorage.checkAll > 0) {
				anScope.index--
		}
		// 将选择数返回给外界
		return anScope.index
	}