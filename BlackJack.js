(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var pixi_plugins_app_Application = function() {
	this._animationFrameId = null;
	this.pixelRatio = 1;
	this.autoResize = true;
	this.transparent = false;
	this.antialias = false;
	this.forceFXAA = false;
	this.roundPixels = false;
	this.legacy = false;
	this.clearBeforeRender = true;
	this.preserveDrawingBuffer = false;
	this.backgroundColor = 16777215;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.position = "static";
};
pixi_plugins_app_Application.__name__ = true;
pixi_plugins_app_Application.prototype = {
	start: function(rendererType,parentDom,canvasElement) {
		if(rendererType == null) rendererType = "auto";
		if(canvasElement == null) {
			var _this = window.document;
			this.canvas = _this.createElement("canvas");
			this.canvas.style.width = this.width + "px";
			this.canvas.style.height = this.height + "px";
			this.canvas.style.position = this.position;
		} else this.canvas = canvasElement;
		if(this.autoResize) window.onresize = $bind(this,this._onWindowResize);
		var renderingOptions = { };
		renderingOptions.width = this.width;
		renderingOptions.height = this.height;
		renderingOptions.view = this.canvas;
		renderingOptions.backgroundColor = this.backgroundColor;
		renderingOptions.resolution = this.pixelRatio;
		renderingOptions.antialias = this.antialias;
		renderingOptions.forceFXAA = this.forceFXAA;
		renderingOptions.autoResize = this.autoResize;
		renderingOptions.transparent = this.transparent;
		renderingOptions.clearBeforeRender = this.clearBeforeRender;
		renderingOptions.preserveDrawingBuffer = this.preserveDrawingBuffer;
		renderingOptions.roundPixels = this.roundPixels;
		renderingOptions.legacy = this.legacy;
		if(rendererType != null) switch(rendererType) {
		case "canvas":
			renderingOptions.noWebGL = true;
			this.app = new PIXI.Application(renderingOptions);
			break;
		default:
			this.app = new PIXI.Application(renderingOptions);
		} else this.app = new PIXI.Application(renderingOptions);
		this.stage = this.app.stage;
		this.renderer = this.app.renderer;
		if(parentDom == null) window.document.body.appendChild(this.app.view); else parentDom.appendChild(this.app.view);
		this.app.ticker.add($bind(this,this._onRequestAnimationFrame));
	}
	,_onWindowResize: function(event) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.app.renderer.resize(this.width,this.height);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(this.onResize != null) this.onResize();
	}
	,_onRequestAnimationFrame: function() {
		if(this.onUpdate != null) this.onUpdate(this.app.ticker.deltaTime);
	}
};
var Main = function() {
	pixi_plugins_app_Application.call(this);
	this.position = "relative";
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.backgroundColor = 26214;
	this.transparent = true;
	this.antialias = false;
	pixi_plugins_app_Application.prototype.start.call(this);
	var gameModel = new model_GameModel();
	var view1 = new view_GameView(this.width,this.height,gameModel);
	this.stage.addChild(view1);
	gameModel.subscribe(view1);
	gameModel.start();
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.__super__ = pixi_plugins_app_Application;
Main.prototype = $extend(pixi_plugins_app_Application.prototype,{
});
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std["int"] = function(x) {
	return x | 0;
};
var Type = function() { };
Type.__name__ = true;
Type.allEnums = function(e) {
	return e.__empty_constructs__;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var model_Card = function(suit,rank) {
	this.suit = suit;
	this.rank = rank;
};
model_Card.__name__ = true;
model_Card.prototype = {
	dispose: function() {
		this.suit = null;
		this.rank = null;
	}
	,getValue: function() {
		var _g = this.rank;
		switch(_g[1]) {
		case 12:
			return 11;
		case 0:
			return 2;
		case 1:
			return 3;
		case 2:
			return 4;
		case 3:
			return 5;
		case 4:
			return 6;
		case 5:
			return 7;
		case 6:
			return 8;
		case 7:
			return 9;
		case 8:
			return 10;
		case 9:case 10:case 11:
			return 10;
		}
	}
};
var model_GameModel = function() {
	this.heroDD = false;
	this.currentHeroBet = 0;
	this.defaultBetModifier = 50;
	this.defaultStack = 100;
	this.heroHit = false;
	this.boardDeck = this.initBoardDeck();
	this.drawDeck = [];
	this.dealer = new model_Player(this.initHand(this.boardDeck),this.defaultStack);
	this.hero = new model_Player(this.initHand(this.boardDeck),this.defaultStack);
	this.emitter = new PIXI.utils.EventEmitter();
};
model_GameModel.__name__ = true;
model_GameModel.prototype = {
	subscribe: function(emmiter) {
		emmiter.on("HitButtonClicked",$bind(this,this.handleHit));
		emmiter.on("doubleBetButtonClicked",$bind(this,this.handledoubleBet));
		emmiter.on("StandButtonClicked",$bind(this,this.handleStand));
		emmiter.on("RestartButtonClicked",$bind(this,this.handleRestart));
		emmiter.on("EndPhaseAnimationEnd",$bind(this,this.handlePhaseAnimationEnd));
	}
	,start: function() {
		this.emitter.emit("GameStarted");
		this.emitter.emit("CardsDealt",this.hero.hand,this.dealer.hand);
		this.currentHeroBet = this.hero.stack / this.defaultBetModifier | 0;
		this.hero.stack -= this.currentHeroBet;
		this.emitter.emit("UpdatePoints",this.calculateHandValue(this.hero.hand),this.calculateHandValue(this.dealer.hand));
		this.emitter.emit("UpdateStackBet",this.hero.stack,this.currentHeroBet);
	}
	,initBoardDeck: function() {
		var deckToReturn = [];
		var _g = 0;
		var _g1 = Type.allEnums(model_Suit);
		while(_g < _g1.length) {
			var suit = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = Type.allEnums(model_Rank);
			while(_g2 < _g3.length) {
				var rank = _g3[_g2];
				++_g2;
				deckToReturn.push(new model_Card(suit,rank));
			}
		}
		return deckToReturn;
	}
	,initHand: function(deck) {
		var handToReturn = [];
		var _g = 0;
		while(_g < 2) {
			var i = _g++;
			handToReturn.push(this.getCardFromBoardDeck(deck));
		}
		return handToReturn;
	}
	,getCardFromBoardDeck: function(deck) {
		var rand = Std["int"](Math.random() * deck.length - 1);
		var cardToReturn = deck[rand];
		HxOverrides.remove(deck,deck[rand]);
		return cardToReturn;
	}
	,calculateHandValue: function(hand) {
		var handValue = 0;
		var _g = 0;
		while(_g < hand.length) {
			var card = hand[_g];
			++_g;
			if(handValue < 21) handValue += card.getValue(); else if(card.rank == model_Rank.Ace) handValue += 1;
		}
		return handValue;
	}
	,hitCard: function(player,boardDeck) {
		var card = this.getCardFromBoardDeck(boardDeck);
		player.addCard(card);
		var heroHandValue = this.calculateHandValue(this.hero.hand);
		var dealerHandValue = this.calculateHandValue(this.dealer.hand);
		this.emitter.emit("HeroCardHit",card,player.hand);
		if(heroHandValue <= 21) this.emitter.emit("UpdatePoints",heroHandValue,dealerHandValue); else if(heroHandValue == 21) this.emitter.emit("EndHeroTurn"); else {
			this.emitter.emit("UpdatePoints",heroHandValue,dealerHandValue);
			this.emitter.emit("HeroBusted");
		}
	}
	,hitDealerCard: function(player,boardDeck) {
		var card = this.getCardFromBoardDeck(boardDeck);
		player.addCard(card);
		var heroHandValue = this.calculateHandValue(this.hero.hand);
		var dealerHandValue = this.calculateHandValue(this.dealer.hand);
		this.emitter.emit("DealerCardHit",card,player.hand);
		this.emitter.emit("UpdatePoints",heroHandValue,dealerHandValue);
	}
	,doubleBet: function() {
		if(this.hero.stack > this.currentHeroBet) {
			this.currentHeroBet *= 2;
			this.hero.stack -= this.currentHeroBet / 2 | 0;
		} else {
			this.currentHeroBet = this.currentHeroBet + this.hero.stack;
			this.hero.stack = 0;
		}
		this.emitter.emit("UpdateStackBet",this.hero.stack,this.currentHeroBet);
	}
	,stand: function() {
		this.emitter.emit("EndHeroTurn");
		this.emitter.emit("DealerShowDown");
		while(this.calculateHandValue(this.dealer.hand) < 17) this.hitDealerCard(this.dealer,this.boardDeck);
		var dealerHandValue = this.calculateHandValue(this.dealer.hand);
		var heroHandValue = this.calculateHandValue(this.hero.hand);
		if(dealerHandValue > 21) {
			this.emitter.emit("DealerBusted");
			this.hero.stack += this.currentHeroBet * 2;
			this.emitter.emit("UpdateStackBet",this.hero.stack,0);
		} else if(dealerHandValue == heroHandValue) {
			this.emitter.emit("Draw");
			this.hero.stack += this.currentHeroBet;
			this.emitter.emit("UpdateStackBet",this.hero.stack,0);
		} else if(heroHandValue > dealerHandValue) {
			this.emitter.emit("HeroWin");
			this.hero.stack += this.currentHeroBet * 2;
			this.emitter.emit("UpdateStackBet",this.hero.stack,0);
		} else if(dealerHandValue > heroHandValue) this.emitter.emit("DealerWin");
	}
	,startNewRound: function() {
		this.resetRound();
		this.hero.setHand(this.initHand(this.boardDeck));
		this.dealer.setHand(this.initHand(this.boardDeck));
		this.start();
	}
	,resetRound: function() {
		var _g1 = 0;
		var _g = this.hero.hand.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.moveCardToDraw(this.hero.hand[i]);
		}
		this.hero.hand.splice(0,this.hero.hand.length);
		var _g11 = 0;
		var _g2 = this.dealer.hand.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.moveCardToDraw(this.dealer.hand[i1]);
		}
		this.dealer.hand.splice(0,this.dealer.hand.length);
	}
	,moveCardToDraw: function(card) {
		this.drawDeck.push(card);
	}
	,handleHit: function() {
		this.hitCard(this.hero,this.boardDeck);
	}
	,handledoubleBet: function() {
		this.doubleBet();
	}
	,handleStand: function() {
		this.stand();
	}
	,handlePhaseAnimationEnd: function() {
		if(this.boardDeck.length < 10 || this.hero.stack <= 0) this.restartGame(); else this.startNewRound();
	}
	,restartGame: function() {
		this.dispose();
		this.boardDeck = this.initBoardDeck();
		this.drawDeck = [];
		this.dealer = new model_Player(this.initHand(this.boardDeck),this.defaultStack);
		this.hero = new model_Player(this.initHand(this.boardDeck),this.defaultStack);
		this.emitter.emit("RestartGame");
	}
	,dispose: function() {
		this.hero.dispose();
		this.dealer.dispose();
		var _g1 = 0;
		var _g = this.boardDeck.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.boardDeck[i].dispose();
		}
		this.boardDeck.splice(0,this.boardDeck.length);
		this.boardDeck = null;
		var _g11 = 0;
		var _g2 = this.drawDeck.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.drawDeck[i1].dispose();
		}
		this.drawDeck.splice(0,this.drawDeck.length);
		this.drawDeck = null;
		this.currentHeroBet = 0;
		this.hero = null;
		this.dealer = null;
	}
	,handleRestart: function() {
		this.restartGame();
	}
};
var model_Player = function(hand,stack) {
	this.hand = hand;
	this.stack = stack;
};
model_Player.__name__ = true;
model_Player.prototype = {
	addCard: function(card) {
		this.hand.push(card);
	}
	,setHand: function(newHand) {
		var _g1 = 0;
		var _g = newHand.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.hand.push(newHand[i]);
		}
	}
	,dispose: function() {
		var _g1 = 0;
		var _g = this.hand.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.hand[i].dispose();
		}
		this.stack = 0;
		this.hand.splice(0,this.hand.length);
		this.hand = null;
	}
};
var model_Rank = { __ename__ : true, __constructs__ : ["Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King","Ace"] };
model_Rank.Two = ["Two",0];
model_Rank.Two.toString = $estr;
model_Rank.Two.__enum__ = model_Rank;
model_Rank.Three = ["Three",1];
model_Rank.Three.toString = $estr;
model_Rank.Three.__enum__ = model_Rank;
model_Rank.Four = ["Four",2];
model_Rank.Four.toString = $estr;
model_Rank.Four.__enum__ = model_Rank;
model_Rank.Five = ["Five",3];
model_Rank.Five.toString = $estr;
model_Rank.Five.__enum__ = model_Rank;
model_Rank.Six = ["Six",4];
model_Rank.Six.toString = $estr;
model_Rank.Six.__enum__ = model_Rank;
model_Rank.Seven = ["Seven",5];
model_Rank.Seven.toString = $estr;
model_Rank.Seven.__enum__ = model_Rank;
model_Rank.Eight = ["Eight",6];
model_Rank.Eight.toString = $estr;
model_Rank.Eight.__enum__ = model_Rank;
model_Rank.Nine = ["Nine",7];
model_Rank.Nine.toString = $estr;
model_Rank.Nine.__enum__ = model_Rank;
model_Rank.Ten = ["Ten",8];
model_Rank.Ten.toString = $estr;
model_Rank.Ten.__enum__ = model_Rank;
model_Rank.Jack = ["Jack",9];
model_Rank.Jack.toString = $estr;
model_Rank.Jack.__enum__ = model_Rank;
model_Rank.Queen = ["Queen",10];
model_Rank.Queen.toString = $estr;
model_Rank.Queen.__enum__ = model_Rank;
model_Rank.King = ["King",11];
model_Rank.King.toString = $estr;
model_Rank.King.__enum__ = model_Rank;
model_Rank.Ace = ["Ace",12];
model_Rank.Ace.toString = $estr;
model_Rank.Ace.__enum__ = model_Rank;
model_Rank.__empty_constructs__ = [model_Rank.Two,model_Rank.Three,model_Rank.Four,model_Rank.Five,model_Rank.Six,model_Rank.Seven,model_Rank.Eight,model_Rank.Nine,model_Rank.Ten,model_Rank.Jack,model_Rank.Queen,model_Rank.King,model_Rank.Ace];
var model_Suit = { __ename__ : true, __constructs__ : ["Diamonds","Hearts","Clubs","Spades"] };
model_Suit.Diamonds = ["Diamonds",0];
model_Suit.Diamonds.toString = $estr;
model_Suit.Diamonds.__enum__ = model_Suit;
model_Suit.Hearts = ["Hearts",1];
model_Suit.Hearts.toString = $estr;
model_Suit.Hearts.__enum__ = model_Suit;
model_Suit.Clubs = ["Clubs",2];
model_Suit.Clubs.toString = $estr;
model_Suit.Clubs.__enum__ = model_Suit;
model_Suit.Spades = ["Spades",3];
model_Suit.Spades.toString = $estr;
model_Suit.Spades.__enum__ = model_Suit;
model_Suit.__empty_constructs__ = [model_Suit.Diamonds,model_Suit.Hearts,model_Suit.Clubs,model_Suit.Spades];
var view_ButtonView = function(releasedTexture,pressedTexture,hoveredTexture,disabledTexture,text) {
	this.isEnabled = true;
	this.releasedTexture = releasedTexture;
	this.pressedTexture = pressedTexture;
	this.disabledTexture = disabledTexture;
	this.hoveredTexture = hoveredTexture;
	PIXI.Sprite.call(this,releasedTexture);
	this.interactive = true;
	this.anchor.set(0.5,0.5);
	this.on("mouseover",$bind(this,this._handleMouseOver));
	this.on("mouseout",$bind(this,this._handleMouseOut));
	this.on("mouseup",$bind(this,this._handleMouseUp));
	this.on("mousedown",$bind(this,this._handleMouseDown));
	var textStyle = { };
	textStyle.fill = 16777215;
	textStyle.fontSize = 28;
	textStyle.fontWeight = "bold";
	textStyle.fontFamily = "Courier";
	this.textField = new PIXI.Text(text,textStyle);
	this.textField.position.set((this.width - this.textField.width) / 2,(this.height - this.textField.height) / 2);
	this.addChild(this.textField);
};
view_ButtonView.__name__ = true;
view_ButtonView.__super__ = PIXI.Sprite;
view_ButtonView.prototype = $extend(PIXI.Sprite.prototype,{
	_handleMouseDown: function(target) {
		if(!this.isEnabled) return;
		this.texture = this.pressedTexture;
	}
	,_handleMouseOver: function(target) {
		if(!this.isEnabled) return;
		this.texture = this.hoveredTexture;
	}
	,_handleMouseOut: function(target) {
		if(!this.isEnabled) return;
		this.texture = this.releasedTexture;
	}
	,_handleMouseUp: function(target) {
		if(!this.isEnabled) return;
		this.texture = this.releasedTexture;
		this.emit("Clicked");
	}
	,setEnabled: function(isEnabled) {
		this.isEnabled = isEnabled;
		if(!isEnabled) this.texture = this.disabledTexture; else this.texture = this.releasedTexture;
	}
});
var view_CardView = function(card) {
	this.bg = PIXI.Texture.fromImage("assets/cards/back.png");
	PIXI.Sprite.call(this);
	if(card != null) this.set(card);
	this.backSprite = new PIXI.Sprite(this.bg);
	this.faceSprite = new PIXI.Sprite(this.face);
	this.addChild(this.faceSprite);
	this.addChild(this.backSprite);
	this.anchor.set(0.5,0.5);
	this.backSprite.anchor.set(0.5,0.5);
	this.faceSprite.anchor.set(0.5,0.5);
	this.faceSprite.scale.x = 0;
};
view_CardView.__name__ = true;
view_CardView.__super__ = PIXI.Sprite;
view_CardView.prototype = $extend(PIXI.Sprite.prototype,{
	set: function(card) {
		this.face = this.getCardFromAssets(card);
		this.faceSprite.texture = this.face;
	}
	,animateHideFace: function() {
		var _g = this;
		createjs.Tween.get(this.faceSprite.scale).to({ x : 0},250).call(function() {
			createjs.Tween.get(_g.backSprite.scale).to({ x : 1},250);
		});
	}
	,animateShowFace: function() {
		var _g = this;
		createjs.Tween.get(this.backSprite.scale).to({ x : 0},250).call(function() {
			createjs.Tween.get(_g.faceSprite.scale).to({ x : 1},250);
		});
	}
	,getCardFromAssets: function(card) {
		var suit;
		var _g = card.suit;
		switch(_g[1]) {
		case 2:
			suit = "clover";
			break;
		case 0:
			suit = "diam";
			break;
		case 3:
			suit = "pika";
			break;
		case 1:
			suit = "hearts";
			break;
		}
		var rank;
		var _g1 = card.rank;
		switch(_g1[1]) {
		case 0:
			rank = 0;
			break;
		case 1:
			rank = 1;
			break;
		case 2:
			rank = 2;
			break;
		case 3:
			rank = 3;
			break;
		case 4:
			rank = 4;
			break;
		case 5:
			rank = 5;
			break;
		case 6:
			rank = 6;
			break;
		case 7:
			rank = 7;
			break;
		case 8:
			rank = 8;
			break;
		case 9:
			rank = 9;
			break;
		case 10:
			rank = 10;
			break;
		case 11:
			rank = 11;
			break;
		case 12:
			rank = 12;
			break;
		}
		return PIXI.Texture.fromImage("assets/cards/" + suit + "_" + rank + ".png");
	}
});
var view_GameView = function(w,h,model) {
	this.heroCardPositions = new PIXI.Point(400,500);
	this.dealerCardPositions = new PIXI.Point(400,200);
	PIXI.Sprite.call(this);
	this.model = model;
	this.bg = new PIXI.Graphics();
	this.bg.beginFill(32832);
	this.bg.drawRect(0,0,w,h);
	this.bg.endFill();
	this.addChild(this.bg);
	var textStyle = { };
	textStyle.fill = 16777215;
	textStyle.fontSize = 28;
	textStyle.fontFamily = "Courier";
	textStyle.fontWeight = "bold";
	this.gameInfo = new PIXI.Text("Game started",textStyle);
	this.dealerPointsLabel = new PIXI.Text("Dealer Score",textStyle);
	this.dealerPointsValue = new PIXI.Text("0",textStyle);
	this.dealerPointsValue.visible = false;
	this.dealerPointsLabel.position.set(5,50);
	this.dealerPointsValue.position.set(this.dealerPointsLabel.x + this.dealerPointsLabel.width + 10,this.dealerPointsLabel.y);
	this.heroPointsLabel = new PIXI.Text("Your Score",textStyle);
	this.heroPointsValue = new PIXI.Text("0",textStyle);
	this.heroPointsLabel.position.set(this.dealerPointsLabel.x,this.dealerPointsLabel.y + this.dealerPointsLabel.height + 280);
	this.heroPointsValue.position.set(this.heroPointsLabel.x + this.heroPointsLabel.width + 10,this.heroPointsLabel.y);
	this.heroStackLabel = new PIXI.Text("Your stack",textStyle);
	this.heroStackValue = new PIXI.Text("0",textStyle);
	this.heroStackLabel.position.set(this.dealerPointsLabel.x,this.heroPointsLabel.y + this.heroPointsLabel.height + 10);
	this.heroStackValue.position.set(this.heroStackLabel.x + this.heroStackLabel.width + 10,this.heroStackLabel.y);
	this.heroBetLabel = new PIXI.Text("Your bet",textStyle);
	this.heroBetValue = new PIXI.Text("0",textStyle);
	this.heroBetLabel.position.set(this.dealerPointsLabel.x,this.heroStackLabel.y + this.heroStackLabel.height + 10);
	this.heroBetValue.position.set(this.heroBetLabel.x + this.heroBetLabel.width + 10,this.heroBetLabel.y);
	this.gameInfo.position.set(this.dealerPointsValue.x + this.dealerPointsValue.width + 150,10);
	this.bg.addChild(this.dealerPointsLabel);
	this.bg.addChild(this.dealerPointsValue);
	this.bg.addChild(this.heroPointsLabel);
	this.bg.addChild(this.heroPointsValue);
	this.bg.addChild(this.heroStackLabel);
	this.bg.addChild(this.heroStackValue);
	this.bg.addChild(this.heroBetLabel);
	this.bg.addChild(this.heroBetValue);
	this.bg.addChild(this.gameInfo);
	this.hitButton = new view_ButtonView(PIXI.Texture.fromImage("assets/buttons/btn_ingame_blue_release.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_blue_press.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_blue_over.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_blue_press_disabled.png"),"Hit");
	this.doubleBetButton = new view_ButtonView(PIXI.Texture.fromImage("assets/buttons/btn_ingame_green_release.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_green_press.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_green_over.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_green_press_disabled.png"),"Double\n Bet");
	this.standButton = new view_ButtonView(PIXI.Texture.fromImage("assets/buttons/btn_ingame_red_release.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_red_press.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_red_over.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_red_press_disabled.png"),"Stand");
	this.restartButton = new view_ButtonView(PIXI.Texture.fromImage("assets/buttons/btn_ingame_yellow_release.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_yellow_press.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_yellow_over.png"),PIXI.Texture.fromImage("assets/buttons/btn_ingame_yellow_press_disabled.png"),"Restart");
	this.hitButton.position.set(250,750);
	this.doubleBetButton.position.set(450,this.hitButton.y);
	this.standButton.position.set(650,this.hitButton.y);
	this.restartButton.position.set(w - 100,50);
	this.bg.addChild(this.hitButton);
	this.bg.addChild(this.doubleBetButton);
	this.bg.addChild(this.standButton);
	this.bg.addChild(this.restartButton);
	this.subscibeButtons();
	this.heroHand = [];
	this.dealerHand = [];
	this.initBoardDecks(w,h);
	this.initCards();
	model.emitter.on("GameStarted",$bind(this,this.handleGameStart));
	model.emitter.on("CardsDealt",$bind(this,this.handleCardsDealt));
	model.emitter.on("UpdateStackBet",$bind(this,this.handleUpdateStackBet));
	model.emitter.on("HeroCardHit",$bind(this,this.handleHeroCardHit));
	model.emitter.on("DealerCardHit",$bind(this,this.handleDealerCardHit));
	model.emitter.on("UpdatePoints",$bind(this,this.handleUpdatePoints));
	model.emitter.on("EndHeroTurn",$bind(this,this.handleEndHeroTurn));
	model.emitter.on("HeroBusted",$bind(this,this.handleHeroBusted));
	model.emitter.on("DealerShowDown",$bind(this,this.handleDealerShowdown));
	model.emitter.on("DealerBusted",$bind(this,this.handleDealerBusted));
	model.emitter.on("HeroWin",$bind(this,this.handleHeroWin));
	model.emitter.on("DealerWin",$bind(this,this.handleDealerWin));
	model.emitter.on("Draw",$bind(this,this.handleDraw));
	model.emitter.on("RestartGame",$bind(this,this.handleRestartGame));
};
view_GameView.__name__ = true;
view_GameView.__super__ = PIXI.Sprite;
view_GameView.prototype = $extend(PIXI.Sprite.prototype,{
	subscibeButtons: function() {
		this.hitButton.on("Clicked",$bind(this,this.handleHitButtonClicked));
		this.doubleBetButton.on("Clicked",$bind(this,this.handledoubleBetButton));
		this.standButton.on("Clicked",$bind(this,this.handleStandButton));
		this.restartButton.on("Clicked",$bind(this,this.handleRestartButton));
	}
	,initBoardDecks: function(w,h) {
		this.boardDeck = [];
		var _g = 0;
		while(_g < 2) {
			var i = _g++;
			var cardView = new view_CardView();
			this.bg.addChild(cardView);
			cardView.position.set(w - 300 + i * 20,200 + i * 20);
			this.boardDeck.push(cardView);
		}
		this.drawDeck = [];
		var _g1 = 0;
		while(_g1 < 2) {
			var i1 = _g1++;
			var cardView1 = new view_CardView();
			this.bg.addChild(cardView1);
			cardView1.position.set(w - 300 + i1 * 20,600 + i1 * 20);
			this.drawDeck.push(cardView1);
		}
	}
	,initCards: function() {
		var _g = 0;
		while(_g < 6) {
			var i = _g++;
			var dealerCard = new view_CardView();
			this.bg.addChild(dealerCard);
			dealerCard.position.set(this.boardDeck[1].x,this.boardDeck[1].y);
			dealerCard.visible = false;
			this.dealerHand.push(dealerCard);
		}
		var _g1 = 0;
		while(_g1 < 6) {
			var i1 = _g1++;
			var heroCard = new view_CardView();
			this.bg.addChild(heroCard);
			heroCard.position.set(this.boardDeck[1].x,this.boardDeck[1].y);
			heroCard.visible = false;
			this.heroHand.push(heroCard);
		}
	}
	,handleGameStart: function() {
		this.hitButton.setEnabled(true);
		this.doubleBetButton.setEnabled(true);
		this.standButton.setEnabled(true);
		this.gameInfo.text = "Make turn";
	}
	,handleDealerShowdown: function() {
		var _g1 = 0;
		var _g = this.dealerHand.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.dealerHand[i].animateShowFace();
		}
		this.dealerPointsValue.visible = true;
	}
	,handleUpdateStackBet: function(stack,bet) {
		if(stack == null) this.heroStackValue.text = "null"; else this.heroStackValue.text = "" + stack;
		if(bet == null) this.heroBetValue.text = "null"; else this.heroBetValue.text = "" + bet;
	}
	,handleUpdatePoints: function(heroPoints,dealerPoints) {
		if(heroPoints == null) this.heroPointsValue.text = "null"; else this.heroPointsValue.text = "" + heroPoints;
		if(dealerPoints == null) this.dealerPointsValue.text = "null"; else this.dealerPointsValue.text = "" + dealerPoints;
	}
	,handleEndHeroTurn: function() {
		this.hitButton.setEnabled(false);
		this.doubleBetButton.setEnabled(false);
		this.standButton.setEnabled(false);
	}
	,handleHeroBusted: function() {
		this.hitButton.setEnabled(false);
		this.doubleBetButton.setEnabled(false);
		this.standButton.setEnabled(false);
		this.gameInfo.text = "You busted";
		haxe_Timer.delay($bind(this,this.playPhaseEndAnimation),3000);
	}
	,handleDealerBusted: function() {
		this.gameInfo.text = "dealer busted";
		haxe_Timer.delay($bind(this,this.playPhaseEndAnimation),3000);
	}
	,handleHeroWin: function() {
		this.gameInfo.text = "you won";
		haxe_Timer.delay($bind(this,this.playPhaseEndAnimation),3000);
	}
	,handleDraw: function() {
		this.gameInfo.text = "draw, your bet is returned";
		haxe_Timer.delay($bind(this,this.playPhaseEndAnimation),3000);
	}
	,handleDealerWin: function() {
		this.gameInfo.text = "dealer won";
		haxe_Timer.delay($bind(this,this.playPhaseEndAnimation),3000);
	}
	,playPhaseEndAnimation: function() {
		var _g = this;
		var _g1 = 0;
		var _g2 = this.dealerHand.length;
		while(_g1 < _g2) {
			var i = _g1++;
			this.playMoveCardToDraw(this.dealerHand[i]);
			this.dealerHand[i].animateHideFace();
		}
		var _g11 = 0;
		var _g3 = this.heroHand.length;
		while(_g11 < _g3) {
			var i1 = _g11++;
			this.playMoveCardToDraw(this.heroHand[i1]);
			this.heroHand[i1].animateHideFace();
		}
		haxe_Timer.delay(function() {
			var _g21 = 0;
			var _g12 = _g.dealerHand.length;
			while(_g21 < _g12) {
				var i2 = _g21++;
				_g.dealerHand[i2].position.set(_g.boardDeck[1].x,_g.boardDeck[1].y);
			}
			var _g22 = 0;
			var _g13 = _g.heroHand.length;
			while(_g22 < _g13) {
				var i3 = _g22++;
				_g.heroHand[i3].position.set(_g.boardDeck[1].x,_g.boardDeck[1].y);
			}
			_g.dealerPointsValue.visible = false;
			_g.emit("EndPhaseAnimationEnd");
		},3000);
	}
	,handleCardsDealt: function(heroCards,dealerCards) {
		var _g1 = 0;
		var _g = dealerCards.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.dealerHand[i].set(dealerCards[i]);
			this.dealerHand[i].visible = true;
			this.playDealDealerCardAnimation(this.dealerHand[i],i,false);
		}
		var _g11 = 0;
		var _g2 = heroCards.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.heroHand[i1].set(heroCards[i1]);
			this.heroHand[i1].visible = true;
			this.playDealHeroCardAnimation(this.heroHand[i1],i1,true);
		}
	}
	,playDealHeroCardAnimation: function(cardView,position,isVisible) {
		createjs.Tween.get(cardView).to({ x : this.heroCardPositions.x + position * 221, y : this.heroCardPositions.y},500).call(function() {
			if(isVisible) cardView.animateShowFace();
		});
	}
	,playDealDealerCardAnimation: function(cardView,position,isVisible) {
		createjs.Tween.get(cardView).to({ x : this.dealerCardPositions.x + position * 221, y : this.dealerCardPositions.y},500).call(function() {
			if(isVisible) cardView.animateShowFace();
		});
	}
	,playMoveCardToDraw: function(cardView) {
		createjs.Tween.get(cardView).to({ x : this.drawDeck[1].x, y : this.drawDeck[1].y},500);
	}
	,handleHeroCardHit: function(card,hand) {
		this.doubleBetButton.setEnabled(false);
		this.heroHand[hand.length - 1].set(card);
		this.heroHand[hand.length - 1].visible = true;
		this.playDealHeroCardAnimation(this.heroHand[hand.length - 1],hand.length - 1,true);
	}
	,handleDealerCardHit: function(card,hand) {
		this.dealerHand[hand.length - 1].set(card);
		this.dealerHand[hand.length - 1].visible = true;
		this.playDealDealerCardAnimation(this.dealerHand[hand.length - 1],hand.length - 1,true);
	}
	,startGame: function() {
	}
	,handleRestartGame: function() {
		this.playPhaseEndAnimation();
	}
	,handleHitButtonClicked: function() {
		this.emit("HitButtonClicked");
	}
	,handledoubleBetButton: function() {
		this.emit("doubleBetButtonClicked");
	}
	,handleStandButton: function() {
		this.emit("StandButtonClicked");
	}
	,handleRestartButton: function() {
		this.emit("RestartButtonClicked");
	}
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = true;
Array.__name__ = true;
view_CardView.bgTexturePath = "assets/cards/back.png";
view_CardView.cardShowdownTime = 250;
view_GameView.dealCardTime = 500;
view_GameView.endPhaseDelay = 3000;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=BlackJack.js.map