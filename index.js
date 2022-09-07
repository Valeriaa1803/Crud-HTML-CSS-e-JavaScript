var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("DESEJA REALMENTE EXCLUIR ESSE REGISTRO?")

    if (_confirm) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1)

            }
        }

        PopulaTabela()
    }
}

function EditaRegistro(id) {
    $("modalRegistro").modal("show")

    dados.forEach(function (item) {
        if (item.ID == id) {
            $("#hdID").val(item.ID)
            $("#txtNome").val(item.Nome)
            $("txtSobrenome").val(item.Sobrenome)
            $("txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
            $("txtFormacao").val(item.Formacao)
        }

    })

}

function PopulaTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")

        dados.forEach(function (item) {

            // TAMPLATE STRING
            $("tblDados tbody").append(`<tr>
            
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.DtNascimento}</td>
                <td>${item.Formacao}</td>
                <td><button type="button" class="btn btn-primary" onclick = "javascript:ApagaRegistro(${item.ID});"><i class= "fa fa-edit" /></button></td>
                <td><button type="button" class="btn btn-danger" onclick = "javascript:ApagaRegistro(${item.ID});"><i class= "fa fa-trash" /></button></td>
                
            </tr>`)

        })


    }
}

$(function () {
    //EXECUTA AO CARREGAR A TELA
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        PopulaTabela()
    }

    $("#btnSalvar").click(function () {
        //EVENTO CLICK DO BOTÃO SALVAR

        let _id = $("#hdID").val()
        let Nome = $("#txtNome").val()
        let Sobrenome = $("#txtSobrenome").val()
        let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
        let Formacao = $("#txtFormacao").val()


        if (_id || _id == "0") {
            let registro = {}
            registro.Nome = Nome
            registro.Sobrenome = Sobrenome
            registro.DtNascimento = DtNascimento
            registro.Formacao = Formacao

            registro.ID = dados.length + 1
            dados.push(registro)
        }
        else {
            dados.forEach(function (item) {
                if (item.ID == _id) {
                    item.Nome = Nome
                    item.Sobrenome = Sobrenome
                    item.DtNascimento = DtNascimento
                    item.Formacao = Formacao
                }
            })
        }

        alert("REGISTRO SALVO COM SUCESSO")
        $("#modalRegistro").modal("hide")

        //LIMPEZA DOS CAMPOS
        $("hdID").val("0")
        $("#txtNome").val("")
        $("txtSobrenome").val("")
        $("txtDtNascimento").val("")
        $("txtFormacao").val("")

        PopulaTabela()
    })

})