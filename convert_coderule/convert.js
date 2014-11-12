var csv = require('csv');
var S = require('string');

var header = true;
var gsz = 0;

/***************************
GET THE COMMAND LINE VARS
****************************/
/* get the training file name from command line */
var infile = process.argv[2];

function cleanText (text)
{	
	text = S(text).stripTags().s;
 	text = text.toLowerCase(text);
 	text = S(text).replaceAll(',', ' ').s;
 	text.replace(/\s+/g, ' ');
 	return text;
}

console.log('label,title,short_desc,long_desc,org1,org2,code_rule');
console.log('feature_type,text,text,text,text,text,text');
csv().from.path(infile, { columns: true, delimiter: "," } )

// on each record, populate the map and check the codes
.on('record', function (data, index) 
{
	act_code ='';
	title ='';
	short_desc='';
	long_desc='';
	code_rule='';
	org1='';
	org2='';
	
	if (header)
    {
 		header = false;	
 	}
 	else
 	{
 		for (key in data)
		{
			data[key] = data[key].trim();
			if (key == 'ad_act_codes')
			{
				act_code = data[key];    
				var arr = act_code.split("|");
				arr = arr.sort();
				act_code = arr[0];
				for (var g = 1; g < arr.length; g++)
				{
					act_code += "|"+arr[g];
				}
			}
			if (key == 'title') 
			{
				title = cleanText(data[key]);
			}
			if (key == 'short_desc')
			{
				short_desc = cleanText(data[key]);
			}
			if (key == 'long_desc')
			{
				long_desc = cleanText(data[key]);
			}
			if (key == 'org1')
			{
				org1 = cleanText(data[key]);
			}
			if (key == 'org2')
			{
				org2 = cleanText(data[key]);
			}	  
		}
		
		code_rule = cleanText(title+" "+short_desc+" "+long_desc);
		
		if (act_code >'')
		{
			console.log('"'+act_code+'","'+title+'","'+short_desc+'","'+long_desc+'","'+org1+'","'+org2+'","'+code_rule+'"');
		}
 	}
 });




