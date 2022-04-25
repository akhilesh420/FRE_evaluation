// ~~~~~~~~~~~~ View ~~~~~~~~~~~~
export const View = (() => {
    const domstr = {
        pendingContainer: ".pending",
        completedContainer: ".completed",
        deletebutton: "dlebtn",
        editbutton: "editbtn",
        completebutton: "circle",
        inputbox: ".add-todo",
    };

    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    };

    const createTmp = (arr) => {
        let tmp = "";
        arr.forEach((todo) => {
            tmp +=  `
            <div class="row todo">
                <div class="col">
                    <div class="circle ${todo.isCompleted ? 'complete' : ''}" id="${todo.id}"></div>
                </div>
                <div class="col todo-item-container">
                    <div class="row todo-item ${todo.isCompleted ? 'item-completed' : ''} ${!todo.isEditing ? '' : 'hide'}">${todo.content}</div>
                    <div class="row ${todo.isEditing ? '' : 'hide'}">
                        <input id="input-${todo.id}" type="text" class="edit-todo" value="${todo.content}">
                    </div>
                </div>
                <div class="col editbtn" id="${todo.id}">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                </div>
                <div class="col dlebtn" id="${todo.id}">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </div>
            </div>
            ` ;
        });
        return tmp;
    };
    return {
        domstr,
        render,
        createTmp,
    };
})();