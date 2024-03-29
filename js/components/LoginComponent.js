export default {
    template: `
        <div class="container">
            <div class="jumbotron roku-jumbotron">
                <h1 class="display-4">Welcome to Flashback!</h1>
                <p class="lead">Before revisiting your favourite movies, tv shows or music from yesteryear, please log in with a valid username and password.</p>
                <hr class="my-4">

                <form @submit.prevent="login">
                    <div class="form-row align-items-center">
                        <div class="col-md-3 my-1">
                            <label class="sr-only" for="inlineFormInputName">Name</label>
                            <input v-model="input.username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>
                        </div>

                        <div class="col-md-3 my-1">
                            <label class="sr-only" for="inlineFormPassword">Name</label>
                            <input v-model="input.password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
                        </div>

                        <div class="col-auto my-1">
                            <button type="submit" class="btn btn-primary">Go!</button>
                        </div>
                    </div>
                </form>            
            </div>
        </div>
     `,

    data() {
        return {
            input: {
                username: "",
                password: ""
            },

        }
    },

    methods: {
        login() {
            //console.log(this.$parent.mockAccount.username);
            //debugger;
            if (this.input.username != "" && this.input.password != "") {
                // Use the FormData objdct to collect and send out params
                let formData = new FormData();

                formData.append("username", this.input.username);
                formData.append("password", this.input.password);

                // hit this URL, pass the top parameters through
                let url = "./includes/index.php?user=true";

                fetch(url, {
                    method: "POST",
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    // Tell the app that we have a successful login and store the user object that we retrieved

                    // True below means that authentication worked
                    // Data is the user we retrieved from the database
                    this.$emit("authenticated", true, data[0]);

                    // Push the user to the users page
                    // This is like a redirect
                    this.$router.replace({name: "users"});
                    
                })
                .catch((err) => console.log(err));


            } else {
                console.error("Inputs can't be blank!");
            }
        }
    }
}