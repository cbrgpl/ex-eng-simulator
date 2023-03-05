# EX-ENG-SIMULATOR

This project purposes are studying Vue3 Composition API + TS + Pinia tech setup. Project will be integrated with ChatGPT to generate lessons and tasks to increase language skills. There are no tech specifications so I making up logic in workflow process.

# Development details

Except above-mentioned technologies there are extra techs - vuetify, iconify, i18n; Additionally I use dev techs like eslint, stylelint, vite, sass.

There are some restrictions in usage of that combination of techs:

## Vuetify + Iconify

By default vuetify uses its own icons, but it can be changed by config modifications. There is the solve of [problem](https://github.com/vuetifyjs/vuetify/issues/7821#issuecomment-1263337008).

I integrated above solving in project, so this is instructions of usage iconify icon sets:
Vuetify config path [`$root/src/utils/plugins/vuetify/index.ts`](./src/utils/plugins/vuetify/index.ts), needed config property is `icons`.

`.../vuetify/index.ts`
```ts
{
   icons: {
    defaultSet: 'mdi',
    sets: {
      mdi: iconify( 'mdi' ),
      newSet: iconify( 'newSetName' )
    },
  },
}
```

Usage
```
<VBtn icon="newSet:icon-name" />
```

## Vuetify + i18n

Becase of vuetify and i18n both used by project, I followed [this guide](https://vuetifyjs.com/en/features/internationalization/#vue-i18n) to integrate i18n, but this is not all, additionally project used [this material](https://vue-i18n.intlify.dev/guide/advanced/lazy.html) to integrate translates lazy loading becase of multiple languages.

Important files and modules:

- [$root/src/router/guards/languageSupportGuard.ts](./src/router/guards/languageSupportGuard.ts)
- [$root/src/utils/plugins/i18n](./src/utils/plugins/i18n)
- [$root/src/localization](./src/localization)

To add extra language support U need:

1. Add language to `SUPPORT_LOCALES` in [i18n module](./src/utils/plugins/i18n/index.ts)
2. Create languge static file in (localization)[./src/] followed by pattern `[language_code].json`

## Vuetify + SCSS

Guide in vuetify docs does not work at all, because of vite or something else. I used that algorithm to include vuetify styles in project:

1. Added vuetify to [global styles](./src/scss/_global.scss) with `@use 'vuetify/lib/styles/main.sass';`
2. Encapsulate vuetify customization to individual [file](./src/scss/libs/_vuetify.scss)

## Stylelint + VSC

For stylelint in Visual studio code U need append properties to [$root/.vscode/settings.json](./.vscode/settings.json)

```json
   "stylelint.validate": [
      "vue",
      "css"
   ],
   "css.validate": false,
```

