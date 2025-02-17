export function html(strings, ...values) {
    return { strings, values };
}

export function render(container, templateResult) {
    const placeholders = getPlaceholders(container, templateResult.strings);
    update(placeholders, templateResult.values);
}

const containerToPlaceholders = new Map();
function getPlaceholders(container, strings) {
    let placeholders = containerToPlaceholders.get(container);
    if (!placeholders) {
        const template = getTemplate(strings);
        const content = template.content.cloneNode(true);
        container.replaceChildren(content);
        placeholders = container.querySelectorAll("slot");
        containerToPlaceholders.set(container, placeholders);
    }
    return placeholders;
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

function update(placeholders, values) {
    for (const [i, placeholder] of placeholders.entries()) {
        placeholder.replaceChildren(values[i]);
    }
}
