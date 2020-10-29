import './style.css';

function component() {
    const element = document.createElement('div');

    element.innerHTML = ['Hello', 'webpack'].join(' ');

    document.body.style.backgroundImage = 'url(/static/img/icons/favicon.ico)';

    return element;
}

document.body.appendChild(component());