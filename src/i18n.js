import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "navbar.admin-button": "To admin view",
      "navbar.about-button": "About us",
      "navbar.shops-button": "Our shops",
      "navbar.cart-button": "Cart"
    }
  },
  ee: {
    translation: {
      "navbar.admin-button": "Admin vaatesse",
      "navbar.about-button": "Meist",
      "navbar.shops-button": "Meie poed",
      "navbar.cart-button": "Ostukorv"
    }
  },
  ru: {
    translation: {
      "navbar.admin-button": "Admin vaatesse RU",
      "navbar.about-button": "Meist RU",
      "navbar.shops-button": "Meie poed RU",
      "navbar.cart-button": "Ostukorv RU"
    }
  }

};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ee', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;