var LSIBusca = (function(){
    'use strict';

    var instancia;
    var instanciar = function()
    {
        if (typeof instancia === 'undefined') {
            instancia = new LSIBuscaObject();
            return instancia;
        } else
            return instancia;
    }

    var LSIBuscaObject = function()
    {
        // opções padrão
        // url do webservice
        this.webservice = 'http://localhost/busca';
        // método da requisição http (ajax)
        this.metodo = 'GET';
        // cabeçalhos da requisição http (ajax)
        this.headers = {}
        // container onde será renderizada a resposta
        this.alvo = null;
        // input onde o usuário digita o termo da busca
        this.campo = null;
        // atraso após digitar "cada caractere" para acionar a busca
        this.atraso = 500;
        // quantidade mínima de caracteres para a busca
        this.minlength = 4;
        // função do usuário para renderizar a resposta
        this.render = function(respostaAjax){}
        this.antesEnviar = function(){}
        this.aoConcluir = function(){}


        // expandindo o escopo
        let inst = this;

        // conexão de busca
        this.ajax = new XMLHttpRequest();
        this.ajax.onreadystatechange = function() {
            if (inst.ajax.readyState === 4) {
                if (inst.ajax.status === 0) {
                    console.log('Requisição abortada!');
                } else
                if (inst.ajax.status === 200) {
                    // validar resposta
                    // renderizar
                    inst.popula(inst.ajax.responseText);
                } else {
                    // erro
                }
                inst.aoConcluir();
            }
        }

        // inicialização do objeto
        this.html = {}

        this.prep = function(opcoes)
        {
            if (
                typeof opcoes !== 'object'
                || opcoes === null
            )
                return false;

            for (let opcao in opcoes) {
                this[opcao] = opcoes[opcao];
            }

            if (
                typeof opcoes.alvo !== 'object'
                || opcoes.alvo === null
                ||typeof opcoes.campo !== 'object'
                || opcoes.campo === null
            )
                return false;

            inst.html.container = document.createElement('div');
            inst.html.container.classList.add('lsi-busca');
            inst.alvo.appendChild(inst.html.container);

            let inputTimeout;
            inst.campo.addEventListener(
                'input',
                function(){
                    let input = this;

                    if (typeof inputTimeout !== undefined) {
                        clearTimeout(inputTimeout);
                        inputTimeout = undefined;
                    }

                    inputTimeout = setTimeout(
                        function(){
                            inst.buscar(input.value);
                        },
                        inst.atraso
                    );
                },
                false
            );

            return inst;
        }

        this.buscar = function(termoBusca)
        {
            if (inst.ajax.readyState !== 0 && inst.ajax.readyState != 4)
                inst.ajax.abort();

            if (termoBusca.length >= inst.minlength) {
                inst.antesEnviar();

                inst.ajax.open(inst.metodo, inst.webservice);

                console.log('Requisiçao iniciada!');

                for (let cab in inst.headers) {
                    inst.ajax.setRequestHeader(cab, headers[cab]);
                }

                inst.ajax.send();
            } else
                inst.limpaBusca();
        }

        this.limpaBusca = function()
        {
            inst.html.container.innerHTML = '';
        }

        this.popula = function(dados)
        {
            this.render(dados);
        }

        this.criarItem = function()
        {
            let dvItem = document.createElement('div');
            let item = document.createElement('div');
            item.classList.add('lsi-busca-item');
            dvItem.appendChild(item);
            inst.html.container.appendChild(dvItem);
            return item;
        }

        return inst;
    }

    return instanciar;
})();