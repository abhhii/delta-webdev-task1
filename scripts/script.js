var div;
var arrmentees;
var rootlist;
var menteecount;
function init()//initilizes the page
{	
	if(!localStorage.getItem('menteearray') || localStorage.getItem('menteearray').length == 2)//since array can be []
	{
		//alert('nothing in Storage');
		arrmentees = new Array();
		rootlist = document.createElement('ul');
		document.body.appendChild(rootlist);
		menteecount = 0;	
	}
	else
	{
		//alert('Plenty in Storage');
		var temp = localStorage.getItem('menteearray');
		//alert(temp);
		arrmentees = JSON.parse(temp);
		//alert('see a sample'+arrmentees[0].mname);
		rootlist = document.createElement('ul');
		document.body.appendChild(rootlist);
		loadvalues();
	}
}

function addmentee()//adds new mentees box
{
	var i = arrmentees.length;
	arrmentees.push({});
	arrmentees[i].mname = prompt('Add mentee name');
	arrmentees[i].rating=prompt('Add mentee rating');
	arrmentees[i].remark=prompt('Add remark');
	createstructure(i);
	localStorage.removeItem('menteearray');
	localStorage.setItem('menteearray',JSON.stringify(arrmentees));			
}
	
function handleRatingEdit(i,type)//handles edit click on any button
{
	if(type==='field')
	{
		edittext=document.getElementById('rating'+i);
		mainbutton = document.getElementById('collapsible'+i);		
		editbutton=document.getElementById('editrating'+i);
				
		if(editbutton.childNodes[0].nodeValue==='edit')//if button shows edit
		{
			edittext.removeAttribute('disabled');
		
			editbutton.removeChild(editbutton.childNodes[0]);
			editbutton.appendChild(document.createTextNode('done'));
		}
		else{//if button shows done
			arrmentees[i].rating=edittext.value;
			edittext.setAttribute('disabled','true');
			editbutton.removeChild(editbutton.childNodes[0]);
		  	editbutton.appendChild(document.createTextNode('edit'));
		  	ratingcolor(i);
		  	mainbutton.childNodes[0].nodeValue=arrmentees[i].mname+' '+'Rating : '+ arrmentees[i].rating;
		  	localStorage.removeItem('menteearray');
			localStorage.setItem('menteearray',JSON.stringify(arrmentees));
		}
	}
	else if(type === 'name')//if name edit is clicked
	{
		mainbutton = document.getElementById('collapsible'+i);
		var nametext = document.getElementById('mname'+i);
		var a = prompt('Enter new name');
		arrmentees[i].mname = a;
		//alert('Type of nametext element is = '+nametext.constructor.name);
		nametext.textContent = a;
		mainbutton.childNodes[0].nodeValue=arrmentees[i].mname+' '+'Rating : '+ arrmentees[i].rating;
		localStorage.removeItem('menteearray');
		localStorage.setItem('menteearray',JSON.stringify(arrmentees));
	}
	
	else{
		editarea=document.getElementById('remark'+i);
		editbutton=document.getElementById('editremark'+i);
				
		if(editbutton.childNodes[0].nodeValue==='edit')
		{
			editarea.removeAttribute('disabled');
			editbutton.removeChild(editbutton.childNodes[0]);
			editbutton.appendChild(document.createTextNode('done'));
		}
		else{
			arrmentees[i].remark=editarea.value;
			editarea.setAttribute('disabled','true');
			editbutton.removeChild(editbutton.childNodes[0]);
			editbutton.appendChild(document.createTextNode('edit'));
			localStorage.removeItem('menteearray');
			localStorage.setItem('menteearray',JSON.stringify(arrmentees));
		}
	}
}
function menteedelete(i)//handles deletion
{
	arrmentees.splice(i);
	var todelete = document.getElementById('mn'+i);
	todelete.remove();
	localStorage.removeItem('menteearray');
	localStorage.setItem('menteearray',JSON.stringify(arrmentees));
}
function ratingcolor(i)//handles background color on rating change
{
	
	var r = arrmentees[i].rating;
	div = document.getElementById('mentee'+i);
	button = document.getElementById('collapsible'+i);
	if(r>=4.0){
		div.style.backgroundColor="#76FF03";
		button.style.backgroundColor="#76FF03";
	}
	else if(r<4.0 && r>=3.0){
		div.style.backgroundColor="#FFC107";
		button.style.backgroundColor="#FFC107";
	}
	else{
		div.style.backgroundColor="#D50000";
		button.style.backgroundColor="#D50000";
	}
}
function sortmentees()//sorts mentees in array on sort click
{
	var ratings = [];
	n = arrmentees.length;
	for (var j = 0; j<n;j++)
	{
		ratings.push(arrmentees[j].rating);
	}
	
	for (var i = 0; i < n-1; i++)
        {
            // Find the minimum element in unsorted array
            var max_idx = i;
            for (var k = i+1; k < n; k++)
                if (arrmentees[k].rating > arrmentees[max_idx].rating)
                    max_idx = k;
 
            // Swap the found minimum element with the first element
            temp1 = arrmentees[max_idx].mname;
            temp2 = arrmentees[max_idx].rating;
            temp3 = arrmentees[max_idx].remark;
            arrmentees[max_idx].mname = arrmentees[i].mname;
            arrmentees[max_idx].rating = arrmentees[i].rating;
            arrmentees[max_idx].remark = arrmentees[i].remark;
            arrmentees[i].mname = temp1;
            arrmentees[i].rating = temp2;
            arrmentees[i].remark = temp3;
        }
        //setvalues(); this was the function used before but omitted due to poor implementation
        localStorage.removeItem('menteearray');
        localStorage.setItem('menteearray',JSON.stringify(arrmentees));
        document.location.reload();
}

function loadvalues()//loads the page from localStorage
{
	var n = 0;
	//alert('see a sample in loadvalues()'+arrmentees[0].mname);
	while(typeof(arrmentees[n]) != 'undefined' || arrmentees[n].mname != null)
	{	n = n + 1;
		//alert('value of n='+n);
		if(arrmentees[n] == null)
			break;
	}
	menteecount = n ;
	for(var i = 0 ; i < n ; i++)
	{	createstructure(i);
		localStorage.setItem('menteearray',JSON.stringify(arrmentees));
	}
}

function createstructure(i)//creates the full structure of how the elements appear on the page
{
	x1=document.createElement('li');
	x1.id = 'mn'+i;
	mainbutton = document.createElement('button');
	mainbutton.setAttribute('class','collapsible');
	mainbutton.id='collapsible'+i;
	mainbutton.appendChild(document.createTextNode(arrmentees[i].mname+' '+'Rating : '+ arrmentees[i].rating));
	var r = arrmentees[i].rating;
	if(r>=4.0)
	{	mainbutton.style.backgroundColor="#76FF03";
	}
	else if(r<4.0 && r>=3.0)
	{	mainbutton.style.backgroundColor="#FFC107";
	}
	else
	{	mainbutton.style.backgroundColor="#D50000";
	}
	x1.appendChild(mainbutton);
	div = document.createElement('div');
	div.id='mentee'+i;
	div.setAttribute('class','content');
	div.style.display = 'none';
	div.style.overflow = 'hidden';									
	var menteename = document.createElement('p');
	menteename.id='mname'+i;
	menteename.innerHTML = arrmentees[i].mname;
	div.appendChild(menteename);
	var editname=document.createElement('button');
	editname.appendChild(document.createTextNode('edit'));
	editname.id='editname'+i;
	editname.setAttribute('class','editname');
	editname.addEventListener("click", function(event){
		event.preventDefault();
		handleRatingEdit(i,'name');
		});
	div.appendChild(editname);
		
	var delmentee=document.createElement('button');
	delmentee.appendChild(document.createTextNode('delete'));
	delmentee.id='delete'+i;
	delmentee.setAttribute('class','deletebutton');
				
	delmentee.addEventListener('click',function(event){
		event.preventDefault();
		menteedelete(i);
	});
	div.appendChild(delmentee);
	
	var sublist = document.createElement('ul');
	var sublistitem1 = document.createElement('li');
	var form1 = document.createElement('form');
	form1.setAttribute('action','index.html');
	form1.setAttribute('method','post');
	var div1 = document.createElement('div');
	var label1 = document.createElement('label');
	label1.setAttribute('for','rating');
	label1.innerHTML='Rating : ';
	var textfield = document.createElement('input');
	textfield.setAttribute('id','rating'+i);
	textfield.setAttribute('type','text');
	textfield.setAttribute('name','rating');
	textfield.setAttribute('value',arrmentees[i].rating)
		
	textfield.setAttribute('disabled','true');
	
	var edit1=document.createElement('button');
	edit1.appendChild(document.createTextNode('edit'));	
	edit1.id='editrating'+i;
	edit1.setAttribute('class','editrating');
	
	edit1.addEventListener("click", function(event){
		event.preventDefault();
		handleRatingEdit(i,'field');
	});
			
	div1.appendChild(label1);
	div1.appendChild(textfield);
	div1.appendChild(edit1);	
	form1.appendChild(div1);
	sublistitem1.appendChild(form1);
			
	sublist.appendChild(sublistitem1);
	var sublistitem2 = document.createElement('li');
	var form = document.createElement('form');
	form.setAttribute('action','index.html');
	form.setAttribute('method','post');
	var div2 = document.createElement('div');
	var label = document.createElement('label');
	label.setAttribute('for','remark');
	label.innerHTML='Remark : ';
	var textarea = document.createElement('textarea');
	textarea.setAttribute('id','remark'+i);
	textarea.setAttribute('name','remark');
	textarea.setAttribute('disabled','true');
	textarea.textContent = arrmentees[i].remark;
				
	var edit2=document.createElement('button');
	edit2.appendChild(document.createTextNode('edit'));	
	edit2.id='editremark'+i;
	edit2.setAttribute('class','editremark');
	edit2.addEventListener("click", function(event){
		event.preventDefault();
		handleRatingEdit(i,'area');
	});
	
	//eventlistner to handle collapse on focus out of div
	div.addEventListener('focusout',function(event){
		div.style.display = 'none';
		div.style.overflow = 'hidden';
	});		
				
	div2.appendChild(label);
	div2.appendChild(textarea);
	div2.appendChild(edit2);
	form.appendChild(div2);
	sublistitem2.appendChild(form);
			
	sublist.appendChild(sublistitem2);
	div.appendChild(sublist);

	if(arrmentees[i].rating>=4.0){
		div.style.backgroundColor="#76FF03";
	}	
	else if(arrmentees[i].rating<4.0 && arrmentees[i].rating>=3.0){
		div.style.backgroundColor="#FFC107";
	}	
	else{
		div.style.backgroundColor="#D50000";
	}
	div.style.border="thin solid #000000";
	div.style.margin="10px"; 
	x1.appendChild(div);	
	rootlist.appendChild(x1)
	collapsible(i);
	//rootlist.appendChild(div);
}
function collapsible(i)
{
	//alert('collapsible called');
	var coll = document.getElementById('collapsible'+i);
	coll.addEventListener("click", function() {
		var content = this.nextElementSibling;
		if (content.style.display === "block") 
		{	content.style.display = "none";
		}
		else 
		{	content.style.display = "block";
	    	}
	  });
//collapse on focus out(doesn't work properly)
//  	coll.addEventListener("focusout", function() {
//  		var content = this.nextElementSibling;
//		content.style.display = "none";
//});
}

//crappy implementation so not used. Reloading page seems better option	
function setvalues()//sets the values of various elements according to their corresponding value in array after sorting
{	
	var n = arrmentees.length;
	for(var i = 0 ; i< n; i++)
	{
		mname = document.getElementById('mname'+i);
		rate = document.getElementById('rating'+i);
		remark = document.getElementById('remark'+i);
		mname.innerText = arrmentees[i].mname;
		rate.value = arrmentees[i].rating;
		remark.value = arrmentees[i].remark;
		document.getElementById('collapsible'+i).childNodes[0].nodeValue=arrmentees[i].mname+' '+'Rating : '+arrmentees[i].rating;
		ratingcolor(i);		
	}
}
