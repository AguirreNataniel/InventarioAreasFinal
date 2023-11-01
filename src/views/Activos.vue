<template>
    <div class="container">
        <h5>Activos</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="nuevo()" >
                    <h5>Nuevo Activo</h5>
                    <p>Nombre activo: <input type="text" v-model="payload.tipo_activo" required/></p>
                    <p>Precio: <input type="text" v-model="payload.marca" required/></p>
                    <p v-if="areas.length > 0">
                        <select v-model="payload.areaId">
                            <option :value="areas.id" v-for="area in areas">{{area.nombre_area}}</option>
                        </select>
                    </p>
                    <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
                </form>
            </div>
        </div>
    
        <div class="card">
                <div class="card-content">
                    <form @submit.prevent="getList()">
                        <h5>Buscar activo</h5>
                        <p>Nombre Activo: <input type="search" v-model="search" @search="getList()" /></p>
                        <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                    </form>
                </div>
            </div>
    
        <div class="card">
                <div class="card-content">
                    <h5>filtros</h5>
                    <div class="input-field ">
                        <select @change="filter('areaId',$event.target.value)">
                            <option :value="areas.id" v-for="area in areas">{{areas.nombre_area}}</option>
                        </select>
                        <label>Materialize Select</label>
                    </div>
        
                </div>
            </div>
    
        <div class="card">
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo de activo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="item in items">
                            <td>{{item.id}}</td>
                            <td>{{item.tipo_activo}}</td>
                            <td>{{item.marca}}</td>
                            <td>{{item.modelo}}</td>
                            <td>{{item.estado}}</td>
                            <td>{{item.areas.nombre_area}}</td>
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="eliminar(item.id)" >delete</i></a>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue "><i class="material-icons" @click="update(item.id)" >edit</i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    tipo_activo: 'ActivosView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            search: '',
            toFilter: '',
            areas: [],
            payload: {
                tipo_activo: null,
                marca: null,
                areasId: null
            }
        }
    },
    methods: {
        filter(tipo_activo, value) {
            this.toFilter = value === '' ? '' : '&' + tipo_activo + '=' + value;
            this.getList();
        },
        update(id) {
            this.$router.push('/activo/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/activos/' + id
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
                url: this.api + '/activos',
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
        getList(tipo_activo, value) {

            this.axios({
                method: 'get',
                url: this.api + '/activos?_expand=areasy&q=' + this.search + this.toFilter
            }).
            then((response) => {
                this.items = response.data;
            }).
            catch((error) => {
                console.log(error);
            })
        },
        getAreasList() {

            this.axios({
                method: 'get',
                url: this.api + '/activos'
            }).
            then((response) => {
                this.activos = response.data;
                const intervalo = setTimeout(() => {
                    this.intSelect(); 
                    clearTimeout(intervalo);
                }, 3000);
                
            }).
            catch((error) => {
                console.log(error);
            })
        },
        intSelect(){
            this.getList();
            this.getActivosList();
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        }
    },
    components: {

    },
    mounted() {
        this.getList();
        this.getActivoList();
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }
}
</script>
