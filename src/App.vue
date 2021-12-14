<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  padding: 24px;
  box-sizing: border-box;
  height: 100%;
  color: #2c3e50;
  background-color: #fafafa;
  font-family: sans-serif;
}

html,
body {
  margin-bottom: 2px;
  margin: 0 auto;
}

* {
  box-sizing: border-box;
}

.button {
  display: inline-block;
  color: white;
  font-size: 1em;
  text-decoration: none;
  padding: 0.5em 2em;
  outline: none;
  border-width: 2px 0;
  border-style: solid none;
  border-color: #fdbe33 #000 #d77206;
  border-radius: 6px;
  background: linear-gradient(#f3ae0f, #e38916) #e38916;
  transition: 0.2s;
  cursor: pointer;
}

.button:hover {
  background: linear-gradient(#f5ae00, #f59500) #f5ae00;
}

.button:active {
  background: linear-gradient(#f59500, #f5ae00) #f59500;
}
</style>
