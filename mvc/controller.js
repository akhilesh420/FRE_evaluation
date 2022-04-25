import { View } from './view.js'
import { Model } from './model.js'

// ~~~~~~~~~~~~ Controller ~~~~~~~~~~~~
export const Controller = ((model, view) => {
    const state = new model.State();

    const addTodo = () => {
        const inputbox = document.querySelector(view.domstr.inputbox);
        inputbox.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                const newtodo = new model.Todo(event.target.value, false, false);

                model.addTodo(newtodo).then(todo => {
                    state.todolist = [todo, ...state.todolist];
                });
                event.target.value = "";
            }
        });
    };

    const deleteTodo = () => {
        const deletebuttons = document.getElementsByClassName(view.domstr.deletebutton);

        for (const deletebutton of deletebuttons) {
            deletebutton.addEventListener("click", (event) => {
                const id = event.currentTarget.id;
                console.log(id);
                state.todolist = state.todolist.filter((todo) => +todo.id !== +id);
                model.deleteTodo(id);
            });
        }
    };

    const updateTodo = () => {
        const editbuttons = document.getElementsByClassName(view.domstr.editbutton);
        const completebuttons = document.getElementsByClassName(view.domstr.completebutton);

        for (const editbutton of editbuttons) {
            editbutton.addEventListener("click", (event) => {
                const id = event.currentTarget.id;
                const todo = state.getTodo(id);
                todo.isEditing = true;
                const index = state.todolist.findIndex(todo => +todo.id === +id);
                const list = state.todolist;
                list[index] = todo;
                state.todolist = list;

                const editInput = document.querySelector(`#input-${id}`);
                console.log(editInput);
                editInput.addEventListener("keyup", (event) => {
                    if (event.key === "Enter") {
                        todo.isEditing = false;
                        const newtodo = new model.Todo(event.target.value, false, false);

                        model.editTodo(id, newtodo);
                    }
                });
            });
        }

        for (const completebutton of completebuttons) {
            completebutton.addEventListener("click", (event) => {
                const id = event.currentTarget.id;
                const todo = state.getTodo(id);
                todo.isCompleted = !todo.isCompleted;
                const index = state.todolist.findIndex(todo => +todo.id === +id);
                const list = state.todolist;
                list[index] = todo;
                state.todolist = list;
                model.editTodo(id, todo);
            });
        }
    }

    const init = () => {
        model.getTodos().then((todolist) => {
            state.todolist = todolist.map(todo => ({ ...todo, isEditing: false })).reverse();
            deleteTodo();
            updateTodo();
        });
    };

    const bootstrap = () => {
        init();
        addTodo();
    };

    return { bootstrap };
})(Model, View);