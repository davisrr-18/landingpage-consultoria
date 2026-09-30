# Landing Page de consultoria fiscal

[![CI e deploy no GitHub Pages](https://github.com/davisrr-18/landingpage-consultoria-fiscal/actions/workflows/deploy.yml/badge.svg)](https://github.com/davisrr-18/landingpage-consultoria-fiscal/actions/workflows/deploy.yml)

[![Capa da landing page Vértice Fiscal](public/og-image.png)](https://davisrr-18.github.io/landingpage-consultoria-fiscal/)

Landing page demonstrativa (empresa fictícia) feita com React, Vite e CSS Modules.
Apresenta serviços de consultoria fiscal e direciona o visitante ao atendimento pelo WhatsApp.

**Site publicado:** https://davisrr-18.github.io/landingpage-consultoria-fiscal/

> **Aviso:** todo o conteúdo (nome da empresa, textos e contatos) é fictício e serve apenas
> para demonstração.

## Stack

- [React 19](https://react.dev/) com componentes funcionais e hooks
- [Vite 8](https://vite.dev/) para desenvolvimento e build
- CSS Modules para estilos com escopo por componente
- [Vitest](https://vitest.dev/) para testes e [oxlint](https://oxc.rs/) para análise estática
- GitHub Actions + GitHub Pages para CI e deploy

## Pré-requisitos

- Node.js `^20.19.0` ou `>=22.12.0` (versão recomendada em `.nvmrc`; com nvm, rode `nvm use`)
- npm

## Executar

```bash
npm ci           # instala as dependências exatas do package-lock.json
npm run dev      # desenvolvimento
npm run lint     # análise estática
npm test         # testes automatizados (Vitest)
npm run build    # build de produção em dist/
npm run preview  # pré-visualiza o build
```

## Personalizar

Todo o conteúdo editável está em `src/config/site.js`: nome, textos, serviços,
diferenciais, navegação e dados de contato. O título, a descrição e as tags de
compartilhamento (Open Graph) do `index.html` são preenchidos a partir de `siteConfig`
durante o build.

Ao publicar em outro endereço, atualize `siteConfig.url`. A imagem de pré-visualização
exibida ao compartilhar o link fica em `public/og-image.png` (1200x630) e é configurada
em `siteConfig.shareImage`.

### Ativar o WhatsApp

Em `src/config/site.js`, informe o número em `siteConfig.whatsapp.number` no formato
internacional E.164, com código do país e DDD (ex.: `5511900000000`). Espaços, parênteses,
hífens e o `+` inicial são removidos; o número precisa ter de 8 a 15 dígitos e não pode
começar com zero.

- Sem número (ou com número inválido): o formulário exibe um aviso de demonstração e uma
  prévia da mensagem, e os botões de chamada levam ao formulário.
- Com número: botões e formulário abrem `https://wa.me/<número>` com a mensagem codificada.

Depois de personalizar, remova o aviso de demonstração definindo `siteConfig.isDemo` como `false`
e ajustando os textos "fictícios" em `about` e `footer`.

## Estrutura

```text
src/
  components/
    ui/        componentes reutilizáveis (Button, Section, Icon, Reveal...)
    sections/  seções da página (Header, Hero, Services...)
    contact/   formulário de contato (campos, feedback)
  config/      dados personalizáveis do site
  hooks/       formulário, seção ativa, rolagem por âncora, visibilidade
  pages/       composição da página
  services/    geração de URL/mensagem do WhatsApp e validação
  styles/      tokens e estilos globais
  utils/       rolagem, cliques em âncoras e cálculo da seção ativa
```

## Deploy

O workflow `.github/workflows/deploy.yml` roda a cada push e pull request na `main`:

1. Instala as dependências com `npm ci`, roda lint, testes e build.
2. Em push na `main` (ou execução manual), publica o conteúdo de `dist/` no GitHub Pages.

Pull requests só passam pela validação, sem publicar.

Como o GitHub Pages serve o site em `/<repositório>/`, o build usa a variável
`VITE_BASE_PATH` (definida no workflow) como `base` do Vite. Localmente ela não é
necessária e o site roda em `/`. Para simular o build de produção:

```bash
VITE_BASE_PATH=/landingpage-consultoria-fiscal/ npm run build
npm run preview
```

Para usar um domínio próprio, crie `public/CNAME` com o domínio e remova o
`VITE_BASE_PATH` do workflow.

## Licença

Todos os direitos reservados. Veja [LICENSE](LICENSE).
