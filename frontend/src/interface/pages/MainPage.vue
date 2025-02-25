<template>
  <div>
    <DropDownMenu
        :menuTitle="selectedSort ? selectedSort : 'Select a sort criteria'"
        :menuElements="sortCriterias"
        @select="handleSortSelect"
    />
    <DropDownMenu
        :menuTitle="selectedOrder ? selectedOrder: 'Select sort order'"
        :menuElements="sortOrders"
        @select="handleSortOrderSelect"
    />
    <DropDownMenu
        menuTitle="Add new anecdote"
        :menuElements="anecdotes"
        @select="handleAddNewAnecdote"
        class="w-72"
    />
    <AnecdoteContainer
        v-for="anecdote in anecdotes"
        :key="anecdote.id"
        :anecdoteText="anecdote.text"
        :rating="anecdote.rating"
        :rubricName="anecdote.rubricName"
    />

    <div class="flex items-center justify-between mt-6">
      <p class="text-xl text-gray-800 font-medium">Page: {{ pageNumber }}</p>
      <div>
        <AppButton
            @click="handleButtonClick(-1)"
            :disabled="pageNumber === 1"
            class="mr-2"
            :class="{'bg-gray-400 text-gray-600 cursor-not-allowed': pageNumber === 1}">
          Previous page
        </AppButton>
        <AppButton
            @click="handleButtonClick(1)"
            :disabled="pageNumber >= ((this.total - this.total % 5) / 5 + 1)"
            :class="{'bg-gray-400 text-gray-600 cursor-not-allowed': pageNumber >= ((this.total - this.total % 5) / 5 + 1)}">
          Next page
        </AppButton>
      </div>
    </div>
  </div>
</template>



<script>
import AnecdoteContainer from "@/interface/components/AnecdoteContainer.vue";
//import { getRubrics } from "@/services/anecdoteService";
import {  searchUserAnecdotes } from "@/services/anecdoteService";
import AppButton from "@/interface/components/AppButton.vue";
import DropDownMenu from "@/interface/components/DropDownMenu.vue";

export default {
  name: "MainPage",
  components: {
    DropDownMenu,
    AppButton,
    AnecdoteContainer,
  },
  data() {
    return {
      anecdotes: [],
      rubrics: [],
      sortCriterias:['rating','text','rubricName'],
      sortOrders:['ASC','DESC'],
      selectedRubric: null,
      selectedSort:null,
      selectedOrder:null,
      pageNumber: 1,
      total:0,
      newAnecdote:null,
    };
  },
  methods: {
    async handleAnecdotes() {
      try {
        const response = await searchUserAnecdotes({
          page: this.pageNumber,
          sort: this.selectedSort || "rating",
          order: this.selectedOrder || "DESC",
          // rubric: this.selectedRubric ? this.selectedRubric.id : null,
        });

        this.anecdotes = response.data.anecdots;
        this.total = response.data.total;
      } catch (error) {
        console.error("Failed to fetch anecdotes:", error);
      }
    },
    async handleButtonClick(delta) {
      const newPage = this.pageNumber + delta;
      if (newPage < 1) return;
      this.pageNumber = newPage;
      await this.handleAnecdotes();
    },
    // async handleRubrics() {
    //   try {
    //     this.rubrics = (await getRubrics()).map((rubric) => rubric.name);
    //   } catch (error) {
    //     console.error("Failed to fetch rubrics:", error);
    //   }
    // },
    // async handleRubricSelect(rubric) {
    //   this.selectedRubric = rubric;
    //   console.log(this.selectedRubric)
    //   //await this.handleAnecdotes();
    // },
    async handleSortSelect(sort) {
      this.selectedSort = sort;
      console.log(this.selectedSort)
      await this.handleAnecdotes();
    },
    async handleSortOrderSelect(order) {
      this.selectedOrder = order;
      console.log(this.selectedOrder)
      await this.handleAnecdotes();
    },
    async addNewAnecdote(anecdote) {
      try {
        const anecdoteId = anecdote.id;
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error('Access token is missing');
        }

        const url = `http://localhost:3000/user/save/?anecdot_id=${anecdoteId}`;

        const formData = new URLSearchParams();
        formData.append('accessToken', accessToken);

        console.log(url)
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

      } catch (error) {
        console.log(error.message);
      }
    },
    async handleAddNewAnecdote(anecdote) {
      this.newAnecdote = anecdote;
      await this.addNewAnecdote(this.newAnecdote)
      await this.handleAnecdotes();
    }
  },
  async mounted() {
    //await this.handleRubrics();
    await this.handleAnecdotes();
  },
};
</script>
