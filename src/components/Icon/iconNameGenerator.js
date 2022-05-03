const icomoonConfig = require('../../assets/fonts/iconConfig.json');

const iconNames = icomoonConfig.icons.map(icon => `"${icon.properties.name}"`).join(' |');
console.log(iconNames);
