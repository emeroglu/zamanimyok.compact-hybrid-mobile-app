String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.capitalize = function() {

    var initial = this.charAt(0).toUpperCase();
    var rest = this.slice(1);
    var restLower = "";

    for (var i = 0; i < rest.length; i++) {
        restLower += rest[i].toLowerCase();
    }

    return initial + restLower;

};

String.prototype.toCamelCase = function() {

    var s = this, result = this;

    if (s.indexOf("-") != -1) {
        var parts = s.split("-");            
        result = parts[0].capitalize() + parts[1].capitalize();
    }

    return result.charAt(0).toLowerCase() + result.slice(1);

};