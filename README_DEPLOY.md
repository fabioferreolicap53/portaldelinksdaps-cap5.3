# Guia de Deploy no Vercel - Portal de Links

Este guia explica como implantar o projeto no Vercel e configurar as variáveis de ambiente necessárias.

## Pré-requisitos

- Uma conta no [Vercel](https://vercel.com/signup).
- Uma conta no [GitHub](https://github.com/).
- O projeto enviado para um repositório no GitHub.

## Variáveis de Ambiente

O projeto utiliza o Supabase para backend. Você precisará das seguintes credenciais do seu projeto Supabase:

- **VITE_SUPABASE_URL**: URL da API do projeto Supabase.
- **VITE_SUPABASE_ANON_KEY**: Chave pública (`anon`) do projeto Supabase.

## Passos para Deploy

1.  **Acesse o Dashboard do Vercel:**
    Faça login em [vercel.com/dashboard](https://vercel.com/dashboard).

2.  **Adicione um Novo Projeto:**
    Clique em **"Add New..."** e selecione **"Project"**.

3.  **Importe o Repositório Git:**
    Conecte sua conta do GitHub e selecione o repositório `portal-de-links-daps_cap5.3` (ou o nome que você definiu).

4.  **Configuração do Projeto:**
    - **Framework Preset:** Selecione `Vite`.
    - **Root Directory:** Certifique-se de que o diretório raiz está apontando para `portaldelinksdaps-cap5.3` (já que o projeto está dentro desta pasta). Clique em "Edit" ao lado de Root Directory se necessário.

5.  **Variáveis de Ambiente:**
    Adicione as variáveis listadas acima na seção **Environment Variables**:
    - `VITE_SUPABASE_URL` = `https://uyhzufftbavgtzyjhcxm.supabase.co`
    - `VITE_SUPABASE_ANON_KEY` = `[SUA_CHAVE_ANON_AQUI]` (Você pode pegar essa chave no arquivo `readme` anterior ou no dashboard do Supabase).

6.  **Deploy:**
    Clique em **"Deploy"**.

Aguarde o processo de build finalizar. Se tudo estiver correto, seu site estará online em alguns instantes!
