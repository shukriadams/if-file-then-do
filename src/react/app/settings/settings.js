const body = document.querySelector('body'),
    protocol = body.getAttribute('data-protocol') || 'http',
    host = body.getAttribute('data-host') || 'localhost',
    port = body.getAttribute('data-port') || '3000'
    
export default {
    protocol,
    host,
    port
}