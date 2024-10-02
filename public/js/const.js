class Const {
    static get APP_NAME() {return "Google Calendar Extended";}
    static get GOOGLE_KEY() {return "AIzaSyAzl_5-yQOIDNTpnVV9LOJqUBRI08FrQMM";}
    static get FIRST_YEAR() {return 2010;}    
    static get LAST_YEAR() {return new Date().getFullYear();}
    static get BANDS() {return [
        //{"name":"Fanfare", "calId":"to11pvq2q69m27am45fjggvkpk%40group.calendar.google.com", "slug":"fanfare"}
        {"name":"Fanfare", "calId":"tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com", "slug":"fanfare"}        
    ];}
}

/*
	'MEG' => array('Quatuor Megamix', 'qu3d1n9ktv8he8ifhi38meshbs'),
	'YGR' => array('Ygranka', 'iv7f0t02duq7btl9ireb37thic'),
	'CHO' => array('Choro de Aksak', 'fkspp43nuq3u2i6cimqrktag4k'),
	'FAN' => array('La Fanfare Saugrenue', 'to11pvq2q69m27am45fjggvkpk'),
	'BALO' => array('Le Bal`O`phonic Orchestra', 'gbdijqokvipeuv44rc1uujamjo'),
	'BAL' => array('Le Balluche de la Saugrenue', 'je0pf3nio1rqfb7dl8j71l9aco'),
*/
//class both for Node and Front
if (typeof module != "undefined") {
    module.exports = Const;
}
