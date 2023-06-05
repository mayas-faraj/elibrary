import favicon from './extensions/favicon.png';

// primary color #151620fc
export default {
    config: {
        head: {
            favicon: favicon
        },
        tutorials: false,
        translations: {
            en: {
                "app.components.HomePage.welcomeBlock.content.again": "Welcome to Italian ambassador CMS!",
                "app.components.LeftMenu.navbrand.title": "CMS Menu",
                "app.components.LeftMenu.navbrand.workplace": "Ambassador CMS",
                "Auth.form.welcome.title": "Itanlian ambassador admins login area",
                "Auth.form.welcome.subtitle": "Log in to your account"
            }
        },
        theme: {
            colors: {
                alternative100: '#008C45',
                alternative200: '#008C45',
                alternative500: '#008C45',
                alternative600: '#008C45',
                alternative700: '#008C45',
                buttonNeutral0: '#e0dcd4',
                buttonPrimary500: '#000',
                buttonPrimary600: '#12131a',
                neutral0: '#151620fc',
                neutral100: '#e0dcd4a0',
                neutral1000: '#e0dcd4',
                neutral150: '#918e8aa1',
                neutral200: '#e0dcd4a2',
                neutral300: '#151620fc',
                neutral400: '#e0dcd4a4',
                neutral500: '#e0dcd4a5',
                neutral600: '#959392ff',
                neutral700: '#e0dcd4a7',
                neutral800: '#ce9c72',
                neutral900: '#e0dcd4a9',
                primary100: '#e0dcd4a0',
                primary200: '#e0dcd4a1',
                primary500: '#e0dcd4a2',
                primary600: '#151620fc',
                primary700: '#161620a4',
                secondary100: '#0c0c0da0',
                secondary200: '#0c0c0da1',
                secondary500: '#0c0c0da2',
                secondary600: '#e0dcd4a3',
                secondary700: '#0c0c0da4',
            }
        },
        locales: [
            // 'ar',
            // 'fr',
            // 'cs',
            // 'de',
            // 'dk',
            // 'es',
            // 'he',
            // 'id',
            'it',
            // 'ja',
            // 'ko',
            // 'ms',
            // 'nl',
            // 'no',
            // 'pl',
            // 'pt-BR',
            // 'pt',
            // 'ru',
            // 'sk',
            // 'sv',
            // 'th',
            // 'tr',
            // 'uk',
            // 'vi',
            // 'zh-Hans',
            // 'zh',
        ],
    },
    bootstrap(app) {
        console.log(app);
    },
};