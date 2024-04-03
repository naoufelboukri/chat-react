const log = (message, type = undefined) => {
    switch (type) {
        case 'success':
            console.log("\x1b[32m", message);
            console.log("\x1b[37m", '');
            break;
        case 'error':
            console.error("\x1b[31m", message);
            console.log("\x1b[37m", '');
            process.exit(1);
            break;
        default:
            console.log(message);
    }
}

const generateTsx = (name, dto, style) => {
    const nameDTO = name+'DTO';
    let txtContent = "";
    if (style) {
        txtContent += `import './${name}.css';
`;
    }
    if (dto) {
        txtContent += `
interface ${nameDTO} {
    
}
`;
    }
    txtContent += `const ${name} = (${dto ? '{  }: '+ nameDTO : ''}) =>
    <div className="${name}">
        
    </div>

export default ${name};
`;

    return txtContent;
}

export { log, generateTsx };