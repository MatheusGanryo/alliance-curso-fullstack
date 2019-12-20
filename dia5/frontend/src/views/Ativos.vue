<template>
  <div class="ativos">
    <h1>Ativos</h1>
    <hr />
    <b-button v-b-modal.criaAtivo>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
    </b-button>
    <b-table striped hover :items="ativos" :fields="fields">
        
        <template slot="cell(actionDelete)" slot-scope="{ item: { codigo }}">
            <b-button v-on:click="deletaAtivo(codigo)">
                <font-awesome-icon icon="trash" />
            </b-button>
        </template>
        <template slot="cell(actionEdit)" slot-scope="{ item }">
            <b-button v-on:click="beforeEditaAtivo(item)">
                <font-awesome-icon icon="pen" />
            </b-button>
        </template>
    </b-table>
    <b-modal id="criaAtivo"
        title="Novo Ativo"
        ok-title="Salvar"
        cancel-title="Cancelar"
        @show="beforeNovoAtivo"
        @ok="saveNovoAtivo">
        <FormAtivo v-model="ativoAtual"/>
    </b-modal>
    <b-modal id="editaAtivo"
        :title="'Alterar o Ativo - ' + ativoAtual.codigo"
        ok-title="Alterar"
        cancel-title="Cancelar"
        @ok="editarAtivo">
        <FormAtivo v-model="ativoAtual"/>
    </b-modal>
    <b-modal id="deletaAtivo"
        title="Deletar Ativo"
        ok-title="Confirmar"
        cancel-title="Cancelar"
        @show="deletaAtivo"
        @ok="deletaAtivo">
        <FormAtivo v-model="ativoAtual"/>
    </b-modal>

  </div>
</template>

<script>
import FormAtivo from '../components/FormAtivo';
import axios from 'axios';

export default {
    components: {FormAtivo},
    data: () => {
        return {
            ativoAtual: {
                codigo: '', 
                descricao: '',
                isNew: true
            },
            ativos: [],
            fields: [
                {
                    key: 'ativo',
                    label: ''
                },
                {
                    key: 'descricao',
                    label: 'Descricao'
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
        async deletaAtivo() {

            try {
                await axios.delete(`http://localhost:3000/ativos/${this.ativoAtual.codigo}`);
                await this.deletaAtivo();
            } catch(err) {
                alert('Erro ao deletar ativo!');
            }
            
        },
        beforeEditaAtivo(ativo) {
            this.ativoAtual = {
                codigo: ativo.codigo,
                descricao: ativo.descricao,
                isNew: false
            }
            this.$root.$emit('bv::show::modal', 'editaAtivo');
        },

        async editarAtivo() {
           let payload = {
                descricao: this.ativoAtual.descricao
            };

            try {
                await axios.put(`http://localhost:3000/ativos/${this.ativoAtual.codigo}`, payload);
                await this.carregaAtivos();
            } catch(err) {
                alert('Erro ao atualizar ativo!');
            }
        },
        async carregaAtivos() {
            this.ativos.splice(0, this.ativos.length);
            let dados = await axios.get('http://localhost:3000/ativos/');
            this.ativos.push(...dados.data);
        },
        beforeNovoAtivo() {
            this.ativoAtual.codigo = '';
            this.ativoAtual.ativo = 'Y';
            this.ativoAtual.isNew = true;
        },
        beforeDeletaAtivo() {
            this.ativoAtual.codigo = '';

        },
        async saveNovoAtivo() {
            let payload = {
                codigo: this.ativoAtual.codigo,
                descricao: this.ativoAtual.descricao
            };

            try {
                await axios.post('http://localhost:3000/ativos/', payload);
                await this.carregaAtivos();
            } catch(err) {
                alert('Erro ao inserir o ativo!');
            }
        }
    },
    async mounted() {
        await this.carregaAtivos();
    }
}
</script>