<template>
  <div class="search-bar">
    <span>
      <search-icon />
    </span>
    <form @submit.prevent="$emit('search-for-photos', query)">
      <input
        type="text"
        class="search-bar__input"
        placeholder="Search for photo"
        v-model="query"
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
      query: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  background-color: var(--white);
  border-radius: 5px;
  width: 100%;
  height: 3.5rem;
  align-items: center;
  padding: 0 1rem;
}
form {
  margin-left: 1rem;
  width: 100%;
  border: none;
  background-color: var(--white);
}
.search-bar__input {
  width: 100%;
  height: 100%;
  border: none;
  background-color: var(--white);
  color: #111;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #8b929c;
    font-weight: bold;
  }
}
</style>
