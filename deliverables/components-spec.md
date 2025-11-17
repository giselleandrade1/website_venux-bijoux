# Componentes e Composições

Este documento descreve a estrutura, props, estados, acessibilidade e animações para os componentes solicitados.

Formato: para cada componente forneço estrutura HTML (sem traço), props, estados visuais, requisitos de acessibilidade e animações recomendadas.

1) Header
- Estrutura: container, logo link, search form with suggestion list, theme toggle button, icons area with profile link and cart button with counter.
- Props: onSearch(query), suggestions[], cartCount, user
- Estados: default, focused, emptySearch, suggestionsOpen, loggedOut, loggedIn
- Acessibilidade: search input with aria-label, suggestion list role listbox with aria-activedescendant, theme toggle with aria-pressed, icons with accessible labels
- Animações: suggestion list fade and slide 120ms, theme toggle micro bounce 120ms

2) Footer
- Estrutura: columns with links, contact block, social icons, certifications area
- Props: links[], social[], copyright
- Acessibilidade: semantic nav and lists, focus visible
- Animações: hover underline transition 120ms

3) Product Grid card
- Estrutura: image container, productTitle, price, badge, action button
- Props: product {id, name, price, images, customizable}, onAdd
- Estados: hover, focused, outOfStock, lowStock
- Acessibilidade: image alt, button aria-label, keyboard focusable
- Animações: image scale on hover 160ms, shadow elevation change

4) Product detail
- Estrutura: gallery, info column, pendant selection radio group, preview mockup
- Props: product, variants, pendantOptions
- Acessibilidade: gallery keyboard navigation, radio group role
- Animações: gallery slide 200ms, zoom on image on hover 180ms

5) Configurator
- Estrutura: stepper with steps, live preview canvas, save combination
- Props: steps[], onSave, initialState
- Acessibilidade: stepper aria-current, controls keyboard operable
- Animações: transition of preview states 120ms, micro feedback on save

6) Modals
- Estrutura: modal container, header, body, footer actions
- Props: open, onClose, title
- Acessibilidade: role dialog, aria-modal true, focus trap, restore focus
- Animações: fade and scale 160ms

7) Filters and sorting
- Estrutura: filter groups, chips, range sliders, sort select
- Props: filtersState, onChange
- Acessibilidade: form controls labeled, keyboard operable
- Animações: chip add remove with height collapse 140ms

8) Collections bar
- Estrutura: horizontal slider with cards, navigation arrows
- Props: collections[], onSelect
- Acessibilidade: arrows keyboard focus, visible labels
- Animações: slide with inertia 220ms

9) Feedback toasts
- Estrutura: small toast with icon and message
- Props: type success|error|loading|warning, message
- Acessibilidade: role status, polite announcements
- Animações: slide in from bottom 180ms

10) Icon set
- For interface icons produce rounded corner style. Provide svg sprites and optional icon font build pipeline (example config provided separate).


Entregaveis relacionados a componentes
- Variants e tokens para cada componente em JSON
- Guia de uso e exemplos de markup e aria
- Assets svg otimizados para cada icone e pingente

Observação
- Este arquivo é uma especificação inicial. Posso gerar componentes React prontos para o `src/components` seguindo esta especificação se desejar.
