# Tarte no Paraguai — Pontocom × Ela Bela

Página estática que compara o catálogo **Tarte Cosmetics** de duas lojas paraguaias:

- **Pontocom** (Ciudad del Este) — forte em **paletas de cor**.
- **Ela Bela** (elabela.com.py) — forte em **complexão** (bases, corretores, máscaras).

## O que mostra

1. **Em primeiro lugar:** os **16 produtos Tarte que a Pontocom tem e a Ela Bela não tem** — com **foto**, preço (US$/R$) e link para o produto.
2. **Quem vende Tarte no Paraguai** — verificação loja por loja (só Pontocom, Toku e Ela Bela vendem).
3. **Catálogo Tarte completo da Ela Bela** (80 SKUs) — com busca e filtro por categoria.

## Estrutura

```
index.html        · página
assets/style.css  · estilos
assets/app.js     · renderização + busca/filtro
data.js           · dados coletados (Pontocom 16 + Ela Bela 80 + lojas)
img/pontocom/     · fotos dos produtos da Pontocom (locais)
```

## Rodar

É um site estático — abra `index.html` no navegador, ou publique via **GitHub Pages**
(Settings → Pages → branch `main` / root).

## Metodologia

Dados coletados em **14/07/2026** com **Playwright + Obscura** (modo stealth) e navegador real,
entrando no buscador interno de cada loja. Preços em US$ para não-paraguaios (residente paga + IVA);
preços e estoque podem mudar sem aviso. Dados de catálogo público, para fins de comparação de mercado.
