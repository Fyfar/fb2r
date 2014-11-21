
var size = localStorage.getItem('size');
var fontFamily = localStorage.getItem('fontFamily');
var color = localStorage.getItem('color');
var background = localStorage.getItem('background');



$('document').ready(function(){
	$('.example').css("font-size", localStorage.getItem('size'));
	$('.example').css("font-family", localStorage.getItem('fontFamily'));
	$('.example').css("color", localStorage.getItem('color'));
	$('.example').css("background", localStorage.getItem('background'));


	$(function() {
	    $("#font-sizeSelect").val(size);
	    $('#font-familySelect').val(fontFamily);
	    $('#colorSelect').val(color);
	    $('#backgroundSelect').val(background);
	});


	$("#font-sizeSelect").change(function() {
		setFontSize();
	});

	$("#font-familySelect").change(function() {
		setFontFamily();
	});

	$("#colorSelect").change(function() {
		setColor();
	});

	$("#backgroundSelect").change(function() {
		setBackground();
	});

	$('.apply').click(function() {
		applySettings();
	});

	
});

function setFontSize() {
	size = "";
	$( "#font-sizeSelect option:selected" ).each(function() {
		size += $(this).text();
	});
	$('.example').css("font-size", size);
	//localStorage.setItem('size', size);
}

function setFontFamily() {
	fontFamily = "";
	$("#font-familySelect option:selected").each(function() {
		fontFamily += $(this).text();
	});
	$('.example').css("font-family", fontFamily);
	//localStorage.setItem('fontFamily', fontFamily); 
}

function setColor() {
	color = "";
	color = $("#colorSelect").val();
	$('.example').css("color", color);
	//localStorage.setItem('color', color); 
}

function setBackground() {
	background = "";
	background = $('#backgroundSelect').val();
	$('.example').css("background-color", background);
	//localStorage.setItem('background', background);
}

function applySettings() {
	localStorage.setItem('size', size);
	localStorage.setItem('fontFamily', fontFamily); 
	localStorage.setItem('color', color);
	localStorage.setItem('background', background);
}