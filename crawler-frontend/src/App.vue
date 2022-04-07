<template>
  <header>
    <h2>Crawler</h2>
  </header>
  <main>
    <form @submit.prevent="handleSubmit">
      <label>Url:</label>
      <input name="url" v-model="url" />
      <button type="submit">Get Links</button>
    </form>
    <ul v-if="!loading && data && data.length">
      <li :key="url" v-for="url of data">
        <a :href="url" target="_blank">{{ url }}</a>
      </li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </main>
</template>

<script setup>
import { ref } from "vue";

const url = ref("");
const data = ref([]);
const loading = ref(false);
const error = ref("");

function isUrlValid(userInput) {
  var res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
}

async function handleSubmit() {
  data.value = [];
  error.value = "";
  loading.value = true;
  try {
    if (!isUrlValid(url.value)) {
      throw "Invalid Url";
    }
    const res = await fetch(`http://localhost:3001/crawl?url=${url.value}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw res.statusText;
    }
    const json = await res.json();
    data.value = json.data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.error {
  color: red;
}
ul {
  padding-left: 18px;
}
label {
  margin-right: 4px;
}
input {
  margin-right: 4px;
  width: 360px;
}
</style>
