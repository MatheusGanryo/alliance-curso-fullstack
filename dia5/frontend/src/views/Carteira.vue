<template>
  <div class="carteira">
    <h1>Pagina da Carteira</h1>
      <b-button v-b-modal.criaAtivo>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
      </b-button>
    <b-table striped hover :items="carteira" :fields="fields">
        
        <template slot="cell(actionEdit)" slot-scope="{ item }">
            <b-button v-on:click="beforeVenderAtivo(item)">
                <font-awesome-icon icon="pen" />
            </b-button>
        </template>
        <template slot="cell(actionEdit)" slot-scope="{ item }">
            <b-button v-on:click="beforeComprarAtivo(item)">
                <font-awesome-icon icon="pen" />
            </b-button>
        </template>
    </b-table>
    <b-modal id="criaNovoAtivo"
        title="Novo Ativo"
        ok-title="Salvar"
        cancel-title="Cancelar"
        @show="beforeNovoAtivo"
        @ok="saveNovoAtivo">
        <FormCarteira v-model="ativoAtual"/>
    </b-modal>
    <b-modal id="vendeAtivo"
        :title="'Vender o ativo - ' + ativoAtual.codigo"
        ok-title="Vender"
        cancel-title="Cancelar"
        @ok="venderAtivo">
        <FormAtivo v-model="ativoAtual"/>
    </b-modal>

    <b-modal id="compraAtivo"
          :title="'Comprar o ativo - ' + ativoAtual.codigo"
          ok-title="Comprar"
          cancel-title="Cancelar"
          @ok="comprarAtivo">
          <FormAtivo v-model="ativoAtual"/>
      </b-modal>
  </div>
</template>

<script>
import FormCarteira from '../components/FormCarteira';
import axios from 'axios';

export default {
    components: {FormCarteira},
    data: () => {
        return {
            ativoAtual: {
                codigo_ativo: '', 
                quantidade: '',
                preco_medio: '',
                isNew: true
            },
            carteira: [],
            fields: [
                {
                    key: 'ativo',
                    label: ''
                },{
                    key: 'preco_medio',
                    label: 'Preco Médio'
                },
                {
                    key: 'quantidade',
                    label: 'Quantidade'
                },
                {
                    key: 'codigo_ativo',
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
        excluirAtivo(codigo) {
            return codigo;
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
                await axios.put(`http://localhost:3000/carteira/${this.ativoAtual.codigo_ativo}`, payload);
                await this.carregaCarteira();
            } catch(err) {
                alert('Erro ao atualizar ativo!');
            }
        },
        async carregaCarteira() {
            this.carteira.splice(0, this.carteira.length);
            let dados = await axios.get('http://localhost:3000/carteira/');
            this.carteira.push(...dados.data);

        },
        beforeNovoAtivo() {
            this.ativoAtual.codigo = '';
            this.ativoAtual.carteira = 'Y';
            this.ativoAtual.isNew = true;
        },
        async saveNovoAtivo() {
            let payload = {
                codigo: this.ativoAtual.codigo,
                descricao: this.ativoAtual.descricao
            };

            try {
                await axios.post('http://localhost:3000/carteira/', payload);
                await this.carregaCarteira();
            } catch(err) {
                alert('Erro ao inserir o ativo!');
            }
        }
    },
    async mounted() {
        await this.carregaCarteira();
    }
}
</script>

