<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>
    <div class="todos">
      <div
        @dblclick="onDblClick(todo)"
        v-for="todo in allTodos"
        :key="todo.id"
        class="todo"
        :class="{'is-complete':todo.completed}"
      >
        {{ todo.title }}
        <span class="delete" @click="deleteTodo(todo.id)">Delete</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "Todos",
    methods: {
      ...mapActions(['fetchTodos', "deleteTodo", "updateTodo"]), // ... helps to spread the method if we have to use more methods
      onDblClick(todo) {
        const updTodo =  {
          id: todo.id,
          title: todo.title,
          completed: !todo.completed
        }
        this.updateTodo(updTodo);
      },
    }, 
    computed: mapGetters(['allTodos']),
    created() {
      this.fetchTodos();
    }
}
</script>

<style scoped>
  .todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
  
  .todo {
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
  }

  .delete {
    position: absolute;
    bottom: 0px;
    right: 1px;
    padding: 3px;
    border-radius: 3px;
    background: crimson;
    color: #fff;
    cursor: pointer;
  }

  .legend {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }

  .complete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #35495e;
  }

  .incomplete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #41b883;
  }

  .is-complete {
    background: #35495e;
    color: #fff;
  }

  @media (max-width: 500px) {
    .todos {
      grid-template-columns: 1fr;
    }
  }
</style>