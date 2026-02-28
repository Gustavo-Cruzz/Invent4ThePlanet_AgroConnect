# 🌾 AgroConnect — Plataforma B2B de Comercialização Agrícola

## Conceito

**AgroConnect** é um protótipo de plataforma B2B que conecta **produtores rurais** a **compradores** (mercados, restaurantes e distribuidores) por meio de um sistema inteligente de oferta futura, análise preditiva de demanda e roteamento logístico otimizado.

> **Proposta de valor central:** Transformar incerteza em previsibilidade.

---

## 🧩 Funcionamento (Fluxo do Sistema)

O sistema opera em **3 etapas inteligentes**:

### 1️⃣ Oferta Futura Estruturada
O produtor anuncia mercadorias com antecedência, informando produto, quantidade, data de disponibilidade, localização e preço estimado.

### 2️⃣ Predição de Demanda
O sistema analisa o histórico de compras e sugere automaticamente compradores com maior probabilidade de interesse, incluindo:
- Lista de CNPJs sugeridos
- Probabilidade de compra (%)
- Quantidade prevista por cliente
- Indicador de compatibilidade

### 3️⃣ Consolidação + Roteamento Otimizado
Após o fechamento do prazo de pedidos, o sistema:
- Consolida toda a demanda confirmada
- Calcula a melhor rota de entrega
- Minimiza o custo de frete com roteamento inteligente

---

## 👤 Personas

### 🌾 Produtor Rural
- Pequeno ou médio produtor que planeja colheita com antecedência
- **Dor:** "Eu produzo, mas não sei exatamente quanto conseguirei vender."
- **Valor:** Venda antecipada garantida, melhor previsibilidade, otimização logística

### 🛒 Comprador (Mercado/Restaurante)
- Compra recorrente, sofre com variação de preço
- **Dor:** "Não sei quando o produto vai subir de preço ou faltar."
- **Valor:** Compra programada, preço previsível, redução de intermediários

---

## 🏗️ Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| Vue.js 3 | Framework frontend |
| Vite | Build tool |
| Vue Router | Navegação entre páginas |
| Pinia | Estado global (dados mockados) |
| TailwindCSS 3 | Estilização |

> ⚠️ **Sem backend real** — todos os dados são simulados em memória.

---

## 📂 Estrutura de Pastas

```
src/
├── main.js              # Ponto de entrada
├── App.vue              # Layout principal + navbar
├── router.js            # Rotas da aplicação
├── style.css            # Estilos globais + Tailwind
├── stores/
│   └── appStore.js      # Pinia store com dados mockados
└── views/
    ├── Login.vue              # 1. Login via CNPJ
    ├── ProducerDashboard.vue  # 2. Dashboard do Produtor
    ├── PredictiveAnalysis.vue # 3. Análise Preditiva (simulada)
    ├── BuyerDashboard.vue     # 4. Dashboard do Comprador
    ├── OrderClosing.vue       # 5. Fechamento de Pedidos
    └── Routing.vue            # 6. Roteamento Inteligente (simulado)
```

---

## 🚀 Como Rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## ⚠️ Limitações

- **Protótipo não funcional** — apenas ilustrativo e conceitual
- Dados são fixos e mockados (sem persistência)
- Análise preditiva é simulada (sem ML real)
- Mapa de roteamento é ilustrativo (sem API de geolocalização)
- Sem autenticação ou validação real de CNPJ
- Objetivo: apresentar o **conceito e o fluxo** para avaliação da banca
