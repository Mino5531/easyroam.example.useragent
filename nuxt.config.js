export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'easyroam.example.useragent',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
    apiURL: process.env.API_URL || 'http://localhost:5000',
    auth: {
      strategies: {
        oidc: {
          scheme: '~/schemes/easyroamOpenIDConnectScheme',
          clientId: `${process.env.CLIENT_ID}`,
          endpoints: {
            configuration: `${process.env.OID_URL}/.well-known/openid-configuration`,
            logout: `${process.env.OID_URL}/oauth/logout`
          },
          responseType: 'code',
          redirectUri: `${process.env.REDIRECT_HOST}callback`,
          logoutRedirectUri: `${process.env.REDIRECT_HOST}?logout=true`,
          grantType: 'authorization_code',
          scope: 'openid offline_access profile.create profile.delete profile.modify profile.read realm.read',
          codeChallengeMethod: 'S256'
        }
      }
    }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies: {
      oidc: {
        scheme: '~/schemes/easyroamOpenIDConnectScheme'
      }
    },
    redirect: {
      login: '/login',
      callback: '/callback',
      home: '/home'
    }
  },
  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
