var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
	window.dealer_name = document.getElementsByTagName('p')[0].innerHTML;
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("bannerContainer");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("10C5075975BE412385410133FAF6EC54");
	var lib=comp.getLibrary();
	createjs.MotionGuidePlugin.install();
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
	var lib=comp.getLibrary();
	loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
	var images=comp.getImages();	
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}
function handleComplete(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	exportRoot = new lib._89616_Bobcat_2023_BrandBuilder_Turf_DisplayAds_300x250();
	stage = new lib.Stage(canvas);	
	mlad = {
		maxDuration: null,
		borderWidth: 1,
		authoringScale: 1,
		borderWidth: 1,
		borderColor: "#000000",
		defineCTA: function(){
			document.getElementById("bannerContainer").addEventListener("mouseover",function(){exportRoot.mc_cta.gotoAndPlay("hi");});
			document.getElementById("bannerContainer").addEventListener("mouseout",function(){exportRoot.mc_cta.gotoAndPlay("bye");});
		},
			updateBorder: function(){
			document.getElementById("border").style.border = mlad.borderColor + " solid " + mlad.borderWidth + "px";
		},
		defineDetails: function(){
			document.getElementById("detailsHitArea").setAttribute( "style",
				"height:"+ exportRoot.detailsHitArea.nominalBounds.height + "px;" +
				"width:"+ exportRoot.detailsHitArea.nominalBounds.width + "px;" +
				"left:"+ exportRoot.detailsHitArea.x/mlad.authoringScale + "px;" +
				"top:"+	exportRoot.detailsHitArea.y/mlad.authoringScale + "px;"
			);
			document.getElementById("detailsHitArea").addEventListener("mouseover",function(){exportRoot.details.gotoAndPlay("hi");});
			document.getElementById("detailsHitArea").addEventListener("mouseout",function(){exportRoot.details.gotoAndPlay("bye");});
		}
	};
	stage.update();
	var containerElements = document.querySelectorAll(".containers");
	for (var i = 0; i < containerElements.length; i++) {
		containerElements[i].setAttribute( "style",
			"height:" + "250"/mlad.authoringScale + "px;" +
			"width:"  + "300"/mlad.authoringScale + "px;"
		);
	}
	document.getElementById("border").style.border = mlad.borderColor + " solid " + mlad.borderWidth + "px";
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.framerate = lib.properties.fps;
		createjs.Ticker.addEventListener("tick", stage);
	}	    
	//Code to support hidpi screens and responsive scaling.
	AdobeAn.makeResponsive(false,'both',false,1,[canvas]);	
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}
