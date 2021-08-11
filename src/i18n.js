import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
  en: {
    translation: {
      "Login Title": "Sign In",
      "Google Login": "Sign In with Google",
      "Facebook Login": "Sign In with Facebook",
      "Use Login Credentials": "or use your credentials",
      Email: "Email",
      Password: "Password",
      "Enter email warning": "Please enter your email",
      "Enter password warning": "Please enter your password",
      "Error occurred": "An error has occurred",
      "Patient not found": "The requested patient was not found",
      Dashboard: "Dashboard",
      Patients: "Patients",
      Appointments: "Appointments",
      Accounting: "Accounting",
      Institution: "Institution",
      "System Settings": "System Settings",
    },
  },
  es: {
    translation: {
      "Login Title": "Iniciar Sesión",
      "Google Login": "Continuar con Google",
      "Facebook Login": "Continuar con Facebook",
      "Use Login Credentials": "o ingresa tus credenciales",
      Email: "Correo Electrónico",
      Password: "Contraseña",
      "Enter email warning": "Por favor ingresa tu correo electrónico",
      "Enter password warning": "Por favor ingresa tu contraseña",
      "Error occurred": "Ha ocurrido un error",
      "Patient not found": "El paciente solicitado no fué encontrado",
      Dashboard: "Escritorio",
      Patients: "Pacientes",
      Appointments: "Citas",
      Accounting: "Contabilidad",
      Institution: "Institución",
      "System Settings": "Ajustes del Sistema",
      "Log Out": "Cerrar Sesión",
      "Patient Profile": "Expediente del Paciente",
      "Personal Data": "Datos Personales",
      "Date of Birth": "Fecha de Nacimiento",
      Gender: "Género",
      Occupation: "Ocupación",
      "Marital Status": "Estado Civil",
      Single: "Soltero(a)",
      Married: "Casado(a)",
      Divorced: "Divorciado(a)",
      Widowed: "Viudo(a)",
      "Free Union": "Unión Libre",
      Other: "Otro",
      Male: "Masculino",
      Female: "Femenino",
      Other: "Otro",
      "years old": "años",
      "Visit History": "Historial de Visitas",
      "Add Medical Background": "Agregar Antecedentes",
      "Add Consultation": "Agregar Consulta",
      "Add Procedure": "Agregar Procedimiento",
      "Medical Background": "Antecedentes",
      Consultations: "Consultas",
      Consultation: "Consulta",
      Procedures: "Procedimientos",
      Procedure: "Procedimiento",
      Image: "Imagen",
      Images: "Imagenes",
      "Patient Record": "Expediente del Paciente",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
