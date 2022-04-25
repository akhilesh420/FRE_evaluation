import { Api } from './api.js'
import { View } from './view.js'

// ~~~~~~~~~~~~ Model ~~~~~~~~~~~~
export const Model = ((api, view) => {
    class Todo {
        constructor(content, isCompleted, isEditing) {
            this.content = content;
            this.isCompleted = isCompleted;
            this.isEditing = isEditing;
        }
    }

    class State {
        #todolist = [];

        get todolist() {
            return this.#todolist;
        }
        set todolist(newtodolist) {
            this.#todolist = [...newtodolist];

            const pending = this.todolist.filter((todo) => !todo.isCompleted);
            const completed = this.todolist.filter((todo) => todo.isCompleted);

            const pendingtodolistEle = document.querySelector(view.domstr.pendingContainer);
            const completedtodolistEle = document.querySelector(view.domstr.completedContainer);

            const pending_tmp = view.createTmp(pending);
            const complete_tmp = view.createTmp(completed);
            view.render(pendingtodolistEle, pending_tmp);
            view.render(completedtodolistEle, complete_tmp);
        }

        getTodo(id) {
            return this.todolist.find(todo => +todo.id === +id);
        }
    }

    const getTodos = api.getTodos;
    const deleteTodo = api.deleteTodo;
    const addTodo = api.addTodo;
    const editTodo = api.editTodo;

    return {
        getTodos,
        deleteTodo,
        addTodo,
        editTodo,
        State,
        Todo,
    };
})(Api, View);