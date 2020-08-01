new Vue({
    el: '#root',
    mounted() {
        // make ajax request to our server  /skills
        // fetch()  $.ajax / $.getJson() / axios !!!
        axios.get('/skills').then(response => console.log(response))
    }
});
