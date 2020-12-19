import axios from 'axios'

// holds all the data
const state = {
    todos: [
        {
            id: 1,
            title: 'Todo One'
        },
        {
            id: 2,
            title: 'Todo Two'
        },
    ]
}

// helps to get the data
const getters = {
    allTodos: (state) => state.todos
}

// helps to perform the specific acions
const actions = {
    async fetchTodos({ commit }) { // we get multiple parameter while calling actions methods but we need only commit method to set the data
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        // setting the data by calling the method and passing data
        commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        })

        commit('newTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
        // get selected number
        const limit = parseInt(e.target.value)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);        
        commit('setTodos', response.data);
    },
    async updateTodo({ commit }, updTodo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);
        
        commit('updTodo', response.data)
    }
}

// helps to update the data
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id != id),
    updTodo: (state, updTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updTodo.id)
      if(index !== -1) { // means index exists
        state.todos.splice(index, 1, updTodo);
      }  
    }
}

export default {
    //state: state, // in this way also possible
    state, 
    getters,
    actions,
    mutations,
}