<template>
  <div class="bicicletas">
    <h1>Biciletas</h1>
    <br> <br>
    <b-button v-b-modal.criaBicicleta>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
    </b-button>
    <b-table striped hover :items="bicicletas" :fields="fields">
        <template slot="cell(ativo)" slot-scope="{ item: { ativo }}">
            <font-awesome-icon
                :icon="ativo === 'Y' ? 'check' : 'times'"
            />
        </template>
        <template slot="cell(actionDelete)" slot-scope="{ item }">
            <b-button @click="beforeExcluirBicicleta(item)">
                <font-awesome-icon icon="trash" />
            </b-button>
        </template>
        <template slot="cell(actionEdit)" slot-scope="{ item }">
            <b-button v-on:click="beforeEditaBicicleta(item)">
                <font-awesome-icon icon="pen" />
            </b-button>
        </template>
    </b-table>
    <b-modal id="criaBicicleta"
        title="Nova bicicleta"
        ok-title="Salvar"
        cancel-title="Cancelar"
        @show="beforeNovaBicicleta"
        @ok="saveNovaBicicleta">
        <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>
    <b-modal id="editaBicicleta"
        :title="'Alterar a bicileta - ' + bicicletaAtual.codigo"
        ok-title="Alterar"
        cancel-title="Cancelar"
        @ok="editarBicicleta">
        <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>
    <b-modal id="excluirBicicleta"
        :title="'Deletar a bicicleta - ' + bicicletaAtual.codigo"
        ok-title="Deletar"
        cancel-title="Cancelar"
        @ok="excluirBicicleta">
        <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>

  </div>
</template>

<script>
import FormBicicleta from '../components/FormBicicleta';
import axios from 'axios';

export default {
    components: {FormBicicleta},
    data: () => {
        return {
            bicicletaAtual: {
                codigo: '',
                ativo: '',
                isNew: true
            },
            bicicletas: [],
            fields: [
                {
                    key: 'ativo',
                    label: ''
                },
                {
                    key: 'codigo',
                    label: 'Código'
                },
                {
                    key: 'actionDelete',
                    label: ''
                },
                {
                    key: 'actionEdit',
                    label: ''
                }
            ]
        }
    },
    methods: {
        async excluirBicicleta() {
            let payload = {
                ativo: this.bicicletaAtual.ativo
            };

            try {
                await axios.delete(`http://localhost:3000/bicicletas/${this.bicicletaAtual.codigo}`, payload);
                await this.carregaBicicletas();
            } catch(err) {
                alert('erro ao deletar a bicicleta');
            }
        },
        beforeEditaBicicleta(bicicleta) {
            this.bicicletaAtual = {
                codigo: bicicleta.codigo,
                ativo: bicicleta.ativo,
                isNew: false
            }
            this.$root.$emit('bv::show::modal', 'editaBicicleta');
        },
        beforeExcluirBicicleta(bicicleta) {
            this.bicicletaAtual = {
                codigo: bicicleta.codigo,
                ativo: bicicleta.ativo,
                isNew: false
            }
            this.$root.$emit('bv::show::modal', 'editaBicicleta');
        },
        


        async editarBicicleta() {
           let payload = {
                ativo: this.bicicletaAtual.ativo
            };

            try {
                await axios.put(`http://localhost:3000/bicicletas/${this.bicicletaAtual.codigo}`, payload);
                await this.carregaBicicletas();
            } catch(err) {
                alert('erro ao atualizar a bicicleta');
            }
        },
        async carregaBicicletas() {
            this.bicicletas.splice(0, this.bicicletas.length);
            let dados = await axios.get('http://localhost:3000/bicicletas/');
            this.bicicletas.push(...dados.data);
        },
        beforeNovaBicicleta() {
            this.bicicletaAtual.codigo = '';
            this.bicicletaAtual.ativo = 'Y';
            this.bicicletaAtual.isNew = true;
        },
        async saveNovaBicicleta() {
            let payload = {
                codigo: this.bicicletaAtual.codigo,
                ativo: this.bicicletaAtual.ativo
            };

            try {
                await axios.post('http://localhost:3000/bicicletas/', payload);
                await this.carregaBicicletas();
            } catch(err) {
                alert('erro ao inserir a bicicleta');
            }
        }
    },
    async mounted() {
        await this.carregaBicicletas();
    }
}
</script>