(function (w) {

    var utils = {
        strToObject: function (str) {
            var arr = str.split('&')
            var obj = {}
            for (var i = 0; i < arr.length; i++) {
                var arrs = arr[i].split('=')
                obj[arrs[0]] = arrs[1]
            }
            return obj
        }
    }
    w.utils = utils
})(window)