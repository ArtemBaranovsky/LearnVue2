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
        if (field) {
            delete this.errors[field]/*[0]*/;
            return ;
        }
        this.errors = {};
    }

    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }
}

class Form
{
    constructor(data) {
        // this.data = data
        this.orignalData = data
        // better this.data.name or form.name
        for (let field in data) {
            this[field] = data.field;
        }
        this.errors = new Errors();
    }

    data() {
        let data = {};
        for (let property in this.originalData) {
            data[property]
        };
        // let data = Object.assign({}, this); // clones the object
        // delete data.originalData;
        // delete data.errors;
        return data;
    }

    reset() {
        for (let field in this.orignalData) {
            this[field] = '';
        }
        this.errors.clear();
    }

    post(url) {
        this.submit('post', url);
    }

    delete(url) {
        this.submit('delete', url);
    }

    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            // axios
            // axios[requestType](url, this.$data)
            axios[requestType](url, this.data())
                // .then(this.onSucsess)
                // .then(this.onSuccess.bind(this)) // this keyword is rebinded to current instance
                .then(response => {
                    this.onSuccess(response.data);

                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data)
                    reject(error.response.data);
                })
                // .catch(this.onFail.bind(this))
            // .catch(error => this.form.errors.record(error.response.data.errors)); // moved to onFail

        });
    }

    // onSuccess(response) {
    onSuccess(data) {
        // TEMPORARY
        // alert(response.data.message);
        alert(data.message);
        // this.errors.clear(); // moved to reset()
        this.reset();
    }

    // onFail(error) {
    onFail(errors) {
        // this.errors.record(error.response.data.errors);
        this.errors.record(errors);
    }
}

// Vue.prototype.$http = axios;
new Vue({
    el: '#root',
    data: {
        form: new Form({
            name: '',
            description: '',
        }),
        // errors: new Errors()
    },
    methods: {
        onSubmit() {
            // axios.post('/projects', this.$data)
            //     .then(this.onSucsess)
            //     .catch(error => this.form.errors.record(error.response.data.errors));
            this.form.submit('post', '/projects')
                .then(data => console.log(data))
                .catch(errors => console.log(errors));
        },
        onSuccess(response) {
            alert(response.data.message);
            form.reset();
        }
    }
});
