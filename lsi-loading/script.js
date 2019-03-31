/*******************************************************************************
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-//
//. ___.....LSI...........________.......______..................__..__.......//
//./\  \................./\  _____\...../ _____\......LSI......./\ \ \ \......//
//.\ \_ \.......__  _____\ \ \____/..../\ \____/ ______  __  ___\ \ \_\ \..LSI//
//..\//\ \...../\_\/\  __ \ \ \_____...\ \ \____/\  __ \/\ \/ ___\ \____ \....//
//....\ \ \....\/\ \ \ \/ /\ \  ____\...\ \____ \ \ \/ /\ \  /___/\/____\ \...//
//.....\ \ \..._\ \ \ \  /..\ \ \___/....\/____\ \ \  /..\ \ \.........\ \ \..//
//.LSI..\_\ \__\ \ \ \ \ \...\ \ \______....____\ \ \ \...\ \ \.......__\_\ \.//
//....../\________\ \_\ \_\...\ \_______\../\_____/\ \_\...\ \ \...../\_____/.//
//......\/________/\/_/\/_/....\/_______/..\/____/..\/_/....\/_/.....\/____/..//
//¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-//
//    LSI          Felipe Moraes - felipemdeoliveira@live.com          LSI    //
//¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-//
********************************************************************************
****** MIT License (en)
********************************************************************************

Copyright (c) 2018 - Felipe "LipESprY" Moraes <felipemdeoliveira@live.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

********************************************************************************
****** Licença MIT (pt_BR)
********************************************************************************

Direitos autorais (c) 2018 - Felipe "LipESprY" Moraes
            <felipemdeoliveira@live.com>

É concedida permissão, gratuitamente, a qualquer pessoa que obtenha uma cópia
deste software e dos arquivos de documentação associados (o "Software"), para
lidar com o Software sem restrições, incluindo, sem limitação, os direitos de
usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e / ou
vender cópias do Software e para permitir que pessoas a quem o Software esteja
fornecido para tal, sujeito às seguintes condições:

O aviso de diretios autorais acima e este aviso de permissão devem ser
incluídos em todos cópias ou partes substanciais do Software.

O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU
IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO,
APTIDÃO PARA UMA FINALIDADE ESPECÍFICA E NÃO VIOLAÇÃO. EM NENHUMA CIRCUNSTÂNCIA
AUTORES OU DETENTORES DOS DIREITOS AUTORAIS SERÃO RESPONSABILIZADOS POR
QUALQUER RECLAMAÇÃO, DANOS OU OUTRAS RESPONSABILIDADES, SEJA EM AÇÃO DE
CONTRATO, DELITO OU OUTRO, DECORRENTE DE, FORA OU RELACIONADA COM O SOFTWARE
OU O USO OU OUTRAS CONCESSÕES NO SOFTWARE.
*******************************************************************************/

var LSILoading = (function(seletorAlvo){
    var LSILoadingObject = function(seletorAlvo)
    {
        this.alvo = document.querySelector(seletorAlvo);
        if (this.alvo === null)
            throw new Error('Alvo não encontrado');

        // criação do elemento html
        this.loading = document.createElement('div');
        this.loading.classList.add('lsi-loading');
        this.alvo.appendChild(this.loading);

        return this;
    }

    LSILoadingObject.prototype.mostra = function()
    {
        if (this.loading.classList.contains('esconde'))
            this.loading.classList.remove('esconde');
        this.loading.classList.add('mostra');
        return this;
    }

    LSILoadingObject.prototype.esconde = function()
    {
        if (this.loading.classList.contains('mostra')) {
            this.loading.classList.remove('mostra');
            this.loading.classList.add('esconde');
        }
        return this;
    }

    LSILoadingObject.prototype.toggle = function()
    {
        if (this.loading.classList.contains('mostra'))
            this.esconde();
        else
            this.mostra();
        return this;
    }

    var instanciar = function(seletorAlvo)
    {
        return new LSILoadingObject(seletorAlvo);
    }

    return instanciar;
})();
