import themeLight from './themeLight';
import themeDark from './themeDark';

const themes ={
    themeDark,
    themeLight
}

export default function getTheme(theme){
    return themes[theme]
}