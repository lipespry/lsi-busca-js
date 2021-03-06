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
                    let resposta = JSON.parse(inst.ajax.responseText);
                    if (resposta.sucesso === true) {
                        inst.paginas = resposta.resultado.paginas;

                        /*if (inst.pagina < inst.paginas)
                            inst.html.btnMais.style.display = 'block';
                        else
                            inst.html.btnMais.style.display = 'none';*/

                        inst.popula(resposta.resultado.dados);
                        setTimeout(function(){
                            if (
                                inst.getDocHeight() < inst.getWindowHeight()
                            )
                                inst.proxPagina();
                        }, 1200);
                    } else {
                        // erro
                    }
                } else {
                    // erro
                }
                inst.aoConcluir();
            }
        }

        // inicialização do objeto
        this.html = {}

        this.iniciaBusca = function(buscaTermo)
        {
            inst.pagina = 1;
            inst.termo = buscaTermo;
            inst.html.container.innerHTML = '';
            inst.buscar();
        }

        this.proxPagina = function()
        {
            if (inst.pagina < inst.paginas) {
                inst.buscar();
                /*if (inst.pagina < inst.paginas)
                    inst.html.btnMais.style.display = 'none';*/
            }
        }

        this.getDocHeight = function()
        {
            return Math.max(
                //document.body.scrollHeight,
                //document.body.offsetHeight,
                //document.documentElement.clientHeight,
                //document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
        }

        this.getWindowHeight = function()
        {
            return window.innerHeight;
        }

        this.getScrollTop = function()
        {
            return document.scrollingElement.scrollTop;
        }

        this.bindScrollInfinito = function()
        {
            document.addEventListener(
                'scroll',
                function(){
                    if (
                        (
                            inst.getScrollTop()
                            +inst.getWindowHeight()
                        )
                        === inst.getDocHeight()
                        && typeof inst.termo != undefined
                        && typeof inst.pagina != undefined
                        && typeof inst.paginas != undefined
                    )
                        inst.proxPagina();
                }
            );
        }

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
                            inst.iniciaBusca(input.value);
                        },
                        inst.atraso
                    );
                },
                false
            );

            /*inst.html.btnMais = document.createElement('button');
            inst.html.btnMais.setAttribute('type', 'button');
            inst.html.btnMais.innerText = 'Carregar mais resultados';
            inst.html.btnMais.style.display = 'none';
            inst.alvo.appendChild(inst.html.btnMais);
            inst.html.btnMais.addEventListener(
                'click',
                function(){
                    inst.proxPagina();
                },
                false
            );*/
            inst.bindScrollInfinito();

            return inst;
        }

        this.buscar = function()
        {
            if (inst.ajax.readyState !== 0 && inst.ajax.readyState != 4)
                return false; //inst.ajax.abort();

            if (inst.termo.length >= inst.minlength) {
                inst.antesEnviar();

                if (inst.metodo.toUpperCase() === 'GET') {

                    inst.ajax.open(
                        inst.metodo,
                        (
                            inst.webservice
                            +((/\?/).test(inst.webservice) ? '&' : '?')
                            +'b='+inst.termo
                            +'&pg='+inst.pagina
                            +'&_='+(new Date).getTime()
                        )
                    );

                    for (let cab in inst.headers) {
                        inst.ajax.setRequestHeader(cab, headers[cab]);
                    }

                    inst.ajax.send();
                } else {
                    inst.ajax.open(
                        inst.metodo,
                        (
                            inst.webservice
                            +((/\?/).test(inst.webservice) ? '&' : '?')
                            +'_='+(new Date).getTime()
                        )
                    );
                    inst.ajax.setRequestHeader(
                        'Content-Type',
                        'application/x-www-form-urlencoded'
                    );
                    inst.ajax.send(
                        'b='+inst.termo
                        +'&pg='+inst.pagina
                    );
                }
                inst.pagina++;
            } else
                inst.limpaBusca();
        }

        this.limpaBusca = function()
        {
            inst.html.container.innerHTML = '';
            inst.termo = undefined;
            inst.pagina = undefined;
            inst.paginas = undefined;
        }

        this.popula = function(dados)
        {
            for (let dado of dados) {
                this.render(dado);
            }
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
