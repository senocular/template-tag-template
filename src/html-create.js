export function html(strings, ...values) {
    const template = getTemplate(strings);
    return applyValues(template, values);
}

const stringsToTemplate = new Map();
function getTemplate(strings) {
    let template = stringsToTemplate.get(strings);
    if (!template) {
        template = document.createElement("template");
        template.innerHTML = strings.join("<slot></slot>");
        stringsToTemplate.set(strings, template);
    }
    return template;
}

function applyValues(template, values) {
    const content = template.content.cloneNode(true);
    const placeholders = content.querySelectorAll("slot");
    for (const [i, placeholder] of placeholders.entries()) {
        placeholder.replaceWith(values[i]);
    }
    return content;
}
