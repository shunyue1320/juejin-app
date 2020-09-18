export default ({ isHMR, app, store, error }) => {
  const defaultLocate = app.i18n.fallbackLocale
  if ( isHMR ) return
  const locale = app.$cookies.get('lang') || defaultLocate
  if (!store.state.locale.locales.includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }

  store.commit('locale/SET_LANG', locale)
  app.i18n.locale = locale
}