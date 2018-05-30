onmessage = function (e) {
    postMessage(deal(e.data));
    // close(); // 结束此worker 很少用
}
function deal(data) {
    return data * data;
}