import request from 'superagent';

export default function diRegister(container) {
    container.registerInstance(request, request);
}

