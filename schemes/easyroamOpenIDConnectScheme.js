import { OpenIDConnectScheme } from '~auth/runtime';

export default class EasyroamOpenIDScheme extends OpenIDConnectScheme {
    constructor($auth, options){
        const configOptions = {
            ...options,
            ...$auth.ctx.$config.auth.strategies[options.name]
        };
        super($auth, configOptions);
    }

    logout() {
        if (this.options.endpoints.logout) {
            const opts = {
                client_id: this.options.clientId + '',
                id_token: this.idToken.get(),
                logout_uri: this.logoutRedirectURI
            }
            const url = this.options.endpoints.logout + '?' + Object.keys(opts).map(key => key + '=' + opts[key]).join('&')
            window.location.href = url
        }
        return this.$auth.reset();
    }
}