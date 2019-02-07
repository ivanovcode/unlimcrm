(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,255,255,0)","#3DFFFF","#50FFFF","rgba(255,255,255,0)"],[0,0.314,0.655,1],-76.7,-0.1,76.7,-0.1).s().p("Ar+OqIAA9TIX9AAIAAdTg");
	this.shape.setTransform(36.4,93.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(-40.3,0,153.5,187.6), null);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#5CFFFB","#4671E1"],[0.11,1],-35.1,0,35.1,0).s().p("AkGCsQhTgRgDhOQgPhJBlgnQEwgQEahuIAbgLIAADqQkRBvktAAIgngBg");
	this.shape.setTransform(202.3,340.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#4671E1","rgba(70,113,225,0)"],[0,0.824],-14.9,-9.7,15,-9.7).s().p("AiVllQAAh5APh0IAtAAQgTCEAACMQAAIAECGEIgjARQkImqAAoOg");
	this.shape_1.setTransform(15,210.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4671E1").s().p("AJsXZQEJhuC9izQDGi+BHhuQEGk6AjpxQAip0nxoEQnyoGq9AHQq+AInuIAQkhErh4FsQgOArgLArQgaBfgPBkIgtAAQAMhkAXhfQALgrAMgrQB5mPE9k9QH/oALTAAQLSAAH9IBQH8H/AILoQAHLpoSIaQkVEak/CCg");
	this.shape_2.setTransform(175.4,173.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,349.3,357.4), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#5CFFFB","rgba(70,113,225,0)"],[0.11,1],0,0,0,0,0,34.6).s().p("AjyDyQhjhkgBiOQABiNBjhlQBlhjCNgBQCOABBkBjQBlBlgBCNQABCOhlBkQhkBliOgBQiNABhlhlg");
	this.shape.setTransform(34.3,34.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,68.5,68.5), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol2();
	this.instance.parent = this;
	this.instance.setTransform(34.3,34.3,1,1,0,0,0,34.3,34.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0.52},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,68.5,68.5);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AyfSgQnqnrAAq1QAAq0HqnrQHsnqK0AAQK0AAHqHqQHrHrAAK0QAAK1nrHrQnqHqq0AAQq0AAnsnqg");
	mask.setTransform(172.2,172);

	// Layer 5 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AAOb7QhTgSgChOIAAAAQgQhIBlgpIAAAAQEwgPEbhvIAAAAIAbgKIAAAAIAADqQkRBvkvAAIAAAAIgmAAgAJ0WiQEJhuC9i0IAAAAQDGi9BGhuIAAAAQEHk6AipyIAAAAQAjpznyoFIAAAAQnxoFq9AHIAAAAQq/AInuH/IAAAAQkhErh4FtIAAAAQgNAqgMArIAAAAQgaBfgOBkIAAAAIguAAQANhkAXhfIAAAAQAKgrANgqIAAAAQB4mPE9k+IAAAAQIAn/LTAAIAAAAQLSAAH8IAIAAAAQH8IAAILpIAAAAQAILooSIaIAAAAQkWEak+CBIAAAAgA7RgpQAAh5AOh0IAAAAIAuAAQgUCEAACMIAAAAQAAIAEDGEIAAAAIgiARIAAAAQkJmqAAoOg");
	mask_1.setTransform(174.6,178.7);

	// Layer 4
	this.instance = new lib.Symbol6();
	this.instance.parent = this;
	this.instance.setTransform(167.3,170.5,1,1,22.2,0,0,42.7,-113.9);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:382.2},14).wait(1));

	// Layer 1
	this.instance_1 = new lib.Symbol5();
	this.instance_1.parent = this;
	this.instance_1.setTransform(174.6,178.7,1,1,0,0,0,174.6,178.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(15));

	// Layer 2
	this.instance_2 = new lib.Symbol4();
	this.instance_2.parent = this;
	this.instance_2.setTransform(139.1,312.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,349.3,381);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol3();
	this.instance.parent = this;
	this.instance.setTransform(49.7,48.6,0.278,0.278,-90,0,0,174.7,178.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(52));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,132.4,103.7);


// stage content:
(lib.pre = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol1();
	this.instance.parent = this;
	this.instance.setTransform(64.1,63.9,1,1,0,0,0,47.9,49.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:360},29).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(80.2,78.8,132.4,103.7);
// library properties:
lib.properties = {
	width: 128,
	height: 128,
	fps: 34,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;