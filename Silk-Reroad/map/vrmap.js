function goinit() {
    var matsugaoka_latlng = [38.700076,139.885156];
    var baseLayer = {};
    var map_osm = new L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution : '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
	    , maxZoom: 20, maxNativeZoom: 18
	});
    baseLayer["OpenStreetMap"] = map_osm;
    var map_gsi = new L.tileLayer( 			// 国土地理院
	'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
	    attribution: "<a href='//www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
	    , maxZoom: 20, maxNativeZoom: 18
	});
    baseLayer["地理院地図"] = map_gsi;
    function putlog(msg, id = "ok") {
	var o = document.getElementById(id);
	if (o) o.innerHTML = msg;
    }
    var map = L.map("map").setView(matsugaoka_latlng, 15);
    map_osm.addTo(map);
    map_gsi.addTo(map);
    L.control.scale().addTo(map);
    var mapControl = L.control.layers(baseLayer, null).addTo(map);
    var watchTimer = null	// geolocation timer
    function clearWatch() {
	if (watchTimer) {
	    clearTimeout(watchTimer);
	    watchTimer = null;
	}
	watchID &&  navigator.geolocation.clearWatch(watchID);
	watchID = null;
    }
    function stopChase() {
	clearWatch();
	putlog("追跡終了", "info");
	startButton.removeAttribute("disabled");
    }
    function gotIt() {
	alart("yes")
	stopChase();
	var g = document.getElementById("get");
	if (g) {
	    // document.getElementById("map").style.visibility = "hidden";
	    document.getElementById("map").style.zIndex = 0;
	    // alert("みつかったー"+watchTimer);
	    g.style.display = "block";
	    g.style.width = 500;
	    g.style.height = "auto";
	    g.style.top = "20%";
	    g.style.right = "90%";
	    g.style.opacity = 0.8;
	    g.style.zIndex = 20;
	    g.style.transition = 10;
	}
	putlog(" 発見!", "rest");
	tgt && map.removeLayer(tgt);
	tgt = L.marker(targetLoc).addTo(map);
	tgt.bindPopup(foundMsg).openPopup();
	setTimeout(function() {
	    var g = document.getElementById("get");
	    // g.removeChild(g.childNodes[0]);
	    g.style.display = 'none';
	    putlog("", "rest");
	    tgt._popup.setContent("次の目標を見つけよう！");
	}, 10000);
    }
    function dispDistance() {
	//var d = getDistance(currentLoc, targetLoc);
	var d = currentLoc.distanceTo(targetLoc);
	d = Math.abs(Math.round(d-Math.min(curAccuracy, 10), 1));
	var msg = currentLoc+targetLoc;
	putlog(msg);
	putlog(" 目標まで あと"+ d +"m", "rest");
	putlog("Count: "+ ++repeatCount, "info");
	if (d < threshold) {
	    gotIt();
	}
    }
    var repeatCount = 0, repeatMax = 30;
    var currentLoc = matsugaoka_latlng;
    var curMarker, curCircle, curAccuracy;
    var curMarkerIcon = L.icon({
	iconUrl:	defIcon || "main.png",
	// iconSize:	[80, 120],
	iconAnchor:	[0, 00]
    });
    function mainMarker(pos) {
	return L.marker(pos, {icon: curMarkerIcon});
    }
    function onLocationFound(e) {
	curAccuracy = e.accuracy / 2;

	if (curMarker) map.removeLayer(curMarker);
	curMarker = mainMarker(e.latlng).addTo(map);
	curMarker.bindPopup("いまココ").openPopup();
	currentLoc = e.latlng;
	if (repeatCount%3 == 0) map.setView(e.latlng); // 3回に1回センタリング
	if (curCircle) map.removeLayer(curCircle);
	curCircle = L.circle(e.latlng, curAccuracy).addTo(map);
	dispDistance();
    }
    function onLocationError(e) {
	putlog(e.message, "err")
	if (true && !curMarker) {
	    currentLoc = L.latLng(matsugaoka_latlng);
	    curMarker = mainMarker(currentLoc).addTo(map);
	    curMarker.bindPopup("いまココ").openPopup();
	}
    }

    var tgt;
    function setNewLoc(latlng) {
	putlog(latlng+"に設定しました", 'err');
	targetLoc = latlng;	//  タップした地点をゴールにすり替える
	dispDistance();
    }
    map.on("click", function(e) {
	if (tgt) {
	    map.removeLayer(tgt);
	    map.panTo(e.latlng);
	    if (true) {
		tgt = L.marker(e.latlng, {draggable: true}).addTo(map);
		tgt.on("dragend", function (e) {
		    setNewLoc(e.target.getLatLng());
		});
	    }
	    setNewLoc(e.latlng);
	}
    });
    map.on('zoomend', function (e) {
	if (map._locateOptions) map._locateOptions.maxZoom = map.getZoom();
    });
    var watchID, geoOpt = {maximumAge: 0, timeout: 2000,
			   enableHighAccuracy: true},
	watchINT = 5000, watchTimer;
    function watchRestart() {
	putlog("Sleeping...Count:"+repeatCount, "info");
	clearWatch();
	if (watchTimer) {
	    clearTimeout(watchTimer);
	    watchTimer = null;
	}
	watchTimer = setTimeout(startWatch, 7500);
    }
    function watchFound(pos) {
	putlog("Sleeping...FOUND!", "info");
	putlog("", "err");
	onLocationFound({
	    latlng: L.latLng([
		pos.coords.latitude, pos.coords.longitude]),
	    accuracy: pos.coords.accuracy});
	// watchRestart();
    }
    function watchError() {
	onLocationError({
	    message: "GPS信号が弱いようです"});
    }
    function startWatch() {
	putlog("Start...Count:"+repeatCount, "info");
	clearWatch();		// confirmation
	watchID = navigator.geolocation.watchPosition(
	    // watchID = navigator.geolocation.getCurrentPosition(
	    watchFound, watchError, geoOpt
	);
    }
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", function(e) {
	startWatch();
	putlog("追跡を開始します", "info");
	this.setAttribute("disabled", true);
	if (tgt) {			// 開始したらターゲットを消す
	    map.removeLayer(tgt);	// マニュアルモード時はマーカが見える
	    tgt = null;
	}
    })
    var endButtonClicks = 0;
    document.getElementById("stop").addEventListener("click", function(e) {
	stopChase();
	if (++endButtonClicks > 9) {
	    document.getElementById("Z").style.display = "inline";
	}
    });
    document.getElementById("Z").addEventListener("click", function(e) {
	gotIt();
    });

    function loadgeofile(arg, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', arg['file'], true);
	xobj.onreadystatechange = function () {
	    if (xobj.readyState == 4 && xobj.status == "200") {
		callback(arg, xobj.responseText);
	    }
	};
	xobj.send(null);
    }
    var json = loadgeofile({file: "koryo-spots.geojson"},
			   function(arg, text) {
			       var geojson = JSON.parse(text);
			       var jL = L.geoJson(geojson);
			       jL.addTo(map);
			   });
    var now = new Date();
    var today = ""+now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate();
    var koryogo = localStorage.getItem("koryogo-warning");
    if (koryogo != today) {
	if (confirm("【5つの誓い】\n\
・危険な場所には行かない。\n\
・移動するときはこの画面を見続けない。\n\
・人の話を聞くべきときは画面を閉じる。\n\
・すべては自己責任で楽しむ。\n\
・誰かにやらせるときにはこれらを守らせる。")) {
	    localStorage.setItem("koryogo-warning", today);
	} else {
	    alert("さようならー");
	    var body = document.getElementsByTagName("body")[0];
	    body.parentNode.removeChild(body);
	}
    }

    var customLayer_osm = L.geoJson(null, {
	onEachFeature: function(f1, map_osm) {
            let p1 = f1.properties;
            if (p1) {
		let desc1 = p1.description.replace(/{{{([^{]*)}}}/,'<iframe src="$1"></iframe>');
		console.log("desc1="+desc1)
		let name1 = p1.name, desc2 = p1.description.replace(/{{([^{]*)}}/,'<img src="$1" width="300" height="200">');
		let popup1 = "<h3>" + name1 + "</h3>" + "<p>" + (desc1||"") + "</p>";
		map_osm.bindPopup(popup1);
            }
	}
    });

    var gjl_1 = omnivore.geojson("skip.geojson", null, customLayer_osm);
    gjl_1.on("ready", function() {
	map.fitBounds(gjl_1.getBounds());
    });
    gjl_1.addTo(map);
    L.control.layers(null, {"Marker": gjl_1}).addTo(map);

    var customLayer_gsi = L.geoJson(null, {
	onEachFeature: function(f2, map_gsi) {
            let p2 = f2.properties;
            if (p2) {
		let desc3 = p2.description.replace(/{{{([^{]*)}}}/,'<iframe src="$1"></iframe>');
		let name2 = p2.name, desc4 = p2.description.replace(/{{([^{]*)}}/,'<img src="$1" width="300" height="200">');
		let popup2 = "<h3>" + name2 + "</h3>" + "<p>" + (desc3||"") + "</p>";
		map_gsi.bindPopup(popup2);
            }
	}
    });

    var gjl_2 = omnivore.geojson("skip.geojson", null, customLayer_gsi);
    gjl_2.on("ready", function() {
	map.fitBounds(gjl_2.getBounds());
    });
    gjl_2.addTo(map);
    L.control.layers(null, {"Marker": gjl_2}).addTo(map);

}
