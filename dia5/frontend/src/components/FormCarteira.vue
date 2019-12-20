<template>
    <b-form>
        <b-form-group
            id="input-codigo"
            label="Código"
            label-for="txtCodigo"
            description="Informe o código único do Ativo!"
            :disabled="!content.isNew"
        >
            <b-form-input
                id="txtCodigo"
                v-model="content.codigo_ativo"
                type="text"
                required
                placeholder="Código do ativo"
                @input="handleInput"
                :disabled="!content.isNew"/>
        </b-form-group>
        <b-form-group
            id="input-descricao"
            label="Descricao"
            label-for="chkDescricao"
            description="Descreva o Ativo!"
        >
        <b-form-input
                id="txtDescricao"
                v-model="content.descricao"
                type="text"
                required
                placeholder="Descricao do ativo"
                @input="handleInput"/>
        </b-form-group>
    </b-form>
</template>

<script>
export default {
    props: ['value'],
    data () {
        return {
            content: {
                codigo_ativo: this.value.codigo_ativo,
                descricao: this.value.descricao,
                isNew: this.value.isNew
            }

        }
    },
    methods: {
        handleInput () {
            let retorno = {
                codigo_ativo: this.content.codigo_ativo,
                descricao: this.content.descricao,
                isNew: this.content.isNew
            };
            this.$emit('input', retorno);
        }
    }
}
</script>