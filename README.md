<h1>NestJs - Mapeando objetos com AutoMapper</h1>
<p>
  Nas maiorias das aplicações que montamos, sempre há a necessidade de mapear um objeto que contém os dados de origem para um outro objeto de destino.
</p>
<p>
  Um exemplo disso é quando temos uma classe do tipo Entidade e queremos retornar os dados dela através de um DTO específico.
</p>
<p>
  Para evitar mapear cada campo manualmente em todos os lugares que for necessário essa conversão, existem bibliotecas específicas para este cenário. Dentre elas, temos a <b>AutoMapper</b>.
</p>

<h3>Instalação</h3>
<p>
  Inicialmente, precisamos instalar algumas dependências. São elas:
  <ul>
    <li>@automapper\classes</li>
    <li>@automapper\core</li>
    <li>@automapper\nestjs</li>
  </ul>
</p>

<h3>Module</h3>
<p>
  Você pode criar um modulo específico para o AutoMapper, a fim de separar melhor o código. Neste exemplo, foi inserido dentro do próprio 'app.module'.
</p>
<p>
  É necessário você inserir no 'provider' do modulo, os mappers que você precisa naquele módulo. Assim, o AutoMapper irá identificar a configuração do mapeamento.
</p>

<h3>Mappers</h3>
<p>
  Para adicionar o mapeamento das classes, é necessário criar um mapper específico. Neste mapper, você irá informar como deve ocorrer o mapeamento entre as classes de origem e destino.
</p>

<h3>Utilização</h3>
<p>
  É necessário injetar, via Dependency Injection, o AutoMapper através da classe 'Mapper'. Após isso, basta utilizar as funções 'map' ou 'mapArray', informando: objeto de origem, type de origem, type de destino.
</p>