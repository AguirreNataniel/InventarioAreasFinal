<template>
    <div class="container">
        <h5>Areas Editar</h5>
    
<div class="card">
    <div class="card-content">
        <form @submit.prevent="update()">
            <p>Nombre: <input type="text" v-model="payload.nombre_area" required/></p>
            <p>
            </p>
            <button type="submit" class="waves-effect waves-light btn-small">Editar</button>
        </form>
    </div>
</div>

</div>
</template>

<script>
export default {
name: 'AreaView',
data() {
const api = process.env.VUE_APP_API;
return {
    api,
    items: [],
    payload: {
        name: null,
    }
}
},
methods: {
getOne() {
    this.axios({
        method: 'get',
        url: this.api + '/areas/' + this.$route.params.id
    }).
    then((response) => {
        this.payload = response.data;
    }).
    catch((error) => {
        console.log(error);
    });
},
update() {
    if (confirm("Esta a punto de editar el área.")) {
        this.axios({
            method: 'patch',
            url: this.api + '/areas/' + this.$route.params.id,
            data: this.payload
        }).
        then((response) => {
            console.log(response);
        }).
        catch((error) => {
            console.log(error);
        });
    }
}
},
components: {

},
mounted() {
this.getOne();
}
}
</script>
