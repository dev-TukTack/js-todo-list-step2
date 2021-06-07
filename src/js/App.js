import TodoInput from "./components/TodoInput.js";
import TodoTotal from "./components/TodoTotal.js";
import TodoList from "./components/TodoList.js";
import UserList	from "./components/UserList.js";
import { getTodos } from "./utils/storage.js";
import { $ } from "./utils/querySelector.js";
import API from "./api/api.js";

export default function App () {
	this.todos = "";

	const reloadTodos = async (filter) => {

		const $activeUser = $(".user.active");
		let todos = await API.getFetch(`/api/users/${ $activeUser.dataset.id }/items/`);

		(filter && filter !== "ALL") && (todos = todos.filter(({ isCompleted }) => isCompleted === (filter === "COMPLETED") ))

		this.todoList.setState(todos);

		setSate({ todos: todos});
	}

	this.userList = new UserList({
		reloadTodos: reloadTodos,
	});

	this.todoInput = new TodoInput({
		reloadTodos: reloadTodos,
	});

	this.todoList = new TodoList({
		reloadTodos: reloadTodos,
	});

	this.todoTotal = new TodoTotal({
		reloadTodos: reloadTodos,
	});

	const setSate = ({users, todos}) => {
		users && this.userList.setState(users);

		this.todoList.setState(todos);
		this.todoTotal.setState(todos);
	}

	const init = async () => {
		this.users = await API.getFetch("/api/users");
		setSate({users: this.users, todos: this.users[0].todoList});
	}

	init();

}