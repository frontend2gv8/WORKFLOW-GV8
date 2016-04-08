# WORKFLOW

## Páginas internas
### Categorias
- Contato
- Empresa/ Quem Somos
- Galeria de Fotos
- Produto / Servicos
- Depoimentos
- Videos
- Localizacao
- Agenda/ Eventos
- Perguntas Frequentes
- Orçamentos
- Links Úteis
- Clientes/ Parceiros
- Páginas com Formulário

Para toranar o seu carousel responsivo você  deverá fazer asim com no exemplo abaixo.

Ex 1:
```
<div class="carousel" id="meuCarousel" data-md="$qtde" data-sm="$qtde" data-xs="$qtde">
	<div class="carousel-inner">
		<div class="elemento-teste"></div>
		<div class="elemento-teste"></div>
	</div>
</div>

<script>
	$('#meuCarousel').carouselResponsive();
</script>
```
Ex2:
Basta adicionar a classe ".carousel-responsive".

```
<div class="carousel carousel-responsive" id="meuCarousel" data-md="$qtde" data-sm="$qtde" data-xs="$qtde">
	<div class="carousel-inner">
		<div class="elemento-teste"></div>
		<div class="elemento-teste"></div>
	</div>
</div>

Ex3:
Com indicadores (pagers), basta adicionar o atributo [data-indicators="true"] caso nao o tenha ele sará tratado como false

```
<div class="carousel carousel-responsive" id="meuCarousel" data-md="$qtde" data-sm="$qtde" data-xs="$qtde" data-indicators="true">
	<div class="carousel-inner">
		<div class="elemento-teste"></div>
		<div class="elemento-teste"></div>
	</div>

	<ol className="carousel-indicators"></ol>
</div>

Ex3:
Com indicadores (pagers), basta adicionar o atributo [data-indicators="true"] caso nao o tenha ele sará tratado como false

```
<div class="carousel carousel-responsive" id="meuCarousel" data-md="$qtde" data-sm="$qtde" data-xs="$qtde" data-indicators="true">
	<div class="carousel-inner">
		<div class="elemento-teste"></div>
		<div class="elemento-teste"></div>
	</div>

	<ol className="carousel-indicators"></ol>
</div>

Onde:
- "data-md" define a quantidade para desktop;
- "data-sm" define a quantidade para tablets;
- "data-xs" define a quantidade para dispositivos mobile;

Obs:  É obrigatória a atribuição de um id para o carousel, caso não o tenha, o mesmo não funcionará.