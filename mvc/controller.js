import { View } from './view.js'
import { Model } from './model.js'

// ~~~~~~~~~~~~ Controller ~~~~~~~~~~~~
export const Controller = ((model, view) => {
    const state = new model.State();

    const addTodo = () => {
        const inputbox = document.querySelector(view.domstr.inputbox);
        inputbox.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                const newtodo = new model.Todo(event.target.value, true);

                model.addTodo(newtodo).then(todo => {
                    state.todolist = [todo, ...state.todolist];
                });
                event.target.value = "";
            }
        });
    };

    const deleteTodo = () => {
        const deleteButton = document.querySelector(view.domstr.deletebutton);
        deleteButton.addEventListener("click", (event) => {
            state.todolist = state.todolist.filter((todo) => +todo.id !== +this.id);
            model.deleteTodo(id);
        });
    };

    const init = () => {
        model.getTodos().then((todolist) => {
            state.todolist = todolist.reverse();
        });
    };

    const bootstrap = () => {
        init();
        deleteTodo();
        addTodo();
    };

    return { bootstrap };
})(Model, View);