<template>
    <div class="container">
        <h5>Areas</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="nuevo()">
                    <h5>Nueva áera</h5>
                    <p>Nombre área: <input type="text" v-model="payload.nombre_area" required/></p>
                    <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
                </form>
            </div>
        </div>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="getList()">
                    <h5>Buscar área</h5>
                    <p>Nombre área: <input type="search" v-model="search" @search="getList()" /></p>
                    <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                </form>
            </div>
        </div>
    

        </div>
    
        <div class="card">
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre área</th>
                            <th>Nombre encargado</th>
                            <th>Nro Funcionarios</th>
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="item in items">
                            <td>{{item.id}}</td>
                            <td>{{item.nombre_area}}</td>
                            <td>{{item.nombre_encargado}}</td>
                            <td>{{item.numero_funcionarios}}</td>
                            
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="eliminar(item.id)" >delete</i></a>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue "><i class="material-icons" @click="update(item.id)" >edit</i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            search: '',
            toFilter: '',
            payload: {
                nombre_area: null,
            }
        }
    },
    methods: {
        filter(nombre_area, value) {
            this.toFilter = value === '' ? '' : '&' + nombre_area + '=' + value;
            this.getList();
        },
        update(id) {
            this.$router.push('/areas/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/areas/' + id
                }).
                then((response) => {
                    this.getList();
                }).
                catch((error) => {
                    console.log(error);
                });
            }
        },
        nuevo() {
            this.axios({
                method: 'post',
                url: this.api + '/areas',
                data: this.payload
            }).
            then((response) => {
                this.getList();
                console.log(response);
            }).
            catch((error) => {
                console.log(error);
            });
        },
        getList(nombre_area, value) {

            this.axios({
                method: 'get',
                url: this.api + '/areas?q=' + this.search + this.toFilter
            }).
            then((response) => {
                this.items = response.data;
            }).
            catch((error) => {
                console.log(error);
            })
        }
    },
    components: {

    },
    mounted() {
        this.getList();
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }
}
</script>
