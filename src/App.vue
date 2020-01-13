<template>
  <div id="app">
    <header class="header">
      <h1 class="heading1">Books that I have lent to friends</h1>
    </header>
    <HelloWorld ref="picker" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  data() {
    return {
      intr: 0,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  background: #cccccc2b;
}
* {box-sizing: border-box;}
.container {
  max-width: 840px;
  padding: 0 20px;
  margin: 0 auto;
}
.heading1 {
  color: #ffffff;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 140px 0 80px;
}
.header {
  position: fixed;
  z-index: 1;
  width: 100%;
  padding: 35px 20px 30px;
  top: 0;
  background: #4a1880;
}

</style>
