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