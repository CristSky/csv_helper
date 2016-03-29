var tr = document.querySelectorAll('tr');
var csv = '';
var download_filename = '';
var sms_ura = param1;
var name;
var phone;
var cut_name_size = 9;
// DATA
var today = new Date();
var hr = today.getHours();
var min = today.getMinutes();
var dd = today.getDate();
var mm = ('00' + (today.getMonth() + 1)).slice(-2); //January is 0!
var yyyy = today.getFullYear();
var date_str = '' + dd + '.' + mm + '.' + yyyy + '_' + hr + 'h' + min;
var seen = {};


var config = function (e) {
    if (e) {
        csv = "Nome;Celular\n";
        download_filename = "lista_SMS_" + date_str + ".csv";
    }
    else {
        download_filename = "lista_URA_" + date_str + ".csv";
    }
};

config(sms_ura);

var black_list = ['4196935004', '4130198830', '1434132315', '1434546296', '14981157548', '1434710548', '14998382396', '1434132315', '1438813739',
    '1134043077', '5191268445', '75982852020', '21999871775', '4732321618', '4788058877', '21988383179', '21998022927', '5532211220', '15991458802',
    '11999352870', '11980355327', '11953452209', '11998681495', '6192978042', '5499044720', '5496777012', '21982078818', '11954249466', '11964066754',
    '11996200910', '13991508937', '11974754291', '1333611011', '2835223761', '7133799532', '11974221276', '19992264071', '71991964772', '1125980241',
    '13997236440', '2132346981', '1125580786', '11997526135', '2730650135', '4430257652', '6232738017', '7140092330', '11987520646', '71991363808', '71999293862',
    '19996749873'];

function download(text, name, type) {
    seen = {};
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}


for (var i = 2; tr.length - 1 > i; i++) {
    phone = tr[i].querySelectorAll('td')[5].innerText.replace(/\D+/g, "");
    //doc = tr[i].querySelectorAll('td')[1].innerText;
    if (phone.length > 8 && black_list.indexOf(phone) < 0 && (seen.hasOwnProperty(phone) ? false : (seen[phone] = true))) {
        if (sms_ura)
            name = tr[i].querySelectorAll('td')[4].innerText.substring(0, cut_name_size);
        else
            name = tr[i].querySelectorAll('td')[4].innerText;

        //line += name + '\t' + phone + '\n';
        if (sms_ura)
            csv += name + ';' + phone + '\n';
        else
            csv += phone + ';' + name + '\n';
    }
}

download(csv, download_filename, 'csv');
