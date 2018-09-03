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
