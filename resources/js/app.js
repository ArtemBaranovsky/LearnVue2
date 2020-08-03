import Vue from 'vue';
import axios from 'axios';
import Form from "./core/Form";

import Example from "./components/Example";

window.axios = axios;
window.Form = Form;

// Vue.prototype.$http = axios;
new Vue({
    el: '#root',
    components: {
        Example     // we can do <example></example> in a view
    },
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
