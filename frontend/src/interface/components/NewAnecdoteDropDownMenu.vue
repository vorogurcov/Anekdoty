<template>
  <div class="relative inline-block text-left w-72">
    <AppButton @click="openClose" class="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md w-full">
      {{ menuTitle }}
    </AppButton>
    <div
        v-if="isOpen"
        class="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
        v-on="anecdote === null? { scroll: handleScroll } : {}"
    >
      <AppFormInput
        v-if="isOpen"
        placeholder="Search..."
        v-model="anecdoteText"
        @keyup.enter="handleAnecdoteSearch"
      >
      </AppFormInput>
      <div v-if="menuElementsLocal.length">
        <AppButton
            v-for="(element, index) in menuElementsLocal"
            :key="index"
            @click="selectElement(element)"
            class="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
        >
          {{ element.text }}
        </AppButton>
      </div>
      <div v-if="isLoading" class="p-2 text-center text-gray-500">Loading...</div>
      <div v-if="!hasMore" class="p-2 text-center text-gray-500">No more anecdotes</div>
      <div v-if="anecdoteNotFound" class="p-2 text-center text-gray-500">Anecdote not found!</div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/interface/components/AppButton.vue";
import AppFormInput from "@/interface/components/AppFormInput.vue";

export default {
  name: "NewAnecdoteDropDownMenu",
  components: {AppFormInput, AppButton },
  data() {
    return {
      isOpen: false,
      isLoading: false,
      page: 1,
      anecdote:null,
      anecdoteNotFound:false,
      menuElementsLocal: [],
      menuElements:[],
      hasMore: true,
      anecdoteText:''
    };
  },
  methods: {
    openClose() {
      this.isOpen = !this.isOpen;
      this.anecdoteText = '';
      if (this.anecdote !== null){
        this.anecdote = null
        this.menuElementsLocal = this.menuElements;
        this.menuElements = [];
      }
      if(this.menuElements.length !== 0){
        this.menuElementsLocal = this.menuElements
        this.menuElements = [];
      }
      if (this.isOpen && this.menuElementsLocal.length === 0) {
        this.loadMore();
      }
    },
    selectElement(element) {
      this.$emit("select", element);
      this.isOpen = false;
    },
    async loadMore() {
      if (this.isLoading || !this.hasMore) return;
      this.isLoading = true;

      try {
        const { anecdotes, total } = await this.fetchElements(this.page);
        if (anecdotes.length > 0) {
          this.menuElementsLocal.push(...anecdotes);
          this.page++;
          this.hasMore = this.menuElementsLocal.length < total;
        } else {
          this.hasMore = false;
        }
      } catch (error) {
        console.error("Failed to load more elements:", error);
      }

      this.isLoading = false;
    },
    async handleScroll(event) {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      console.log(scrollTop, clientHeight, scrollHeight);
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        await this.loadMore();
      }
    },
    async handleAnecdoteSearch(){
      try{
        const url = `http://localhost:3000/searchAnecdote?anecdote_text=${this.anecdoteText}`
        const data = await fetch(url,{
          method:'POST',
        }).then(response => response.json())
        const total = data.data.total

        console.log(data)
        if(total === 0){
          this.anecdoteNotFound = true;
          this.anecdote = null;
          this.menuElements = this.menuElementsLocal;
          this.menuElementsLocal = [];
          return
        }

        this.anecdoteNotFound = false;
        this.anecdote = [data.data.anecdots]
        console.log(this.anecdote)
        this.menuElements = this.menuElementsLocal;
        this.menuElementsLocal = this.anecdote;

      }catch(error){
        console.log(error.message)
      }
      //this.isOpen = !this.isOpen
      //this.anecdoteText = ""
    }
  },
  props: {
    menuTitle: {
      type: String,
      default: "Menu",
    },
    fetchElements: {
      type: Function,
      required: true,
    },
  },
};
</script>
