const URL = "https://viacep.com.br/ws/[CEP_VALOR]/json/"
const cepCampo = document.getElementById('cep-ipt')
const ruaCampo = document.getElementById('logradouro-ipt')
const bairroCampo = document.getElementById('bairro-ipt')
const cidadeCampo = document.getElementById('cidade-ipt') 

cepCampo.addEventListener('focusout', consultarCep)

async function consultarCep() {
    try {
        if (cepCampo.value.length != 8) {
            throw new Error('O campo de CEP tem que ter 8 dígitos.')
        }
        const urlReal = URL.replace("[CEP_VALOR]", cepCampo.value)
        const resp = await fetch(urlReal)
        const obj = await resp.json()
        console.log(obj)
        if (obj.erro === "true") {
            throw new Error('CEP inexistente!')
        }
        atribuirValores(obj)
    }
    catch (error) {
        alert(error.message)
    }
}

function atribuirValores(obj) {
    ruaCampo.value = obj.logradouro
    bairroCampo.value = obj.bairro
    cidadeCampo.value = obj.localidade
}