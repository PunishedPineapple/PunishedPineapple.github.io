var gMapContainer;
var gEnemyMapMarkerCheckboxContainer;

var gBronzeCofferData;
var gSilverCofferData;
var gImpCofferData;
var gCarrotData;

var gBNpcData;

function OnLoad()
{
	gMapContainer = document.getElementById( 'MapCanvasContainer' );
	gEnemyMapMarkerCheckboxContainer = document.getElementById( 'EnemyMapMarkerCheckboxContainer' );
	
	LoadData();
	
	SetupDefaults();
	
	SetupGeneralCheckboxes();
	
	SetupEnemyCheckboxes();
}

function LoadData()
{
	fetch( "./data/BronzeCofferData.json" )
	.then( response => response.text() )
	.then( ( data ) =>
	{
		gBronzeCofferData = JSON.parse( data );
	} );
	
	fetch( "./data/SilverCofferData.json" )
	.then( response => response.text() )
	.then( ( data ) =>
	{
		gSilverCofferData = JSON.parse( data );
	} );
	
	fetch( "./data/ImpCofferData.json" )
	.then( response => response.text() )
	.then( ( data ) =>
	{
		gImpCofferData = JSON.parse( data );
	} );
	
	fetch( "./data/CarrotData.json" )
	.then( response => response.text() )
	.then( ( data ) =>
	{
		gCarrotData = JSON.parse( data );
	} );
	
	fetch( "./data/BNpcData.json" )
	.then( response => response.text() )
	.then( ( data ) =>
	{
		gBNpcData = JSON.parse( data );
	} );
	
	//	Local Debugging
	//gBronzeCofferData = JSON.parse( gTemp_BronzeCofferDataJSONString );
	//gSilverCofferData = JSON.parse( gTemp_SilverCofferDataJSONString );
	//gImpCofferData = JSON.parse( gTemp_ImpCofferDataJSONString );
	//gCarrotData = JSON.parse( gTemp_CarrotDataJSONString );
	//gBNpcData = JSON.parse( gTemp_BNpcDataJSONString );
}

function OnCheckChanged( checkbox )
{
	console.debug( 'In OnCheckChanged() for checkbox id=' + checkbox.id );
	
	if( checkbox.id == 'BronzeCofferCheckbox' )
	{
		if( checkbox.checked ) AddBronzeCoffers();
		else RemoveBronzeCoffers();
		
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBronzeCoffers', checkbox.checked.toString() );
	}
	else if( checkbox.id == 'SilverCofferCheckbox' )
	{
		if( checkbox.checked ) AddSilverCoffers();
		else RemoveSilverCoffers();
		
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowSilverCoffers', checkbox.checked.toString() );
	}
	else if( checkbox.id == 'ImpCofferCheckbox' )
	{
		if( checkbox.checked ) AddImpCoffers();
		else RemoveImpCoffers();
		
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowImpCoffers', checkbox.checked.toString() );
	}
	else if( checkbox.id == 'CarrotCheckbox' )
	{
		if( checkbox.checked ) AddCarrots();
		else RemoveCarrots();
		
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowCarrots', checkbox.checked.toString() );
	}
	else if( checkbox.classList.contains( 'bnpc-checkbox' ) )
	{
		var bNpcNameID = parseInt( checkbox.getAttribute( 'data-bnpc-name-id' ), 10 );
		
		if( checkbox.checked )
		{
			var bNpcInfo = GetDataForBNpc( bNpcNameID );
			AddEnemies( bNpcNameID, bNpcInfo.Name, bNpcInfo.Spawns );
		}
		else
		{
			RemoveEnemies( bNpcNameID );
		}
		
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBNpc-' + bNpcNameID, checkbox.checked.toString() );
	}
}

function GetDataForBNpc( bNpcID )
{
	//	It would probably be better to do this with a map.
	for( let i = 0; i < gBNpcData.length; i++ )
	{
		if( gBNpcData[i].Key === bNpcID )
		{
			return gBNpcData[i].Value;
		}
	}	
}

//	Create default settings in local storage if nothing has been saved.
function SetupDefaults()
{
	if( localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBronzeCoffers' ) === null )
	{
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBronzeCoffers', "true" )
	}
	if( localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowSilverCoffers' ) === null )
	{
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowSilverCoffers', "true" )
	}
	if( localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowImpCoffers' ) === null )
	{
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowImpCoffers', "false" )
	}
	if( localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowCarrots' ) === null )
	{
		localStorage.setItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowCarrots', "true" )
	}
}

function SetupGeneralCheckboxes()
{
	var showBronzeCoffers = localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBronzeCoffers' ) === 'true';
	var showSilverCoffers = localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowSilverCoffers' ) === 'true';
	var showImpCoffers = localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowImpCoffers' ) === 'true';
	var showCarrots = localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowCarrots' ) === 'true';
	
	var bronzeCofferCheckbox = document.getElementById( 'BronzeCofferCheckbox' );
	var silverCofferCheckbox = document.getElementById( 'SilverCofferCheckbox' );
	var impCofferCheckbox = document.getElementById( 'ImpCofferCheckbox' );
	var carrotCheckbox = document.getElementById( 'CarrotCheckbox' );
	
	bronzeCofferCheckbox.checked = showBronzeCoffers;
	silverCofferCheckbox.checked = showSilverCoffers;
	impCofferCheckbox.checked = showImpCoffers;
	carrotCheckbox.checked = showCarrots;
	
	if( showBronzeCoffers ) OnCheckChanged( bronzeCofferCheckbox );
	if( showSilverCoffers ) OnCheckChanged( silverCofferCheckbox );
	if( showImpCoffers ) OnCheckChanged( impCofferCheckbox );
	if( showCarrots ) OnCheckChanged( carrotCheckbox );
}

function SetupEnemyCheckboxes()
{
	gBNpcData.forEach( e =>
	{
		SetupEnemyCheckbox( e.Key, e.Value.Name, e.Value.Spawns.length )
	});
}

function SetupEnemyCheckbox( bNpcNameID, bNpcName, recordCount )
{
	var showEnemy = localStorage.getItem( 'field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBNpc-' + bNpcNameID ) === 'true';
	
	var checkbox = document.createElement( 'input' );
	var label = document.createElement( 'label' );
	var br = document.createElement( 'br' );
	
	var checkboxIDString = 'bnpc-checkbox-' + bNpcNameID;
	
	checkbox.setAttribute( 'type', 'checkbox' );
	checkbox.setAttribute( 'id', checkboxIDString );
	checkbox.setAttribute( 'name', checkboxIDString );
	checkbox.setAttribute( 'data-bnpc-name-id', bNpcNameID );
	checkbox.setAttribute( 'data-bnpc-name', bNpcName );
	checkbox.setAttribute( 'value', bNpcName );	//***** TODO: What does value actually do for checkboxes?
	checkbox.setAttribute( 'onchange', 'OnCheckChanged( this )' );
	checkbox.classList.add( 'bnpc-checkbox' );

	label.setAttribute( 'for', checkboxIDString );
	label.innerHTML = ' ' + bNpcName + ' (' + recordCount + ')';

	gEnemyMapMarkerCheckboxContainer.appendChild( checkbox );
	gEnemyMapMarkerCheckboxContainer.appendChild( label );
	gEnemyMapMarkerCheckboxContainer.appendChild( br );
	
	checkbox.checked = showEnemy;
	if( showEnemy ) OnCheckChanged( checkbox );
}

function AddMarkerPoint( markerClass, x_Pct, y_Pct, tooltip, bNpcNameID, gameVerFirstSeen, gameVerLastSeen )
{
	var marker = document.createElement( 'div' );
	marker.classList.add( 'map-marker' );
	marker.classList.add( 'marker-point' );
	marker.classList.add( markerClass );
	marker.setAttribute( 'style', 'left: ' + x_Pct + '%; top: ' + y_Pct + '%' );
	marker.setAttribute( 'data-gamever-first-seen', gameVerFirstSeen );
	marker.setAttribute( 'data-gamever-last-seen', gameVerLastSeen );
	marker.setAttribute( 'data-bnpc-name-id', bNpcNameID );
	marker.setAttribute( 'title', tooltip );

	gMapContainer.appendChild( marker );
}

function AddMarkerIcon( icon, markerClass, x_Pct, y_Pct, gameVerFirstSeen, gameVerLastSeen )
{
	var marker = document.createElement( 'div' );
	marker.classList.add( 'map-marker' );
	marker.classList.add( markerClass );
	marker.setAttribute( 'style', 'left: ' + x_Pct + '%; top: ' + y_Pct + '%' );
	marker.setAttribute( 'data-gamever-first-seen', gameVerFirstSeen );
	marker.setAttribute( 'data-gamever-last-seen', gameVerLastSeen );
	
	marker.appendChild( icon );
	gMapContainer.appendChild( marker );
}

function SetupIcon( imagePath, tooltip )
{
	var icon = document.createElement( 'img' );
	icon.classList.add( 'marker-icon' );
	icon.setAttribute( 'src', imagePath );
	icon.setAttribute( 'title', tooltip );
	return icon;
}

function AddBronzeCoffers()
{
	AddTreasureMarkers( gBronzeCofferData, 'Bronze Coffer', 'bronze-coffer-marker', 'images/060911_hr1.png' );
}

function AddSilverCoffers()
{
	AddTreasureMarkers( gSilverCofferData, 'Silver Coffer', 'silver-coffer-marker', 'images/060912_hr1.png' );
}

function AddImpCoffers()
{
	AddTreasureMarkers( gImpCofferData, 'Imp Coffer', 'imp-coffer-marker', 'images/060913_hr1.png' );
}

function AddCarrots()
{
	AddTreasureMarkers( gCarrotData, 'Fortune Carrot', 'carrot-marker', 'images/025207_hr1_nobg_scaled.png' );
}

function AddTreasureMarkers( dataObject, objectName, markerClass, iconPath )
{
	console.debug( 'Adding ' + dataObject.length + ' markers for "' +  objectName +'".' );
	
	dataObject.forEach( e =>
	{
		var percentCoords = PixelCoordsToPercentCoords( [e.X, e.Y] );
		var mapCoords = PixelCoordsToMapCoords( [e.X, e.Y] );
		var icon = SetupIcon( iconPath, objectName + '\r\n' + FormatMapCoordString( mapCoords ) );
		AddMarkerIcon( icon, markerClass, percentCoords[0], percentCoords[1], e.FirstGameVer, e.LastGameVer );
	});
}

function AddEnemies( bNpcNameID, bNpcName, spawnList )
{
	console.debug( 'Adding ' + spawnList.length + ' markers for bNpcNameID ' + bNpcNameID +'.' );
	
	spawnList.forEach( e =>
	{
		var percentCoords = PixelCoordsToPercentCoords( [e.X,e.Y] );
		var mapCoords = PixelCoordsToMapCoords( [e.X,e.Y] );
		AddMarkerPoint( 'enemy-marker', percentCoords[0], percentCoords[1], 'Lv. ' + e.Level + ' ' + bNpcName + '\r\n' + FormatMapCoordString( mapCoords ), bNpcNameID, e.FirstGameVer, e.LastGameVer );
	});
}

function RemoveBronzeCoffers()
{
	document.querySelectorAll( '.bronze-coffer-marker' ).forEach( e => e.remove() );
}

function RemoveSilverCoffers()
{
	document.querySelectorAll( '.silver-coffer-marker' ).forEach( e => e.remove() );
}

function RemoveImpCoffers()
{
	document.querySelectorAll( '.imp-coffer-marker' ).forEach( e => e.remove() );
}

function RemoveCarrots()
{
	document.querySelectorAll( '.carrot-marker' ).forEach( e => e.remove() );
}

function RemoveEnemies( bNpcNameID )
{
	var elements = document.querySelectorAll( '[data-bnpc-name-id="' + bNpcNameID + '"].enemy-marker' )
	
	console.debug( 'Removing ' + elements.length + ' markers for bNpcNameID ' +  bNpcNameID +'.' );
	
	elements.forEach( e => e.remove() );
}

function GameCoordsToPixelCoords( gameCoords, sizeFactor, offset )
{
	var pixelX = ( gameCoords[0] + offset[0] ) / 100.0 * sizeFactor + 1024.0;
	var pixelY = ( gameCoords[2] + offset[1] ) / 100.0 * sizeFactor + 1024.0;
	
	return [pixelX, pixelY];
}

function PixelCoordsToPercentCoords( pixelCoords )
{
	var percentX = pixelCoords[0] / 20.48;
	var percentY = pixelCoords[1] / 20.48;
	
	return [percentX, percentY];
}

function PixelCoordsToMapCoords( pixelCoords )
{
	var mapX = pixelCoords[0] / 50.0 + 1.0;
	var mapY = pixelCoords[1] / 50.0 + 1.0;
	
	return [mapX, mapY];
}

function FormatMapCoordString( mapCoords )
{
	var truncatedX = Math.floor( mapCoords[0] * 10.0 ) / 10.0;
	var truncatedY = Math.floor( mapCoords[1] * 10.0 ) / 10.0;
	return 'X: ' + truncatedX.toFixed( 1 ) + ', Y: ' + truncatedY.toFixed( 1 );
}
