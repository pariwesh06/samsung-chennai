<script>
function foo() {
  console.log("fooo");
}
const axios = require('axios');
const baseUrl = 'https://itunes.apple.com/search?term=kishor';

export default {
  name: "userform",
  data() {
    return {
      user: { name: "Ram", age: 0 },
      users: []
    };
  },
  methods: {
    deleteUser(selectedIndex) {
      console.log(event);
      this.users.splice(selectedIndex, 1);
    },
    search(event) {
      const promise = axios.get(baseUrl);
      console.log(promise);
      // this.users.push(Object.assign({}, this.user));
    }
  }
};
</script>

<template>
    <div>
     <div>this is a component</div>
        <input v-model="user.name"/>
        <input v-model="user.age"/>
        <button  v-on:click='search'>search</button>
        <ol>
          <li v-for="(user, index) in users">{{user.name}}, {{user.age}}
            <button v-on:click='deleteUser( index)'>X</button>
          </li>
        </ol>
    </div>
</template>


