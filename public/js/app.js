Vue.prototype.$http = axios;
new Vue({
    el: '#root',
    data: {
        skills: []
    },
    mounted() {
        // make ajax request to our server  /skills
        // fetch()  $.ajax / $.getJson() / axios !!!
        // axios.get('/skills').then(response => console.log(response.data));
        // axios.get('/skills').then(response => this.skills = response.data);
        this.$http.get('/skills').then(response => this.skills = response.data);

        // Vue Resource
        // this.$http.post('/skills', {})
    }
});
