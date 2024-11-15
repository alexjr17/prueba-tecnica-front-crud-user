
<template>
  <div class="container flex-1">
    <!-- <header>

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
    <router-view/>
  </div>
</template>

<style>
/* Agregar estilos globales para el diseño del formulario */

#app {
  font-family: 'Arial', sans-serif;
  background-color: #e9e9e92a;
  /* height: 100vh; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}



h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.link {
  display: block;
  text-align: center;
  margin-top: 10px;
}

.link a {
  color: #007bff;
  text-decoration: none;
}

.link a:hover {
  text-decoration: underline;
}
</style>
