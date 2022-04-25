// ~~~~~~~~~~~~ API ~~~~~~~~~~~~
export const Api = (() => {
    const baseUrl = 'http://localhost:3000';
    const path = "todos";

    const getTodos = () =>
        fetch([baseUrl, path].join("/")).then((response) => response.json());

    const editTodo = (id, updatedTodo) => {
        const todo = {...updatedTodo};
        delete todo.isEditing;
        fetch([baseUrl, path, id].join("/"), {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json());
    }

    const deleteTodo = (id) =>
        fetch([baseUrl, path, id].join("/"), {
            method: "DELETE",
        });

    const addTodo = (newTodo) =>
        fetch([baseUrl, path].join("/"), {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json());

    return {
        getTodos,
        editTodo,
        deleteTodo,
        addTodo
    };
})();