# Cronômetro - Refatoração Completa

## 📋 Resumo das Alterações

### 🔒 Segurança
- ✅ Removido XSS: substituído `innerHTML` por `textContent`
- ✅ Validação robusta de entrada (0-59 para segundos, 0-999 para minutos)
- ✅ Prevenção de valores negativos e não numéricos
- ✅ Sanitização em tempo real com feedback ao usuário

### ⚡ Performance
- ✅ **Corrigido Memory Leak**: event listener do botão FORA do interval
- ✅ Estado centralizado (não mais manipulação direta do DOM)
- ✅ Cleanup automático ao sair da página
- ✅ Sem re-renders desnecessários

### 🎯 UX/Funcionalidade
- ✅ Botão de pausa/retomada (substituindo apenas stop)
- ✅ Botão de reset independente
- ✅ Mensagens de status com feedback visual
- ✅ Validação em tempo real durante digitação
- ✅ Estados de botões coerentes

### ♿ Acessibilidade
- ✅ ARIA labels e roles (`role="timer"`, `aria-live="polite"`)
- ✅ aria-describedby para mensagens de erro
- ✅ aria-label em todos os botões
- ✅ Semântica HTML5 (form, labels associadas)
- ✅ Suporte a `prefers-reduced-motion`
- ✅ Suporte a modo escuro

### 🎨 Design & CSS
- ✅ Variáveis CSS para manutenção fácil
- ✅ Grid layout moderno (sem floats)
- ✅ Responsividade mobile-first
- ✅ Suporte a dark mode
- ✅ Animações suaves com transições

### 📐 Código
- ✅ SOLID: Single Responsibility, Dependency Inversion
- ✅ DRY: Funções reutilizáveis, sem repetição
- ✅ Clean Code: nomenclatura semântica, estrutura clara
- ✅ Comentários mínimos (código auto-explicativo)
- ✅ Sem variáveis globais desnecessárias

---

## 🚀 Como Usar

### Instalação
```bash
git clone https://github.com/alissonbatalha/cronometro.git
cd cronometro
# Abrir index.html no navegador (não requer build)
```

### Estrutura de Arquivos
```
cronometro/
├── index.html      # HTML semântico
├── style.css       # Estilos com variáveis CSS
├── script.js       # Lógica principal (módulo ES6)
└── README.md       # Documentação
```

---

## 🔧 Arquitetura Técnica

### State Management (timerState)
```javascript
{
  minutes: 0,           // Minutos atuais
  seconds: 0,           // Segundos atuais
  totalSeconds: 0,      // Total em segundos (para controle)
  isRunning: false,     // Cronômetro ativo?
  isPaused: false,      // Cronômetro pausado?
  intervalId: null,     // ID do interval (para clearInterval)
}
```

### Funções Principais
- `startTimer()` - Validar, inicia o cronômetro
- `pauseTimer()` - Pausa mantendo o estado
- `resumeTimer()` - Retoma do ponto pausado
- `resetTimer()` - Limpa tudo
- `tick()` - Decrementa 1 segundo
- `validateInput()` - Valida e retorna número ou null
- `updateDisplay()` - Atualiza o display formatado
- `updateButtonStates()` - Controla enabled/disabled dos botões

### Flow de Validação
```
Input → validateInput() → clearErrors() → startTimer()
  ↓ erro
  └→ mostrar feedback no DOM
```

---

## 🎨 CSS Moderno

### Variáveis Disponíveis
```css
--primary-color: #6be628     /* Verde - Iniciar */
--danger-color: #e61d1d      /* Vermelho - Resetar */
--secondary-color: #8588f7   /* Azul - Pausar */
--radius: 6px                /* Border-radius padrão */
--shadow: ...                /* Sombra padrão */
```

### Modificar Cores
Apenas edite `:root` no início do `style.css`.

---

## ♿ Acessibilidade

### Testado Com
- ✅ NVDA (screen reader Windows)
- ✅ VoiceOver (MacOS/iOS)
- ✅ Navegação via teclado (Tab, Enter, Space)
- ✅ Modo escuro (prefers-color-scheme)
- ✅ Modo sem animações (prefers-reduced-motion)

### Teclas de Atalho (Nativas)
- `Tab` - Navegar entre campos
- `Enter/Space` - Ativar botões

---

## 📊 Testes Manual

### Case 1: Validação
```
1. Digitar -5 em Minutos → Erro "deve ser positivo"
2. Digitar 60 em Segundos → Erro "não pode exceder 59"
3. Digitar "abc" → Erro "deve ser um número"
```

### Case 2: Flow Completo
```
1. Digite 0 min, 5 seg
2. Clique "Iniciar" → Display começa 00:05
3. Clique "Pausar" → Congela o tempo
4. Clique "Iniciar" (agora "Iniciar" retoma) → Continua contagem
5. Clique "Resetar" → Volta a 00:00 e habilita inputs
```

### Case 3: Performance
- Nenhum vazamento de memória (testado DevTools)
- Cleanup automático ao mudar de página
- Event listeners removidos corretamente

---

## 🔄 Futuras Melhorias

### v2 (Pronto para implementar)
- [ ] LocalStorage para salvar último timer
- [ ] Notificação sonora real (Web Audio API)
- [ ] Preset de tempos comuns (5, 15, 30 min)
- [ ] Testes unitários com Jest
- [ ] TypeScript para type safety
- [ ] Compartilhar resultado (Share API)

### v3 (Roadmap)
- [ ] Modo Pomodoro (25min + pausa)
- [ ] Múltiplos timers simultâneos
- [ ] Histórico de sessões
- [ ] PWA + offline
- [ ] Dark mode automático

---

## 📝 Notas de Manutenção

### Para Modificar Cores
Edite as variáveis CSS em `:root` (linhas 1-8).

### Para Adicionar Nova Linguagem
Apenas altere os textos nos elementos:
```html
<button>Iniciar</button> → <button>Start</button>
```

### Para Desabilitar Dark Mode
Remova o media query `@media (prefers-color-scheme: dark)` do final de style.css.

---

## 🐛 Troubleshooting

**P: Display não atualiza em tempo real?**
- R: Verifique se o console está fechado (às vezes causa lag). Atualize a página.

**P: Botões desabilitados não reabilitam?**
- R: Isso é por design. Clique "Resetar" para voltar ao estado inicial.

**P: Funciona offline?**
- R: Sim! Não há dependências externas.

---

## 📄 Licença
MIT - Veja arquivo LICENSE no repositório.

---

Desenvolvido com ❤️ por Alisson Batalha
