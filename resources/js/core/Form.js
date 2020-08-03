import Errors from "./Errors";

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

export default Form;
