class Errors {
    constructor(){
        this.errors = {}
    }

    /**
     * Retrieve the error message for a field.
     *
     * @param {string} field
     */
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
    record(errors) {
        this.errors = errors;
    }

    clear(field) {
        delete this.errors[field]/*[0]*/;
    }

    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }
}

// Vue.prototype.$http = axios;
new Vue({
    el: '#root',
    data: {
        name: '',
        description: '',
        errors: new Errors()
    },
    mounted() {
        // this.$http.get('/skills').then(response => this.skills = response.data);
    },
    methods: {
        onSubmit() {
            // alert('submitting');
            // axios.post('projects', {
            //    name: this.name,
            //     description: this.description,
            // });
            axios.post('/projects', this.$data)
                // .then(response => alert('Success'))
                .then(this.onSucsess)
                .catch(error =>
                    // { console.log(error.response.data.errors) }
                    // this.errors = error.response.data
                    this.errors.record(error.response.data.errors)
                );
        },
        onSucsess(response) {
            alert(response.data.message);
            this.name = '';
            this.description = '';
            // form.reset();
        }
    }
});
