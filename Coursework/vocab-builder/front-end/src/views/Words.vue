
<template> 
    <div>
        <h1>Words</h1>
        <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search..." 
            @input="filterWords"
        />
        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th>
                        <a href="#" @click.prevent="sortBy('english')">English</a>
                    </th>
                    <th>
                        <a href="#" @click.prevent="sortBy('german')">German</a>
                    </th>
                    <th>
                        <a href="#" @click.prevent="sortBy('french')">French</a>
                    </th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-for="(word, i) in filteredWords" :key="i" >
                <td>{{ word.english }}</td>
                <td>{{ word. german }}</td>
                <td>{{ word. french }}</td>
                <td width="75" class="center aligned">
                <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link></td>
                <td width="75" class="center aligned">
                <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link></td>
                <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)"> 
                <a :href="`/words/${word._id}`">Delete</a></td>
            </tr>
        </table>
    </div>
</template>


<script>
import { api } from '../helpers/helpers';
export default {
    name: 'words',
    data() {
        return {
        words: [],
        searchQuery: '',
        sortKey: '',
        sortAsc: true,
        };
        },
        
        computed: {
        filteredWords() {
            if (!this.searchQuery) {
                return this.words;
            }
            const query = this.searchQuery.toLowerCase();

           
            const result = this.words.filter(word => 
                word.english.toLowerCase().includes(query) ||
                word.german.toLowerCase().includes(query) ||
                word.french.toLowerCase().includes(query)
            );
            return result.splice(0,2)
        }
    },
methods: {
async onDestroy(id) {
    const sure = window.confirm('Are you sure?');
    if (!sure) return;
    await api.deleteWord(id);
    this.flash('Word deleted sucessfully!', 'success');
    const newWords = this.words.filter(word => word._id !== id); this.words = newWords;
},

sortBy(key) {
            if (this.sortKey === key) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortKey = key;
                this.sortAsc = true;
            }
            this.words.sort((a, b) => { 
                const aValue = a[key].toLowerCase(); 
                const bValue = b[key].toLowerCase();  
    
                 if (aValue < bValue) return this.sortAsc ? -1 : 1;
                 if (aValue > bValue) return this.sortAsc ? 1 : -1;
                return 0;
});}
        },
async mounted() {
        this.words = await api.getWords();
}

}
</script>