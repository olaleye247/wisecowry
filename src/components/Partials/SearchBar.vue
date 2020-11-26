<template>
  <div class="search-bar">
    <span>
      <search-icon />
    </span>
    <form>
      <input
        type="text"
        class="search-bar__input"
        placeholder="Search for photo"
        v-model="searchValue"
      />
    </form>
  </div>
</template>

<script>
import SearchIcon from "./SearchIconSvg";
export default {
  components: {
    SearchIcon,
  },
  data() {
    return {
      searchValue: "",
    };
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  background-color: #ffffff;
  border-radius: 5px;
  width: 70%;
  height: 3.5rem;
  align-items: center;
  padding: 0 1rem;
}
form {
  margin-left: 1rem;
  width: 100%;
  border: none;
  background-color: #ffffff;
}
.search-bar__input {
  width: 100%;
  height: 100%;
  border: none;
  background-color: #ffffff;
  color: #111;
}
.search-bar__input:focus {
  outline: none;
}
.search-bar__input::placeholder {
  color: #8b929c;
  font-weight: bold;
}
</style>
