import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
      :root {
          --white: #ffffff;
          --darktext: #101828;
          --copytext: #667085;
          --lighttext: #CDCDCD;
          --background: #F8FCFB;
          --background-pale: #f9f9f9;
          --background-pale-dark: #eeeeee;
          --background-opac-90: rgba(248, 252, 251, .9);
          --primary-100: #19A7B0;
          --primary-90: #3bb4bc;
          --primary-60: #E5F6F6;
          --primary-50: #ECF9F8;
          --gray-70: #959596;
          --gray-30: #D0D5DD;
          --gray-10: #f5f5f5;

          --boxshadow-primary: hsl(0 0% 0% / 10%) 0px 1px 2px 0px;
     
      }
  
     
        /* poppins-300 - latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        src: local(''),
            url('/fonts/poppins-v20-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/poppins-v20-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
        }
        /* poppins-regular - latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url('/fonts/poppins-v20-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/poppins-v20-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
        }
        /* poppins-500 - latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        src: local(''),
            url('/fonts/poppins-v20-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/poppins-v20-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
        }
       
        /* poppins-700 - latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        src: local(''),
            url('/fonts/poppins-v20-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/poppins-v20-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
        }
    


      *,
      *::before,
      *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
      
      html {
          font-size: 100%;
      }

      body {
          font-family: 'Poppins', sans-serif;
          background-color: var(--background);
          color: var(--darktext);
          padding-bottom: 5em;
      }
  `;

export default GlobalStyle;
